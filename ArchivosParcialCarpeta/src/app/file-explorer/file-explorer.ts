import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileSystemService } from '../file-system.service';
import type { FileSystemNodeType } from '../file-system-node.model';
import { NTree, Node } from '../n-tree';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-file-explorer',
  styleUrl: './file-explorer.scss',
  templateUrl: './file-explorer.html',
})
export class FileExplorer {
  readonly tree = signal(new NTree());
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly createParentId = signal<string | null | undefined>(undefined);
  readonly createType = signal<FileSystemNodeType>('folder');
  readonly newName = signal('');
  readonly editingNodeId = signal<string | null>(null);
  readonly editName = signal('');
  readonly expandedNodeIds = signal(new Set<string>());
  readonly isSaving = signal(false);

  private readonly fileSystem = inject(FileSystemService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const unsubscribe = this.fileSystem.getAllNodes(
      (records) => {
        try {
          const tree = new NTree();
          tree.load(records);
          this.tree.set(tree);
          this.errorMessage.set('');
        } catch (error) {
          this.showError(error);
        } finally {
          this.isLoading.set(false);
        }
      },
      (error) => {
        this.showError(error);
        this.isLoading.set(false);
      },
    );
    this.destroyRef.onDestroy(unsubscribe);
  }

  beginCreate(parentId: string | null, type: FileSystemNodeType): void {
    this.createParentId.set(parentId);
    this.createType.set(type);
    this.newName.set('');
    this.errorMessage.set('');
    if (parentId !== null) {
      this.expandedNodeIds.update((ids) => new Set(ids).add(parentId));
    }
  }

  cancelCreate(): void {
    this.createParentId.set(undefined);
    this.newName.set('');
  }

  async createNode(): Promise<void> {
    const name = this.newName().trim();
    const parentId = this.createParentId();
    if (!name || parentId === undefined) {
      return;
    }

    await this.performAction(async () => {
      await this.fileSystem.addNode({
        id: crypto.randomUUID(),
        name,
        type: this.createType(),
        parentId,
      });
      this.cancelCreate();
    });
  }

  toggleExpanded(nodeId: string): void {
    this.expandedNodeIds.update((current) => {
      const updated = new Set(current);
      if (updated.has(nodeId)) {
        updated.delete(nodeId);
      } else {
        updated.add(nodeId);
      }
      return updated;
    });
  }

  isExpanded(nodeId: string): boolean {
    return this.expandedNodeIds().has(nodeId);
  }

  beginEdit(node: Node): void {
    this.editingNodeId.set(node.id);
    this.editName.set(node.name);
    this.errorMessage.set('');
  }

  cancelEdit(): void {
    this.editingNodeId.set(null);
    this.editName.set('');
  }

  async saveEdit(nodeId: string): Promise<void> {
    const name = this.editName().trim();
    if (!name) {
      this.errorMessage.set('El nombre no puede estar vacío.');
      return;
    }

    await this.performAction(async () => {
      await this.fileSystem.updateNode(nodeId, { name });
      this.cancelEdit();
    });
  }

  async deleteNode(node: Node): Promise<void> {
    const description =
      node.type === 'folder'
        ? `¿Eliminar la carpeta "${node.name}" y todo su contenido?`
        : `¿Eliminar el archivo "${node.name}"?`;
    if (!globalThis.confirm(description)) {
      return;
    }
    await this.performAction(() => this.fileSystem.deleteNode(node.id));
  }

  private async performAction(action: () => Promise<void>): Promise<void> {
    this.isSaving.set(true);
    this.errorMessage.set('');
    try {
      await action();
    } catch (error) {
      this.showError(error);
    } finally {
      this.isSaving.set(false);
    }
  }

  private showError(error: unknown): void {
    this.errorMessage.set(
      error instanceof Error ? error.message : 'No fue posible completar la operación.',
    );
  }
}
