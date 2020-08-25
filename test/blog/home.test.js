/**
 * @description 首页test
 * @author zegu
 */
const server = require('../server')

const image = '/test.png'
const content = `test 文章内容.${Date.now()}`
const { COOKIE_1 } = require('../testUserInfo')

let BLOG_ID = ''
test('新建一片博客应该成功', async () => {
    const res = await server
        .post('/api/blog/create')
        .send({
            image,
            content
        }).set('cookie', COOKIE_1)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.image).toBe(image)
    expect(res.body.data.content).toBe(content)
    BLOG_ID = res.body.data.id
})

test('微波首页，加载第一页应该成功', async () => {
    const res = await server
        .get(`/api/blog/loadMore/0`)
        .set('cookie', COOKIE_1)
    expect(res.body.errno).toBe(0)
    const data = res.body.data

    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('blogListTpl')
    expect(data).toHaveProperty('count')
})