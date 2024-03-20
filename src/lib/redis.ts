import { createClient } from 'redis'

const redis = createClient({
  url: 'redis://:dockerredis@localhost:6379',
})

redis.connect().then(() => console.log('redis connected'))

export { redis }
