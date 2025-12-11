import type { Table, Tables } from "../types";

export interface Data {
  message: string;
  success: boolean;
  data: any[];
}

export interface DataTable {
  message: string;
  success: boolean;
  data: Table[];
}
