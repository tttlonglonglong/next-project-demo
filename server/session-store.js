function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  // 获取Redis中存储的ssession数据
  async get(sid) {
    // console.log('get session', sid)
    const id = getRedisSessionId(sid)
    const data = await this.client.get(id)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  // 存储session数据到redis,ttl:过期时间，过期自动删除
  async set(sid, sess, ttl) {
    // console.log('set session', sid, sess, ttl)
    const id = getRedisSessionId(sid)
    // 传入毫秒
    if (typeof ttl === "number") {
      ttl = Math.ceil(ttl / 1000)
    }
    try {
      const sessStr = JSON.stringify(sess)
      if (ttl) {
        // 设置有过期时间的session
        await this.client.setex(id, ttl, sessStr)
      } else {
        await this.client.set(id, sessStr)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // 从redis中删除某个session
  async destroy(sid) {
    // console.log('destroy session', sid)
    const id = getRedisSessionId(sid)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore