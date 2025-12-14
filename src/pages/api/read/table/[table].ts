import type { APIRoute } from 'astro';
import { getDb } from '../../../../lib/db';

export const GET: APIRoute = async (context: any) => {
  try {
    const { table } = context.params;
    console.log('table params => ', table);
    const env = context.locals.env;
    // console.log("env local => ", env);

    const db = getDb(env.DATABASE_URL);
    const data = await db.selectFrom(table).selectAll().limit(20).execute();

    // console.log("table clicked => ", data);

    return new Response(
      JSON.stringify({
        message: 'This was a GET from read table!',
        success: true,
        data,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'This was a Error!',
      })
    );
  }
};
