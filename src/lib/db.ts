import knex from "knex";

// export const connectDB = (connectionString: string) => {
//   return knex({
//     client: "pg",
//     connection: {
//       connectionString: connectionString,
//       ssl: true,
//     },
//   });
// };

export const connectDB = (connectionString: string) => {
  // Extrait le sslmode depuis la query string de la connexion
  const url = new URL(connectionString);
  const sslmode = url.searchParams.get("sslmode") || "";

  const sslConfig =
    sslmode === "require" || sslmode === "prefer" || sslmode === "verify-ca"
      ? { rejectUnauthorized: false }
      : sslmode === "verify-full"
      ? true
      : false;

  return knex({
    client: "pg",
    connection: {
      connectionString: connectionString,
      ssl: sslConfig,
    },
  });
};
