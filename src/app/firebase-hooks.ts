import { DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from './auth';
import { TaskService } from './task.service';
import type { Task } from './task.model';

export function useAuthState() {
  const authService = inject(AuthService);

  return {
    user: authService.currentUser,
    isAuthenticated: authService.isLoggedIn,
    login: (email: string, password: string) => authService.login(email, password),
    register: (email: string, password: string) => authService.register(email, password),
    logout: () => authService.logout(),
  };
}

export function useTasksListener() {
  const taskService = inject(TaskService);
  const destroyRef = inject(DestroyRef);
  const tasks = signal<Task[]>([]);
  const errorMessage = signal('');
  const isLoading = signal(true);

  const unsubscribe = taskService.getAllTasks(
    (updatedTasks) => {
      tasks.set(updatedTasks);
      errorMessage.set('');
      isLoading.set(false);
    },
    (error) => {
      errorMessage.set(error.message);
      isLoading.set(false);
    },
  );

  destroyRef.onDestroy(unsubscribe);

  return {
    tasks: tasks.asReadonly(),
    errorMessage: errorMessage.asReadonly(),
    isLoading: isLoading.asReadonly(),
  };
}
