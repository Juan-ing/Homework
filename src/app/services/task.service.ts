import { inject, Injectable } from '@angular/core';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import type { Task, TaskChanges } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly supabase = inject(SupabaseService);
  private readonly authService = inject(AuthService);

  async getTasks(): Promise<Task[]> {
    const { data, error } = await this.supabase.client
      .from('tareas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }
    return data;
  }

  async addTask(title: string): Promise<void> {
    const titulo = title.trim();
    if (!titulo) {
      throw new Error('El título de la tarea no puede estar vacío.');
    }

    const { error } = await this.supabase.client.from('tareas').insert({ titulo });
    if (error) {
      throw error;
    }
  }

  async updateTask(id: number, changes: TaskChanges): Promise<void> {
    const updates: TaskChanges = {};
    if (changes.titulo !== undefined) {
      const titulo = changes.titulo.trim();
      if (!titulo) {
        throw new Error('El título de la tarea no puede estar vacío.');
      }
      updates.titulo = titulo;
    }
    if (changes.completada !== undefined) {
      updates.completada = changes.completada;
    }
    if (Object.keys(updates).length === 0) {
      throw new Error('Debes proporcionar al menos un campo para actualizar.');
    }

    const { data, error } = await this.supabase.client
      .from('tareas')
      .update(updates)
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error('No se encontró la tarea solicitada.');
    }
  }

  async deleteTask(id: number): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('tareas')
      .delete()
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error('No se encontró la tarea solicitada.');
    }
  }

  async toggleCompleted(id: number, completed: boolean): Promise<void> {
    await this.updateTask(id, { completada: completed });
  }

  watchTasks(onChange: () => void, onError: (error: Error) => void): () => void {
    const user = this.authService.currentUser();
    if (!user) {
      throw new Error('Debes iniciar sesión para ver tus tareas.');
    }

    const channel: RealtimeChannel = this.supabase.client
      .channel(`tareas-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tareas',
        },
        onChange,
      )
      .subscribe((status, error) => {
        if (error) {
          onError(error);
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          onError(new Error(`No fue posible conectar con Realtime (${status}).`));
        }
      });

    return () => {
      void this.supabase.client.removeChannel(channel);
    };
  }
}
