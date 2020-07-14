async function test(params) {
  const Redis = require('ioredis')

  const redis = new Redis({
    port: 6379, // Redis port
    // host: "127.0.0.1", // Redis host
    // family: 4, // 4 (IPv4) or 6 (IPv6)
    // password: "auth",
    // db: 0, // db一般都不会使用它，一般都是默认0，使用主从数据库的情况下，使用其他数据库可能会出现问题
  })
  await redis.setex('c', 10, 123)
  const keys = await redis.keys('*')
  console.log('keys-->', keys)
  console.log(await redis.get('c'))
}

test()