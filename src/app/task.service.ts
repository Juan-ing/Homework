import { Injectable, inject } from '@angular/core';
import {
  collection,
  doc,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { AuthService } from './auth';
import type { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly authService = inject(AuthService);
  private readonly tasksCollection = collection(db, 'tasks');

  async addTask(title: string): Promise<string> {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      throw new Error('El título de la tarea no puede estar vacío.');
    }

    const user = this.requireUser();
    const taskRef = doc(this.tasksCollection);
    await setDoc(taskRef, {
      userId: user.uid,
      title: normalizedTitle,
      completed: false,
      createdAt: serverTimestamp(),
    });
    return taskRef.id;
  }

  async updateTask(
    id: string,
    data: Partial<Pick<Task, 'title' | 'completed'>>,
  ): Promise<void> {
    if (data.title !== undefined && !data.title.trim()) {
      throw new Error('El título de la tarea no puede estar vacío.');
    }

    const user = this.requireUser();
    const taskRef = doc(db, 'tasks', id);
    const updates: Partial<Pick<Task, 'title' | 'completed'>> = {};
    if (data.title !== undefined) {
      updates.title = data.title.trim();
    }
    if (data.completed !== undefined) {
      updates.completed = data.completed;
    }
    if (Object.keys(updates).length === 0) {
      throw new Error('Debes proporcionar al menos un campo para actualizar.');
    }

    await runTransaction(db, async (transaction) => {
      const taskSnapshot = await transaction.get(taskRef);
      if (!taskSnapshot.exists() || taskSnapshot.data()['userId'] !== user.uid) {
        throw new Error('No se encontró la tarea solicitada.');
      }

      transaction.update(taskRef, updates);
    });
  }

  async deleteTask(id: string): Promise<void> {
    const user = this.requireUser();
    const taskRef = doc(db, 'tasks', id);
    await runTransaction(db, async (transaction) => {
      const taskSnapshot = await transaction.get(taskRef);
      if (!taskSnapshot.exists() || taskSnapshot.data()['userId'] !== user.uid) {
        throw new Error('No se encontró la tarea solicitada.');
      }

      transaction.delete(taskRef);
    });
  }

  async toggleTask(id: string): Promise<void> {
    const user = this.requireUser();
    const taskRef = doc(db, 'tasks', id);
    await runTransaction(db, async (transaction) => {
      const taskSnapshot = await transaction.get(taskRef);
      if (!taskSnapshot.exists() || taskSnapshot.data()['userId'] !== user.uid) {
        throw new Error('No se encontró la tarea solicitada.');
      }

      transaction.update(taskRef, {
        completed: !taskSnapshot.data()['completed'],
      });
    });
  }

  getAllTasks(
    onTasksChange: (tasks: Task[]) => void,
    onError: (error: Error) => void,
  ): Unsubscribe {
    const user = this.requireUser();
    const userTasksQuery = query(this.tasksCollection, where('userId', '==', user.uid));

    return onSnapshot(
      userTasksQuery,
      (snapshot) => {
        const tasks = snapshot.docs.map((taskDocument) => {
          const data = taskDocument.data();
          return {
            id: taskDocument.id,
            title: data['title'] as string,
            completed: data['completed'] as boolean,
            createdAt: data['createdAt'] ?? null,
          };
        });
        onTasksChange(tasks);
      },
      onError,
    );
  }

  private requireUser() {
    const user = this.authService.currentUser();
    if (!user) {
      throw new Error('Debes iniciar sesión para administrar tus tareas.');
    }
    return user;
  }
}
