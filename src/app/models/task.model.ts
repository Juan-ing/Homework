import type { Database } from './database.types';

export type Task = Database['public']['Tables']['tareas']['Row'];
export type TaskChanges = Pick<
  Database['public']['Tables']['tareas']['Update'],
  'titulo' | 'completada'
>;
