import dotenv from 'dotenv';
import { fetchData } from './fetch/fetchTenantsApi.js';
import { insertData } from './db/insertData.js';

dotenv.config();

const apiUrl = process.env.API_URL;
const token = process.env.TOKEN;

async function main() {
  try {
    console.log("Récupération des données depuis l'API...");
    const data = await fetchData(apiUrl, token);
    console.log("Données récupérées avec succès :", data);

    console.log("Insertion des données dans la base de données...");
    await insertData(data);
    console.log("Données insérées avec succès !");

  } catch (error) {
    console.error("Erreur dans le processus principal :", error.message);
  }
}

main();
