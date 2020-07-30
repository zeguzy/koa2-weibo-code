/**
 * @description 存储配置
 * @author zegu
 *
 */
const { isDev } = require('../utils/env')

if (isDev) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
} else {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}



module.exports = {
    REDIS_CONF
}