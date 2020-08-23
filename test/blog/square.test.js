/**
 * 微波广场test
 * @author zegu
 */

const sever = require('../server')
const { COOKIE_1, USER_NAME } = require('../testUserInfo')
const serve = require('koa-static')
const server = require('../server')

test('微波广场，加载第一页应该成功', async () => {
    const res = await server
        .get(`/api/square/loadMore/0`)
        .set('cookie', COOKIE_1)
    expect(res.body.errno).toBe(0)
    const data = res.body.data

    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('blogListTpl')
    expect(data).toHaveProperty('count')
})
