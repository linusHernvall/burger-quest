export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Add your table definitions here
      example: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          content: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          content: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          content?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
