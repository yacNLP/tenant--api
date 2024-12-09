import { client } from './db.js';

export const insertData = async (data) => {
    try {
        console.log("Insertion des tenants...");

        // Vérification des colonnes pour tenants
        const tenantColumns = ["tenant_id", "tenant_name"];
        if (!data.StatsByTenants || !data.StatsByTenants.length) {
            throw new Error("Les données des tenants sont absentes ou invalides.");
        }

        for (const tenant of data.StatsByTenants) {
            const tenantData = [tenant.TenantId, tenant.TenantName];
            if (tenantData.some((value, index) => tenantColumns[index] === undefined)) {
                throw new Error(`Clé manquante ou invalide dans tenant: ${JSON.stringify(tenant)}`);
            }

            await client.query(
                `INSERT INTO tenants (tenant_id, tenant_name)
                 VALUES ($1, $2)
                 ON CONFLICT (tenant_id) DO NOTHING;`,
                tenantData
            );
        }

        console.log("Insertion des ChildIds...");
        for (const tenant of data.StatsByTenants) {
            if (tenant.ChildIds && Array.isArray(tenant.ChildIds)) {
                for (const childId of tenant.ChildIds) {
                    await client.query(
                        `INSERT INTO tenant_child_ids (tenant_id, child_id)
                         VALUES ($1, $2)
                         ON CONFLICT DO NOTHING;`,
                        [tenant.TenantId, childId]
                    );
                }
            }
        }

        console.log("Insertion des statistiques des tenants...");
        for (const tenant of data.StatsByTenants) {
            const statsColumns = [
                "tenant_id", "start_time", "end_time", "start_time_compare", "end_time_compare",
                "order_total_incl", "order_total_excl", "order_count", "order_amount_average", "order_amount_excl_average",
                "dinner_count", "dinner_by_tickets", "dinner_average", "dinner_average_excl",
                "order_total_incl_previous", "order_total_excl_previous", "order_count_previous",
                "order_amount_average_previous", "order_amount_excl_average_previous",
                "dinner_count_previous", "dinner_by_tickets_previous", "dinner_average_previous", "dinner_average_excl_previous",
                "order_total_incl_progression", "order_total_excl_progression", "order_count_progression",
                "order_amount_average_progression", "order_amount_excl_average_progression",
                "dinner_count_progression", "dinner_by_tickets_progression", "dinner_average_progression", "dinner_average_excl_progression"
            ];

            const statsData = [
                tenant.TenantId, data.StartTime, data.EndTime, data.StartTimeCompare, data.EndTimeCompare,
                tenant.OrderTotalIncl, tenant.OrderTotalExcl, tenant.OrderCount, tenant.OrderAmountAverage, tenant.OrderAmountExclAverage,
                tenant.DinnerCount, tenant.DinnerByTickets, tenant.DinnerAverage, tenant.DinnerAverageExcl,
                tenant.OrderTotalInclPrevious, tenant.OrderTotalExclPrevious, tenant.OrderCountPrevious,
                tenant.OrderAmountAveragePrevious, tenant.OrderAmountExclAveragePrevious,
                tenant.DinnerCountPrevious, tenant.DinnerByTicketsPrevious, tenant.DinnerAveragePrevious, tenant.DinnerAverageExclPrevious,
                tenant.OrderTotalInclProgression, tenant.OrderTotalExclProgression, tenant.OrderCountProgression,
                tenant.OrderAmountAverageProgression, tenant.OrderAmountExclAverageProgression,
                tenant.DinnerCountProgression, tenant.DinnerByTicketsProgression, tenant.DinnerAverageProgression, tenant.DinnerAverageExclProgression
            ];

            if (statsData.some((value, index) => statsColumns[index] === undefined)) {
                throw new Error(`Clé manquante ou invalide dans les statistiques: ${JSON.stringify(tenant)}`);
            }

            await client.query(
                `INSERT INTO tenant_statistics (
                    tenant_id, start_time, end_time, start_time_compare, end_time_compare,
                    order_total_incl, order_total_excl, order_count, order_amount_average, order_amount_excl_average,
                    dinner_count, dinner_by_tickets, dinner_average, dinner_average_excl,
                    order_total_incl_previous, order_total_excl_previous, order_count_previous,
                    order_amount_average_previous, order_amount_excl_average_previous,
                    dinner_count_previous, dinner_by_tickets_previous, dinner_average_previous, dinner_average_excl_previous,
                    order_total_incl_progression, order_total_excl_progression, order_count_progression,
                    order_amount_average_progression, order_amount_excl_average_progression,
                    dinner_count_progression, dinner_by_tickets_progression, dinner_average_progression, dinner_average_excl_progression
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                    $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32
                )
                ON CONFLICT DO NOTHING;`,
                statsData
            );
        }

        console.log("Données insérées avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'insertion des données :", error.message);
        throw error; // Relance l'erreur pour que `index.js` puisse la gérer
    }
};
