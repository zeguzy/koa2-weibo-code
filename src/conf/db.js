/**
 * @description 存储配置
 * @author zegu
 *
 */
const { isPrd } = require('../utils/env')
/**
 * @description redis 配置
 */
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

/**
 * @description mysql 配置
 */
let
    MYSQL_CONF = {
        port: 6379,
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'koa2_weibo_db'
    }

// console.log('isPrd...', isPrd)

if (isPrd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

    MYSQL_CONF = {
        port: 6379,
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'koa2_weibo_db'
    }
}



module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}