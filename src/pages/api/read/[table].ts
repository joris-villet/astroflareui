import type { APIRoute } from "astro";
import { connectDB } from "../../../lib/db";

export const GET: APIRoute = async (context: any) => {
  try {
    const { table } = context.params;
    // console.log("table params => ", table);
    const env = context.locals.env;
    // console.log("env local => ", env);

    const db = connectDB(env.DATABASE_URL);
    // console.log("db => ", db);

    // const data = await db.execute(sql`SELECT * FROM ${sql.raw(table)} LIMIT 100`);
    const data = await db.select("*").from(`${table}`).limit(20);

    console.log("table clicked => ", data);

    return new Response(
      JSON.stringify({
        message: "This was a GET from read table!",
        success: true,
        data,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "This was a Error!",
      })
    );
  }
};
