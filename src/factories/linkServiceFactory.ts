import { LinksRepository } from '../repositories/links_repository'
import { LinksService } from '../services/links_service'

export function make() {
  const linksRepository = new LinksRepository()

  const linksService = new LinksService(linksRepository)

  return { linksService }
}
