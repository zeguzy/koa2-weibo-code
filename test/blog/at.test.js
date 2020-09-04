/**
 * @功能测试
 */
const server = require('../server')
const { COOKIE_1, USER_NAME_2, COOKIE_2 } = require('../testUserInfo')

let BLOG_ID = ''


test('新建一片博客应该成功', async () => {
    const content = 'zhangsan@a12 测试微波内容 ' + '@a12-' + USER_NAME_2 + ' test'
    const res = await server
        .post('/api/blog/create')
        .send({
            content
        }).set('cookie', COOKIE_1)
    expect(res.body.errno).toBe(0)
    BLOG_ID = res.body.data.id
})

// test('a12  获取唯独列表第一页 应该有上面创建的', async () => {
//     const res = await server.get('/api/atMe/loadMore/0')
//         .set('cookie', COOKIE_2)
//     expect(res.body.errno).toBe(0)
//     const data = res.body.data
//     const blogList = data.blogList
//     const isHaveCurBlog = blogList.some(blog => {
//         blog.id === BLOG_ID
//     })
//     expect(isHaveCurBlog).toBe(true)

// })