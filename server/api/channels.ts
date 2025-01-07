import { defineEventHandler } from "h3";
import { getChannels } from "../db/logService";

export default defineEventHandler(async () => {
  const channels = await getChannels();
  return { channels };
})