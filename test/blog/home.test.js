/**
 * @description 首页test
 * @author zegu
 */
const server = require('../server')

const image = '/test.png'
const content = `test 文章内容.${Date.now()}`
const { COOKIE } = require('../testUserInfo')

let BLOG_ID = ''
test('新建一片博客应该成功', async () => {
    const res = await server
        .post('/api/blog/create')
        .send({
            image,
            content
        }).set('cookie', COOKIE)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.image).toBe(image)
    expect(res.body.data.content).toBe(content)
    BLOG_ID = res.body.data.id
})