import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { useTasksListener } from '../firebase-hooks';
import { TaskService } from '../task.service';

@Component({
  imports: [FormsModule],
  selector: 'app-tasks',
  styleUrl: './tasks.scss',
  templateUrl: './tasks.html',
})
export class Tasks {
  protected readonly taskState = useTasksListener();
  readonly newTaskTitle = signal('');
  readonly editingTaskId = signal<string | null>(null);
  readonly editTitle = signal('');
  readonly errorMessage = signal('');
  readonly busyTaskId = signal<string | null>(null);

  private readonly taskService = inject(TaskService);

  async addTask(): Promise<void> {
    const title = this.newTaskTitle().trim();
    if (!title) {
      return;
    }

    this.errorMessage.set('');
    try {
      await this.taskService.addTask(title);
      this.newTaskTitle.set('');
    } catch (error) {
      this.showError(error);
    }
  }

  startEditing(id: string, title: string): void {
    this.editingTaskId.set(id);
    this.editTitle.set(title);
    this.errorMessage.set('');
  }

  cancelEditing(): void {
    this.editingTaskId.set(null);
    this.editTitle.set('');
  }

  async saveTask(id: string): Promise<void> {
    this.busyTaskId.set(id);
    this.errorMessage.set('');
    try {
      await this.taskService.updateTask(id, { title: this.editTitle() });
      this.cancelEditing();
    } catch (error) {
      this.showError(error);
    } finally {
      this.busyTaskId.set(null);
    }
  }

  async toggleTask(id: string): Promise<void> {
    await this.performTaskAction(id, () => this.taskService.toggleTask(id));
  }

  async deleteTask(id: string): Promise<void> {
    await this.performTaskAction(id, () => this.taskService.deleteTask(id));
  }

  private async performTaskAction(id: string, action: () => Promise<void>): Promise<void> {
    this.busyTaskId.set(id);
    this.errorMessage.set('');
    try {
      await action();
    } catch (error) {
      this.showError(error);
    } finally {
      this.busyTaskId.set(null);
    }
  }

  private showError(error: unknown): void {
    this.errorMessage.set(
      error instanceof Error ? error.message : 'No fue posible completar la operación.',
    );
  }
}
