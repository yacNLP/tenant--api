import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();
const apiUrl = process.env.API_URL;
const token = process.env.TOKEN;

const currentDate = new Date();
const baseDate = currentDate.toISOString(); // Date actuelle au format ISO

// Étape 1 : Calculer la date d'il y a un an
let comparisonDate = new Date(currentDate);
comparisonDate.setFullYear(comparisonDate.getFullYear() - 1);

// Étape 2 : Calculer le décalage de jour
const currentDayOfWeek = currentDate.getDay(); // Jour actuel (0 = dimanche, 1 = lundi, etc.)
const comparisonDayOfWeek = comparisonDate.getDay(); // Jour d'il y a un an

// Calcul du décalage pour ajuster au même jour de la semaine
const dayOffset = currentDayOfWeek - comparisonDayOfWeek;

// Étape 3 : Ajuster directement la date
comparisonDate.setDate(comparisonDate.getDate() + dayOffset);
const comparisonDateISO = comparisonDate.toISOString(); // Date de comparaison au format ISO

// Résultat
console.log("BaseDate:", baseDate);
console.log("ComparisonDate:", comparisonDateISO);

// Corps de la requête
const data = {
    BaseDate: baseDate,
    ComparisonDate: comparisonDateISO,
    PeriodType: "D"
};

// Options pour la requête
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": token
    },
    body: JSON.stringify(data)
};

// Effectuer la requête
async function fetchData() {
    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        console.log("Réponse de l'API :", data);
    } catch (error) {
        console.error("Erreur :", error.message);
    }
}

fetchData();
