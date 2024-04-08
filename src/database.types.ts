export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          body: string
          id: number
          sent_at: string
          sent_from: string
          sent_to: string | null
        }
        Insert: {
          body: string
          id?: number
          sent_at?: string
          sent_from: string
          sent_to?: string | null
        }
        Update: {
          body?: string
          id?: number
          sent_at?: string
          sent_from?: string
          sent_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_chat_messages_sent_from_fkey"
            columns: ["sent_from"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_chat_messages_sent_to_fkey"
            columns: ["sent_to"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_room_users: {
        Row: {
          chat_room: string
          connect_at: string | null
          id: number
          user_id: string
        }
        Insert: {
          chat_room: string
          connect_at?: string | null
          id?: number
          user_id: string
        }
        Update: {
          chat_room?: string
          connect_at?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_room_users_chat_room_fkey"
            columns: ["chat_room"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_room_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          create_at: string | null
          create_by: string | null
          id: string
          room_name: string | null
        }
        Insert: {
          create_at?: string | null
          create_by?: string | null
          id?: string
          room_name?: string | null
        }
        Update: {
          create_at?: string | null
          create_by?: string | null
          id?: string
          room_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_chat_rooms_create_at_fkey"
            columns: ["create_by"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      user_info: {
        Row: {
          email: string | null
          fullname: string | null
          id: string
          username: string | null
        }
        Insert: {
          email?: string | null
          fullname?: string | null
          id?: string
          username?: string | null
        }
        Update: {
          email?: string | null
          fullname?: string | null
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_userInfo_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
