export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string
          password_hash: string | null
          permissions: Json | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name: string
          password_hash?: string | null
          permissions?: Json | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          password_hash?: string | null
          permissions?: Json | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      case_bids: {
        Row: {
          amount: number
          case_id: string | null
          created_at: string | null
          delivery_days: number | null
          discount_percentage: number | null
          estimated_duration: string | null
          id: string
          is_accepted: boolean | null
          lawyer_id: string | null
          proposal: string | null
          responded_at: string | null
          score: number | null
          status: string | null
        }
        Insert: {
          amount: number
          case_id?: string | null
          created_at?: string | null
          delivery_days?: number | null
          discount_percentage?: number | null
          estimated_duration?: string | null
          id?: string
          is_accepted?: boolean | null
          lawyer_id?: string | null
          proposal?: string | null
          responded_at?: string | null
          score?: number | null
          status?: string | null
        }
        Update: {
          amount?: number
          case_id?: string | null
          created_at?: string | null
          delivery_days?: number | null
          discount_percentage?: number | null
          estimated_duration?: string | null
          id?: string
          is_accepted?: boolean | null
          lawyer_id?: string | null
          proposal?: string | null
          responded_at?: string | null
          score?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_bids_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_bids_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_blocked: boolean | null
          name: string
          phone: string | null
          total_consultations: number | null
          total_spent: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_blocked?: boolean | null
          name: string
          phone?: string | null
          total_consultations?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_blocked?: boolean | null
          name?: string
          phone?: string | null
          total_consultations?: number | null
          total_spent?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      consultations: {
        Row: {
          amount: number | null
          client_id: string | null
          created_at: string | null
          duration_minutes: number | null
          ended_at: string | null
          id: string
          lawyer_id: string | null
          rating: number | null
          review: string | null
          service_id: string | null
          started_at: string | null
          status: string | null
          type: string
        }
        Insert: {
          amount?: number | null
          client_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          ended_at?: string | null
          id?: string
          lawyer_id?: string | null
          rating?: number | null
          review?: string | null
          service_id?: string | null
          started_at?: string | null
          status?: string | null
          type: string
        }
        Update: {
          amount?: number | null
          client_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          ended_at?: string | null
          id?: string
          lawyer_id?: string | null
          rating?: number | null
          review?: string | null
          service_id?: string | null
          started_at?: string | null
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "legal_services"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          question: string
          updated_at: string | null
        }
        Insert: {
          answer: string
          category: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      featured_services: {
        Row: {
          created_at: string
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          is_popular: boolean | null
          is_published: boolean | null
          order_index: number | null
          price_range: string | null
          short_description: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          is_popular?: boolean | null
          is_published?: boolean | null
          order_index?: number | null
          price_range?: string | null
          short_description?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          is_popular?: boolean | null
          is_published?: boolean | null
          order_index?: number | null
          price_range?: string | null
          short_description?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lawyers: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          experience_years: number | null
          hourly_rate: number | null
          id: string
          is_online: boolean | null
          last_seen: string | null
          license_number: string
          license_verified: boolean | null
          name: string
          phone: string | null
          rating: number | null
          registration_status: string | null
          specialty: string
          total_cases: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          is_online?: boolean | null
          last_seen?: string | null
          license_number: string
          license_verified?: boolean | null
          name: string
          phone?: string | null
          rating?: number | null
          registration_status?: string | null
          specialty: string
          total_cases?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          is_online?: boolean | null
          last_seen?: string | null
          license_number?: string
          license_verified?: boolean | null
          name?: string
          phone?: string | null
          rating?: number | null
          registration_status?: string | null
          specialty?: string
          total_cases?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      legal_articles: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          featured: boolean | null
          id: string
          is_published: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          is_published?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          is_published?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_cases: {
        Row: {
          attachments: string[] | null
          auction_end_date: string | null
          budget_max: number | null
          budget_min: number | null
          case_number: string | null
          category: string
          client_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_auction: boolean | null
          lawyer_id: string | null
          status: string | null
          title: string
          updated_at: string | null
          urgency: string | null
        }
        Insert: {
          attachments?: string[] | null
          auction_end_date?: string | null
          budget_max?: number | null
          budget_min?: number | null
          case_number?: string | null
          category: string
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_auction?: boolean | null
          lawyer_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          urgency?: string | null
        }
        Update: {
          attachments?: string[] | null
          auction_end_date?: string | null
          budget_max?: number | null
          budget_min?: number | null
          case_number?: string | null
          category?: string
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_auction?: boolean | null
          lawyer_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          urgency?: string | null
        }
        Relationships: []
      }
      legal_services: {
        Row: {
          base_price: number
          category: string
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          base_price: number
          category: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          base_price?: number
          category?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          case_id: string | null
          client_id: string | null
          consultation_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          lawyer_id: string | null
          payment_method: string | null
          processed_at: string | null
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          case_id?: string | null
          client_id?: string | null
          consultation_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          lawyer_id?: string | null
          payment_method?: string | null
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          case_id?: string | null
          client_id?: string | null
          consultation_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          lawyer_id?: string | null
          payment_method?: string | null
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: string
          client_name: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_published: boolean | null
          project_date: string | null
          project_url: string | null
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          client_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          project_date?: string | null
          project_url?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          client_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          project_date?: string | null
          project_url?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      quick_services: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          duration_hours: number
          icon: string | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          lawyer: string | null
          order_index: number | null
          price: number
          rating: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          duration_hours: number
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          lawyer?: string | null
          order_index?: number | null
          price: number
          rating?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          duration_hours?: number
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          lawyer?: string | null
          order_index?: number | null
          price?: number
          rating?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      session_events: {
        Row: {
          event_data: Json | null
          event_type: string
          id: string
          participant_type: string | null
          session_id: string | null
          timestamp: string | null
        }
        Insert: {
          event_data?: Json | null
          event_type: string
          id?: string
          participant_type?: string | null
          session_id?: string | null
          timestamp?: string | null
        }
        Update: {
          event_data?: Json | null
          event_type?: string
          id?: string
          participant_type?: string | null
          session_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "voice_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_notifications: {
        Row: {
          channel: string
          created_at: string | null
          id: string
          notification_type: string
          recipient_id: string
          sent_at: string | null
          session_id: string | null
          status: string | null
        }
        Insert: {
          channel: string
          created_at?: string | null
          id?: string
          notification_type: string
          recipient_id: string
          sent_at?: string | null
          session_id?: string | null
          status?: string | null
        }
        Update: {
          channel?: string
          created_at?: string | null
          id?: string
          notification_type?: string
          recipient_id?: string
          sent_at?: string | null
          session_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_notifications_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "voice_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          report_reason: string
          reporter_id: string
          reporter_type: string | null
          resolved_at: string | null
          session_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          report_reason: string
          reporter_id: string
          reporter_type?: string | null
          resolved_at?: string | null
          session_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          report_reason?: string
          reporter_id?: string
          reporter_type?: string | null
          resolved_at?: string | null
          session_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_reports_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "voice_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      showcase_projects: {
        Row: {
          category: string
          client_name: string | null
          color_gradient: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          order_index: number | null
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          client_name?: string | null
          color_gradient?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          order_index?: number | null
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          client_name?: string | null
          color_gradient?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          order_index?: number | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          company: string | null
          created_at: string
          description: string
          email: string
          id: string
          name: string
          phone: string | null
          priority: string
          resolved_at: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category: string
          company?: string | null
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          phone?: string | null
          priority: string
          resolved_at?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          company?: string | null
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          priority?: string
          resolved_at?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
          user_id: string
          user_type: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
          user_type: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      voice_sessions: {
        Row: {
          actual_duration: number | null
          client_id: string
          consultation_id: string | null
          created_at: string | null
          duration_minutes: number
          end_time: string | null
          id: string
          is_encrypted: boolean | null
          lawyer_id: string
          recording_consent: boolean | null
          room_id: string
          session_status: string
          start_time: string | null
          updated_at: string | null
        }
        Insert: {
          actual_duration?: number | null
          client_id: string
          consultation_id?: string | null
          created_at?: string | null
          duration_minutes?: number
          end_time?: string | null
          id?: string
          is_encrypted?: boolean | null
          lawyer_id: string
          recording_consent?: boolean | null
          room_id: string
          session_status?: string
          start_time?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_duration?: number | null
          client_id?: string
          consultation_id?: string | null
          created_at?: string | null
          duration_minutes?: number
          end_time?: string | null
          id?: string
          is_encrypted?: boolean | null
          lawyer_id?: string
          recording_consent?: boolean | null
          room_id?: string
          session_status?: string
          start_time?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_bid_score: {
        Args: {
          bid_amount: number
          case_budget_max: number
          delivery_days: number
          lawyer_rating: number
          total_cases: number
        }
        Returns: number
      }
      check_connection_health: { Args: never; Returns: Json }
      generate_case_number: { Args: never; Returns: string }
      is_admin: { Args: { user_email: string }; Returns: boolean }
      is_super_admin: { Args: { user_email: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
