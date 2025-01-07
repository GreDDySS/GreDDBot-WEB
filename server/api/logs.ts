import { defineEventHandler, getQuery } from "h3";
import { getChannelLogs } from "../db/logService";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const channelId = Number(query.channelId);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 100;

  if (!channelId) {
    return {
      error: "Не указан ID канала",
    };
  };

  const offset = (page - 1) * limit;
  const logs = await getChannelLogs(channelId, offset, limit);
  
  return {
    logs,
  };
});