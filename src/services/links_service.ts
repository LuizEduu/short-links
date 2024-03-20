import { Link } from '../domain/link'
import { LinksRepository } from '../repositories/links_repository'

export class LinksService {
  constructor(private readonly linksRepository: LinksRepository) {}

  async create(code: string, url: string) {
    const link = new Link(code, url)

    const shortLinkId = await this.linksRepository.create(link)

    return shortLinkId
  }

  async list() {
    return this.linksRepository.list()
  }

  async getLinkByCode(code: string) {
    const link = await this.linksRepository.getLinkByCode(code)

    if (!link) {
      return null
    }

    await this.linksRepository.increments(String(link.id))

    return link
  }

  async metrics() {
    const result = await this.linksRepository.metrics()

    const metrics = result
      .sort((a, b) => b.score - a.score)
      .map((item) => ({
        shortLinkId: +item.value,
        clicks: item.score,
      }))

    return metrics
  }
}
