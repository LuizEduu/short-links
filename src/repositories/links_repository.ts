import { Link } from '../domain/link'
import { sql } from '../lib/postgres'
import { redis } from '../lib/redis'

export class LinksRepository {
  async create(link: Link) {
    const result = await sql/* sql */ `
    INSERT INTO short_links(code, original_url)
    VALUES(${link.code}, ${link.original_url})
    RETURNING id
  `

    return result[0]
  }

  async list() {
    const result = await sql/* sql */ `
      SELECT *
      FROM short_links
      ORDER BY created_at DESC
    `
    return result
  }

  async getLinkByCode(code: string) {
    const result = await sql/* sql */ `
    SELECT id, original_url
    FROM short_links
    WHERE short_links.code = ${code}
  `

    return result[0]
  }

  async increments(id: string) {
    await redis.zIncrBy('metrics', 1, id)
  }

  async metrics() {
    return redis.zRangeByScoreWithScores('metrics', 0, 50)
  }
}
