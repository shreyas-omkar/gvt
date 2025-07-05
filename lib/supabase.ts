import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          is_admin?: boolean;
        };
        Update: {
          email?: string;
          is_admin?: boolean;
        };
      };
      consultations: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string;
          consultation_type: 'astrology' | 'vastu';
          preferred_date: string;
          preferred_time: string;
          message: string | null;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          email: string;
          phone: string;
          consultation_type: 'astrology' | 'vastu';
          preferred_date: string;
          preferred_time: string;
          message?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
        Update: {
          name?: string;
          email?: string;
          phone?: string;
          consultation_type?: 'astrology' | 'vastu';
          preferred_date?: string;
          preferred_time?: string;
          message?: string | null;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        };
      };
      stotras: {
        Row: {
          id: string;
          title: string;
          description: string;
          content: string;
          category: string;
          symptoms: string[];
          benefits: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          content: string;
          category: string;
          symptoms?: string[];
          benefits?: string[];
        };
        Update: {
          title?: string;
          description?: string;
          content?: string;
          category?: string;
          symptoms?: string[];
          benefits?: string[];
        };
      };
    };
    Functions: {
      is_admin_user: {
        Args: {};
        Returns: boolean;
      };
    };
  };
};