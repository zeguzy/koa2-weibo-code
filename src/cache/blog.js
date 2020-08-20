/**
 * 微波广场页缓存
 * @author zegu
 */


const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../service/blog')

/**
 * 获取广场缓存
 * @param {object} param0 pageIndex, pageSize
 */
async function getUserSquareCache({ pageIndex, pageSize }) {
    const REDIS_PREFIX = 'weobo:square:'
    const key = `${REDIS_PREFIX}${pageIndex}_${pageSize}`

    const result = await get(key)
    if (result) {
        return result
    }
    else {
        const result = await getBlogListByUser({ pageIndex, pageSize })
        set(key, result)

        return result
    }
}

module.exports = {
    getUserSquareCache
}
