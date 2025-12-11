import type { APIRoute } from 'astro';
import { connectDB } from '../../../../lib/db';

export const GET: APIRoute = async (context: any) => {
  try {
    console.log('JE PASSE DANS ROW ID ENDPOINT');
    const { table, id } = context.params;
    console.log('table params => ', table);
    console.log('id params => ', id);
    const env = context.locals.env;
    // console.log("env local => ", env);

    const db = connectDB(env.DATABASE_URL);
    // console.log("db => ", db);

    // const data = await db.execute(sql`SELECT * FROM ${sql.raw(table)} LIMIT 100`);
    const data = await db.select('*').from(`${table}`).where('id', id);

    console.log('row clicked => ', data);

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
