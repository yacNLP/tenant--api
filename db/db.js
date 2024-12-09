import pkg from "pg";
const { Client } = pkg; // Extraire `Client` depuis le package importé

import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log("Connecté à la base de données PostgreSQL"))
  .catch((err) =>
    console.error("Erreur de connexion à PostgreSQL :", err.message)
  );
