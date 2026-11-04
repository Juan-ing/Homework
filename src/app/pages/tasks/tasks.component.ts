import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarService } from '../../services/avatar.service';
import { TaskService } from '../../services/task.service';
import type { Task } from '../../models/task.model';

@Component({
  imports: [FormsModule],
  selector: 'app-tasks',
  styleUrl: './tasks.component.css',
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit, OnDestroy {
  readonly tasks = signal<Task[]>([]);
  readonly newTaskTitle = signal('');
  readonly editingTaskId = signal<number | null>(null);
  readonly editTitle = signal('');
  readonly avatarUrl = signal<string | null>(null);
  readonly errorMessage = signal('');
  readonly isLoading = signal(true);
  readonly isUploadingAvatar = signal(false);
  readonly busyTaskId = signal<number | null>(null);

  private readonly taskService = inject(TaskService);
  private readonly avatarService = inject(AvatarService);
  private unsubscribeTasks: (() => void) | null = null;
  private loadSequence = 0;

  ngOnInit(): void {
    this.unsubscribeTasks = this.taskService.watchTasks(
      () => void this.loadTasks(),
      (error) => this.showError(error),
    );
    void this.loadTasks();
    void this.loadAvatar();
  }

  ngOnDestroy(): void {
    this.unsubscribeTasks?.();
  }

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

  startEditing(task: Task): void {
    this.editingTaskId.set(task.id);
    this.editTitle.set(task.titulo);
    this.errorMessage.set('');
  }

  cancelEditing(): void {
    this.editingTaskId.set(null);
    this.editTitle.set('');
  }

  async saveTask(id: number): Promise<void> {
    this.busyTaskId.set(id);
    this.errorMessage.set('');
    try {
      await this.taskService.updateTask(id, { titulo: this.editTitle() });
      this.cancelEditing();
    } catch (error) {
      this.showError(error);
    } finally {
      this.busyTaskId.set(null);
    }
  }

  async toggleCompleted(task: Task): Promise<void> {
    await this.performTaskAction(task.id, () =>
      this.taskService.toggleCompleted(task.id, !task.completada),
    );
  }

  async deleteTask(id: number): Promise<void> {
    await this.performTaskAction(id, () => this.taskService.deleteTask(id));
  }

  async onAvatarSelected(event: Event): Promise<void> {
    const input = event.currentTarget;
    if (!(input instanceof HTMLInputElement) || !input.files?.[0]) {
      return;
    }

    this.errorMessage.set('');
    this.isUploadingAvatar.set(true);
    try {
      this.avatarUrl.set(await this.avatarService.uploadAvatar(input.files[0]));
    } catch (error) {
      this.showError(error);
    } finally {
      this.isUploadingAvatar.set(false);
      input.value = '';
    }
  }

  formatDate(date: string | null): string {
    return date ? new Date(date).toLocaleString('es-CO') : 'Sin fecha';
  }

  private async loadTasks(): Promise<void> {
    const sequence = ++this.loadSequence;
    this.errorMessage.set('');
    try {
      const tasks = await this.taskService.getTasks();
      if (sequence === this.loadSequence) {
        this.tasks.set(tasks);
      }
    } catch (error) {
      if (sequence === this.loadSequence) {
        this.showError(error);
      }
    } finally {
      if (sequence === this.loadSequence) {
        this.isLoading.set(false);
      }
    }
  }

  private async loadAvatar(): Promise<void> {
    try {
      this.avatarUrl.set(await this.avatarService.getAvatarUrl());
    } catch (error) {
      this.showError(error);
    }
  }

  private async performTaskAction(id: number, action: () => Promise<void>): Promise<void> {
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
