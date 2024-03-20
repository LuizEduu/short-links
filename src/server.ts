import fastify from 'fastify'
import { z } from 'zod'
import { make } from './factories/linkServiceFactory'

const app = fastify()

app.get('/:code', async (request, reply) => {
  const { linksService } = make()

  const paramsSchema = z.object({
    code: z.string().min(3),
  })

  const { code } = paramsSchema.parse(request.params)

  const link = await linksService.getLinkByCode(code)

  if (!link) {
    return reply.status(400).send({
      message: 'Link not found.',
    })
  }

  return reply.redirect(301, link?.original_url)
})

app.get('/api/links', async (_, reply) => {
  const { linksService } = make()

  const result = await linksService.list()

  return reply.send(result)
})

app.post('/api/links', async (request, reply) => {
  const { linksService } = make()

  const createLinkSchema = z.object({
    code: z.string().min(3),
    url: z.string().url(),
  })

  const { code, url } = createLinkSchema.parse(request.body)

  const result = await linksService.create(code, url)

  return reply.status(201).send({
    shortLinkId: result.id,
  })
})

app.get('/api/metrics', async (_, reply) => {
  const { linksService } = make()

  const result = await linksService.metrics()

  return reply.send(result)
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Http server is running')
  })
