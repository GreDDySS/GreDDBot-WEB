import pool from "./db";

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
    console.error('Error get channels: ', (err as Error).message);
    return [];
  }
}

export const getChannelLogs = async (channelID: number, offset: number, limit: number) => {
  try {
    const query = `
      SELECT "id", "username", "message", "badges", "color", "timestamp" 
      FROM "Logs"."сhannel_${channelID}"
      ORDER BY "timestamp" DESC
      OFFSET $1 LIMIT $2
    `;
    const result = await pool.query(query, [offset, limit]);
    return result.rows;
  } catch (err) {
    console.error(`Error get logs channel ${channelID}: `, (err as Error).message);
    return [];
  }
}