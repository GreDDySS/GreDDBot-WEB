import { defineEventHandler, getQuery } from "h3";
import { getChannelLogs } from "../db/logService";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const channelId = Number(query.channelId);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 100;
  const searchQuery = query.query as string | undefined;
  const username = query.username as string | undefined;
  const date = query.date as string | undefined;

  if (!channelId) {
    return {
      error: "Не указан ID канала",
    };
  };

  const offset = (page - 1) * limit;
  const { logs, total } = await getChannelLogs(channelId, offset, limit, {query: searchQuery, username, date});
  
  return {
    logs,
    total,
  };
});