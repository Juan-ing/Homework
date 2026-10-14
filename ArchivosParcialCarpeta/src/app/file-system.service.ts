import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  where,
  writeBatch,
  type DocumentData,
  type Unsubscribe,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config.js';
import type { FileSystemNode, NewFileSystemNode } from './file-system-node.model';

const DELETE_BATCH_SIZE = 450;

function isFileSystemNode(data: DocumentData): data is DocumentData & FileSystemNode {
  return (
    typeof data['id'] === 'string' &&
    typeof data['name'] === 'string' &&
    (data['type'] === 'file' || data['type'] === 'folder') &&
    (data['parentId'] === null || typeof data['parentId'] === 'string') &&
    typeof data['creatorEmail'] === 'string'
  );
}

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private readonly nodesCollection = collection(db, 'nodes');

  async addNode(node: NewFileSystemNode): Promise<void> {
    const user = auth.currentUser;
    const creatorEmail = user?.email;
    if (!user || !creatorEmail) {
      throw new Error('Inicia sesión con un correo válido para crear carpetas o archivos.');
    }
    if (!node.name.trim()) {
      throw new Error('El nombre no puede estar vacío.');
    }
    if (node.id === 'root') {
      throw new Error('No se puede usar el identificador reservado del árbol.');
    }

    await runTransaction(db, async (transaction) => {
      if (node.parentId !== null) {
        const parentRef = doc(this.nodesCollection, node.parentId);
        const parent = await transaction.get(parentRef);
        if (
          !parent.exists() ||
          parent.data()['type'] !== 'folder' ||
          parent.data()['creatorEmail'] !== creatorEmail
        ) {
          throw new Error('Solo puedes crear elementos dentro de tus propias carpetas.');
        }
      }

      const nodeRef = doc(this.nodesCollection, node.id);
      if ((await transaction.get(nodeRef)).exists()) {
        throw new Error('Ya existe un nodo con ese identificador.');
      }
      transaction.set(nodeRef, { ...node, name: node.name.trim(), creatorEmail });
    });
  }

  async updateNode(id: string, data: Partial<Pick<FileSystemNode, 'name'>>): Promise<void> {
    const creatorEmail = this.requireCreatorEmail();
    const name = data.name?.trim();
    if (!name) {
      throw new Error('El nombre no puede estar vacío.');
    }
    const nodeRef = doc(this.nodesCollection, id);
    await runTransaction(db, async (transaction) => {
      const node = await transaction.get(nodeRef);
      if (!node.exists() || node.data()['creatorEmail'] !== creatorEmail) {
        throw new Error('No puedes editar este nodo.');
      }
      transaction.update(nodeRef, { name });
    });
  }

  async deleteNode(id: string): Promise<void> {
    const creatorEmail = this.requireCreatorEmail();
    const snapshot = await getDocs(this.nodesCollection);
    const records = snapshot.docs.map((document) => {
      const data = document.data();
      if (!isFileSystemNode(data) || data['id'] !== document.id) {
        throw new Error(`El documento "${document.id}" no tiene un nodo válido.`);
      }
      return data;
    });
    const nodesById = new Map(records.map((node) => [node.id, node]));
    if (!nodesById.has(id)) {
      throw new Error('No se encontró el nodo solicitado.');
    }

    const descendants: FileSystemNode[] = [];
    const queue = [id];
    const visited = new Set<string>();
    while (queue.length > 0) {
      const currentId = queue.shift();
      if (!currentId || visited.has(currentId)) {
        continue;
      }
      visited.add(currentId);
      const current = nodesById.get(currentId);
      if (!current) {
        continue;
      }
      descendants.push(current);
      for (const node of records) {
        if (node.parentId === currentId) {
          queue.push(node.id);
        }
      }
    }
    if (descendants.some((node) => node.creatorEmail !== creatorEmail)) {
      throw new Error('No puedes eliminar una carpeta que contiene nodos de otro usuario.');
    }

    for (let start = 0; start < descendants.length; start += DELETE_BATCH_SIZE) {
      const batch = writeBatch(db);
      for (const node of descendants.slice(start, start + DELETE_BATCH_SIZE)) {
        batch.delete(doc(this.nodesCollection, node.id));
      }
      await batch.commit();
    }
  }

  getAllNodes(
    onNodesChange: (nodes: FileSystemNode[]) => void,
    onError: (error: Error) => void,
  ): Unsubscribe {
    const creatorEmail = this.requireCreatorEmail();
    const userNodes = query(this.nodesCollection, where('creatorEmail', '==', creatorEmail));
    return onSnapshot(
      userNodes,
      (snapshot) => {
        try {
          const nodes = snapshot.docs.map((document) => {
            const data = document.data();
            if (!isFileSystemNode(data) || data['id'] !== document.id) {
              throw new Error(`El documento "${document.id}" no tiene un nodo válido.`);
            }
            return data;
          });
          onNodesChange(nodes);
        } catch (error) {
          onError(error instanceof Error ? error : new Error('No se pudieron leer los nodos.'));
        }
      },
      onError,
    );
  }

  private requireCreatorEmail(): string {
    const email = auth.currentUser?.email;
    if (!email) {
      throw new Error('Inicia sesión con un correo válido para administrar tus archivos.');
    }
    return email;
  }
}
