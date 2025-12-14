import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/db';

export const GET: APIRoute = async (context: any) => {
  try {
    const env = context.locals.env;
    const db = getDb(env.DATABASE_URL);

    const data = await db
      .selectFrom('information_schema.tables')
      .select(['table_name'])
      .where('table_schema', '=', 'public')
      .execute();

    // console.log('tables from endpoint => ', data);

    return new Response(
      JSON.stringify({
        message: 'success',
        success: true,
        data,
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
