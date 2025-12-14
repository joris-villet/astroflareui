// import knex from 'knex';

// export const connectDB = (connectionString: string) => {
//   return knex({
//     client: "pg",
//     connection: {
//       connectionString: connectionString,
//       ssl: true,
//     },
//   });
// };

// export const connectDB = (connectionString: string) => {
//   // Extrait le sslmode depuis la query string de la connexion
//   const url = new URL(connectionString);
//   const sslmode = url.searchParams.get("sslmode") || "";

//   const sslConfig =
//     sslmode === "require" || sslmode === "prefer" || sslmode === "verify-ca"
//       ? { rejectUnauthorized: false }
//       : sslmode === "verify-full"
//       ? true
//       : false;

//   return knex({
//     client: "pg",
//     connection: {
//       connectionString: connectionString,
//       ssl: sslConfig,
//     },
//   });
// };

import { Kysely } from 'kysely';
import { NeonDialect } from 'kysely-neon';
import { neon } from '@neondatabase/serverless';

const dbCache = new Map<string, Kysely<any>>();

export function getDb(databaseUrl: string) {
  const url = databaseUrl;
  if (!url) {
    throw new Error('DATABASE_URL missing');
  }

  let db = dbCache.get(url);
  if (!db) {
    db = new Kysely({
      dialect: new NeonDialect({
        neon: neon(url),
      }),
    });
    dbCache.set(url, db);
  }

  return db;
}
