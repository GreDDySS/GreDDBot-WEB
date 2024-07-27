import { withPG } from "../plugins/pg";

export default eventHandler(async (event) => {
  const channel = getQuery(event)

  return await withPG(event, async (dbClient) => {
   
   const message = await dbClient.query(`SELECT * from "channelLogs"."${channel.id}"`)
    const result = message.rows.map((item) => {
      const date = new Date(item.date);
      const formattedDate = date.toLocaleString('ru-ru', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).replace(/, /, ' ');
      return {
        id: item.id,
        username: item.username,
        color: item.color,
        message: item.message,
        date: formattedDate
      };
    });
    return result
  })
})