export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          id: string;
          item_code: string;
          description: string;
          category: string;
          unit: string;
          reorder_level: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          item_code: string;
          description: string;
          category: string;
          unit: string;
          reorder_level?: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          item_code?: string;
          description?: string;
          category?: string;
          unit?: string;
          reorder_level?: number;
          status?: string;
          created_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          code: string;
          zone: string;
          aisle: string;
          bin: string;
          capacity: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          zone: string;
          aisle: string;
          bin: string;
          capacity: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          zone?: string;
          aisle?: string;
          bin?: string;
          capacity?: string;
          status?: string;
          created_at?: string;
        };
      };
      goods_receipts: {
        Row: {
          id: string;
          receipt_no: string;
          supplier: string;
          item_code: string;
          quantity: number;
          location_code: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          receipt_no: string;
          supplier: string;
          item_code: string;
          quantity: number;
          location_code: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          receipt_no?: string;
          supplier?: string;
          item_code?: string;
          quantity?: number;
          location_code?: string;
          status?: string;
          created_at?: string;
        };
      };
      inventory: {
        Row: {
          id: string;
          item_code: string;
          description: string;
          location_code: string;
          on_hand: number;
          allocated: number;
          available: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          item_code: string;
          description: string;
          location_code: string;
          on_hand?: number;
          allocated?: number;
          available?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          item_code?: string;
          description?: string;
          location_code?: string;
          on_hand?: number;
          allocated?: number;
          available?: number;
          created_at?: string;
        };
      };
      sales_orders: {
        Row: {
          id: string;
          order_no: string;
          customer: string;
          order_date: string;
          item_count: number;
          ship_from: string;
          status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_no: string;
          customer: string;
          order_date: string;
          item_count?: number;
          ship_from: string;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_no?: string;
          customer?: string;
          order_date?: string;
          item_count?: number;
          ship_from?: string;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
