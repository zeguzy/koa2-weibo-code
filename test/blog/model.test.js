/**
 * 测试blog模型
 * @author zegu
 */

const Blog = require('../../src/db/model/blog')

test('blog 模型的各个属性应该符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        image: '/dffdf',
        content: 'test'
    })
    expect(blog.userId).toBe(1)
    expect(blog.image).toBe('/dffdf')
    expect(blog.content).toBe('test')
})