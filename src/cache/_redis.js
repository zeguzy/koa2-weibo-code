/**
 * @description 连接redis的方法  get set
 * @author zegu
 */
const { REDIS_CONF } = require('../conf/db')
const redis = require('redis')


//创建 客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', (err) => {
    console.error(err)
})

/**
 * 
 * @param {string} key 键
 * @param {*string} val 值
 * @param {*number} timeout  过期时间，单位 s
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 *
 * @param {string} get
 */
function get(key) {
    const promise = new Promise((resole, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resole(null)
                return
            }

            try {
                resole(
                    JSON.parse(val)
                )
            } catch (ex) {
                resole(val)
            }
        })
    })
    return promise
}

module.exports = { set, get }
