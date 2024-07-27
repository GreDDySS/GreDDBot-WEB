import { withPG } from "../plugins/pg";

export default eventHandler(async (event) => {
  return await withPG(event, async (dbClient) => {
    const channels = await dbClient.query(`SELECT * from channel where "logging" = '1'`)
    const result = channels.rows.map((item) => {
      return {id: item.userId, name: item.name}
    })
    return result
  })
})