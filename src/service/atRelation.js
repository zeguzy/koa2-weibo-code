/**
 * at 关系
 * @author zegu
 */

const { AtRelation, Blog, User } = require('../db/model/index')
const { formateUser, formateBlog } = require('./__formate')
async function createAtRelation(userId, blogId) {
    await AtRelation.create({
        userId: userId,
        blogId: blogId
    })
}


async function getBlogByNotRead(userId, pageSize, pageIndex) {

    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: AtRelation,
                where: {
                    userId,
                    isRead: false
                }
            }
        ]
    })
    let blogList = result.rows.map(row => row.dataValues)
    formateBlog(blogList)
    blogList = blogList.map(row => {
        row.user = formateUser(row.user.dataValues)
        return row
    })
    return {
        atCount: result.count,
        blogList,
    }
}
/**
 * 通过id更改回复的状态
 */
async function updateAtRelation(blogId) {

    const result = await AtRelation.update({
        isRead: true
    }, {
        where: {
            blogId,
            isRead: false
        }
    })
    return result[0] > 0
}

module.exports = {
    createAtRelation,
    getBlogByNotRead,
    updateAtRelation
}