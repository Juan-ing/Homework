export type Database = {
  public: {
    Tables: {
      tareas: {
        Row: {
          id: number;
          titulo: string;
          completada: boolean | null;
          user_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: never;
          titulo: string;
          completada?: boolean | null;
          user_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: never;
          titulo?: string;
          completada?: boolean | null;
          user_id?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
