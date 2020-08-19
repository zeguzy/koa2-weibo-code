/**
 * @description 处理blog数据
 * @author zegu
 */
const { Blog, User } = require('../db/model/index')
const { formateUser, formateBlog } = require('./__formate')

/**
* 
* @param {object} param0 userId, content, image 
*/
async function createBlog({ userId, content, image }) {
    console.log('userId, content, image....', userId, content, image)
    const result = await Blog.create({
        userId, content, image
    })
    return result.dataValues
}

/**
 * 
 * @param {object} param0 { userName, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize }) {
    //拼接查询条件
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }

    //执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,  //每页多少条
        offset: pageSize * pageIndex, //跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: {
            model: User,
            attributes: ['userName', 'nickName', 'picture'],
            where: userWhereOpts
        }
    })

    //result.count 总数，与分页无关
    //result.rows 查询结果

    let blogList = result.rows.map(row => row.dataValues)

    formateBlog(blogList)
    blogList = blogList.map(blogIterm => {
        const user = blogIterm.user.dataValues
        blogIterm.user = formateUser(user)
        // blogIterm.contentFormat = blogIterm.content     //暂时就这样
        // blogIterm.createdAtFormat = blogIterm.createdAt     //暂时就这样
        return blogIterm
    })

    return {
        count: result.count,
        blogList,
    }

}
module.exports = {
    createBlog,
    getBlogListByUser
}