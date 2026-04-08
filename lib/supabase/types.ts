export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type ReserveTextFieldName =
  | "reserve_text_01"
  | "reserve_text_02"
  | "reserve_text_03"
  | "reserve_text_04"
  | "reserve_text_05"
  | "reserve_text_06"
  | "reserve_text_07"
  | "reserve_text_08"
  | "reserve_text_09"
  | "reserve_text_10"
  | "reserve_text_11"
  | "reserve_text_12"
  | "reserve_text_13"
  | "reserve_text_14"
  | "reserve_text_15";

type ReserveNumberFieldName =
  | "reserve_num_01"
  | "reserve_num_02"
  | "reserve_num_03"
  | "reserve_num_04"
  | "reserve_num_05"
  | "reserve_num_06"
  | "reserve_num_07"
  | "reserve_num_08"
  | "reserve_num_09"
  | "reserve_num_10"
  | "reserve_num_11"
  | "reserve_num_12"
  | "reserve_num_13"
  | "reserve_num_14"
  | "reserve_num_15";

type ReserveTextRow = Record<ReserveTextFieldName, string | null>;
type ReserveTextInsert = Partial<Record<ReserveTextFieldName, string | null>>;
type ReserveNumberRow = Record<ReserveNumberFieldName, number | null>;
type ReserveNumberInsert = Partial<Record<ReserveNumberFieldName, number | null>>;

type AuditRow = {
  created_at: string;
  created_by_user: string;
  updated_at: string;
  updated_by_user: string;
};

type AuditInsert = {
  created_at?: string;
  created_by_user?: string;
  updated_at?: string;
  updated_by_user?: string;
};

type DynamicItemFields = Record<string, string | null>;

export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          id: string;
          warehouse: string;
          company: string;
          item_number: string;
          item_description_1: string;
        } & DynamicItemFields & AuditRow & ReserveTextRow & ReserveNumberRow;
        Insert: {
          id?: string;
          warehouse: string;
          company: string;
          item_number: string;
          item_description_1: string;
        } & Partial<DynamicItemFields> & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
        Update: {
          id?: string;
          warehouse?: string;
          company?: string;
          item_number?: string;
          item_description_1?: string;
        } & Partial<DynamicItemFields> & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
      };
      locations: {
        Row: {
          id: string;
          warehouse: string;
          company: string;
          code: string;
          zone: string;
          aisle: string;
          bin: string;
          capacity: string;
          status: string;
        } & AuditRow & ReserveTextRow & ReserveNumberRow;
        Insert: {
          id?: string;
          warehouse: string;
          company: string;
          code: string;
          zone: string;
          aisle: string;
          bin: string;
          capacity: string;
          status?: string;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
        Update: {
          id?: string;
          warehouse?: string;
          company?: string;
          code?: string;
          zone?: string;
          aisle?: string;
          bin?: string;
          capacity?: string;
          status?: string;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
      };
      goods_receipts: {
        Row: {
          id: string;
          warehouse: string;
          company: string;
          receipt_no: string;
          supplier: string;
          item_number: string;
          quantity: number;
          location_code: string;
          status: string;
        } & AuditRow & ReserveTextRow & ReserveNumberRow;
        Insert: {
          id?: string;
          warehouse: string;
          company: string;
          receipt_no: string;
          supplier: string;
          item_number: string;
          quantity: number;
          location_code: string;
          status?: string;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
        Update: {
          id?: string;
          warehouse?: string;
          company?: string;
          receipt_no?: string;
          supplier?: string;
          item_number?: string;
          quantity?: number;
          location_code?: string;
          status?: string;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
      };
      inventory: {
        Row: {
          id: string;
          warehouse: string;
          company: string;
          item_number: string;
          description: string;
          location_code: string;
          on_hand: number;
          allocated: number;
          available: number;
        } & AuditRow & ReserveTextRow & ReserveNumberRow;
        Insert: {
          id?: string;
          warehouse: string;
          company: string;
          item_number: string;
          description: string;
          location_code: string;
          on_hand?: number;
          allocated?: number;
          available?: number;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
        Update: {
          id?: string;
          warehouse?: string;
          company?: string;
          item_number?: string;
          description?: string;
          location_code?: string;
          on_hand?: number;
          allocated?: number;
          available?: number;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
      };
      sales_orders: {
        Row: {
          id: string;
          warehouse: string;
          company: string;
          order_no: string;
          customer: string;
          order_date: string;
          item_count: number;
          ship_from: string;
          status: string;
          notes: string | null;
        } & AuditRow & ReserveTextRow & ReserveNumberRow;
        Insert: {
          id?: string;
          warehouse: string;
          company: string;
          order_no: string;
          customer: string;
          order_date: string;
          item_count?: number;
          ship_from: string;
          status?: string;
          notes?: string | null;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
        Update: {
          id?: string;
          warehouse?: string;
          company?: string;
          order_no?: string;
          customer?: string;
          order_date?: string;
          item_count?: number;
          ship_from?: string;
          status?: string;
          notes?: string | null;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
      };
      process_field_settings: {
        Row: {
          id: string;
          process_name: string;
          field_key: string;
          display_label: string;
          is_visible: boolean;
          is_required: boolean;
          sort_order: number;
        } & AuditRow & ReserveTextRow & ReserveNumberRow;
        Insert: {
          id?: string;
          process_name: string;
          field_key: string;
          display_label: string;
          is_visible?: boolean;
          is_required?: boolean;
          sort_order?: number;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
        Update: {
          id?: string;
          process_name?: string;
          field_key?: string;
          display_label?: string;
          is_visible?: boolean;
          is_required?: boolean;
          sort_order?: number;
        } & AuditInsert & ReserveTextInsert & ReserveNumberInsert;
      };
    };
  };
};
