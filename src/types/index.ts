export type Tables = {
  table_name: string;
};

export type Table = {
  id: number;
  brand_name?: string;
  model_name?: string;
  size_icon_logo?: string;
};

// types.ts
export type TableRow = Record<string, unknown>;
export type TableColumn = string;

export interface DataTable {
  success: boolean;
  data: TableRow[];
}
