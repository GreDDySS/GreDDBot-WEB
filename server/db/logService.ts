import pool from "./db";
import type { LogFilters } from "../types/types";

export const getChannels = async () => {
  try {
    const query = `
      SELECT "channelId", "channelName"
      FROM "Channels"
      WHERE "logging" = true
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error(err)
    return [];
  }
}

export const getChannelLogs = async (channelId: number, offset: number, limit: number, filters: LogFilters) => {
  const conditions: string[] = [];
  const values: any[] = [];
  let paramCounter = 1;

  const baseCondition = "1=1"

  if (filters.query) {
    conditions.push(`"message" ILIKE $${paramCounter}`);
    values.push(`%${filters.query}%`);
    paramCounter++;
  }

  if (filters.username) {
    conditions.push(`"username" ILIKE $${paramCounter}`);
    values.push(`%${filters.username}%`);
    paramCounter++;
  }

  if (filters.date) {
    conditions.push(`DATE("timestamp") = $${paramCounter}::date`);
    values.push(filters.date);
    paramCounter++;
  }
  
  const whereClause = conditions.length > 0 ? `WHERE ${baseCondition} AND ${conditions.join(" AND ")}` : `WHERE ${baseCondition}`;

  const logsQuery = `
    SELECT * FROM "Logs"."сhannel_${channelId}"
    ${whereClause}
    ORDER BY "timestamp" DESC
    LIMIT $${paramCounter}::integer 
    OFFSET $${paramCounter + 1}::integer
  `;

  const countQuery = `
    SELECT COUNT(*) FROM "Logs"."сhannel_${channelId}"
    ${whereClause}
  `;

  const logsValues = [...values, limit, offset]

  const [logsResult, countResult] = await Promise.all([
    pool.query(logsQuery, logsValues),
    pool.query(countQuery, values),
  ]);

  return {
    logs: logsResult.rows,
    total: parseInt(countResult.rows[0].count, 10),
  };
}