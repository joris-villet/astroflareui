import type { Tables } from '../types';

export interface Data {
  message: string;
  success: boolean;
  data: any[];
}

interface ApiResponse<T> {
  message: string;
  success: boolean; // TypeScript va te forcer à l'épeler correctement
  data: T[];
}

// export interface DataTable {
//   message: string;
//   success: boolean;
//   data: Table[];
// }

// export type Table = Record<string, string>;
export interface Table {
  table_name: string;
}
