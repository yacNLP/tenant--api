import { client } from './db.js';

const createTables = async () => {
    try {
        console.log("Started creating tables");

        // Création de la table tenants
        await client.query(`
            CREATE TABLE IF NOT EXISTS tenants (
                tenant_id SERIAL PRIMARY KEY,
                tenant_name VARCHAR(255) NOT NULL
            );
        `);
        console.log("Table tenants créée avec succès");

        // Création de la table tenant_child_ids
        await client.query(`
            CREATE TABLE IF NOT EXISTS tenant_child_ids (
                tenant_id INTEGER REFERENCES tenants(tenant_id) ON DELETE CASCADE,
                child_id INTEGER NOT NULL,
                PRIMARY KEY (tenant_id, child_id)
            );
        `);
        console.log("Table tenant_child_ids créée avec succès");

        // Création de la table tenant_statistics
        await client.query(`
            CREATE TABLE IF NOT EXISTS tenant_statistics (
                stat_id SERIAL PRIMARY KEY,
                tenant_id INTEGER REFERENCES tenants(tenant_id) ON DELETE CASCADE,
                start_time TIMESTAMP NOT NULL,
                end_time TIMESTAMP NOT NULL,
                start_time_compare TIMESTAMP,
                end_time_compare TIMESTAMP,
                order_total_incl NUMERIC,
                order_total_excl NUMERIC,
                order_count INTEGER,
                dinner_count INTEGER,
                dinner_by_tickets NUMERIC,
                dinner_average NUMERIC,
                dinner_average_excl NUMERIC,
                order_total_incl_previous NUMERIC,
                order_total_excl_previous NUMERIC,
                order_count_previous INTEGER,
                order_amount_average NUMERIC,
                order_amount_excl_average NUMERIC,
                dinner_count_previous INTEGER,
                dinner_by_tickets_previous NUMERIC,
                dinner_average_previous NUMERIC,
                dinner_average_excl_previous NUMERIC,
                order_total_incl_progression NUMERIC,
                order_total_excl_progression NUMERIC,
                order_count_progression NUMERIC,
                order_amount_average_progression NUMERIC,
                order_amount_excl_average_progression NUMERIC,
                dinner_count_progression INTEGER,
                dinner_by_tickets_progression NUMERIC,
                dinner_average_progression NUMERIC,
                dinner_average_excl_progression NUMERIC
            );
        `);
        console.log("Table tenant_statistics créée avec succès");

        console.log("Tables créées avec succès !");
    } catch (error) {
        console.error("Erreur lors de la création des tables :", error.message);
        throw error;
    } finally {
        client.end();
    }
};

createTables();
