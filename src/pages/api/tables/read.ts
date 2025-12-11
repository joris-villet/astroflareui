import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db';

export const GET: APIRoute = async (context: any) => {
  try {
    const env = context.locals.env;
    const db = connectDB(env.DATABASE_URL);

    const tables = await db
      .select('table_name')
      .from('information_schema.tables')
      .where({
        table_schema: 'public', // ← crucial pour PostgreSQL
        table_type: 'BASE TABLE',
      })
      .andWhere('table_name', 'not like', 'pg_%') // optionnel : exclut les tables système résiduelles
      .andWhere('table_name', 'not like', 'sql_%');

    // console.log("tables from endpoint => ", tables);

    return new Response(
      JSON.stringify({
        message: 'success',
        successs: true,
        data: tables,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'This was a Error!',
        success: false,
        data: error,
      })
    );
  }
};
