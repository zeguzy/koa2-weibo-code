/**
 * 用户关系service
 * @author zegu
 */
const { User, UserRelation } = require('../db/model/index')
const { formateUser } = require('./__formate')
/**
 * 通过被关注人获取粉丝列表
 * @param {int} followerId 被关注人的id
 */
async function getUsersByFollower(followerId) {

    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })

    //result.count 总数
    //result.rows
    let userList = result.rows.map(row => row.dataValues)
    userList = formateUser(userList)

    return {
        count: result.count,
        userList
    }
}

/**
 * 插入新关系
 * @param {int}} followerId 
 * @param {int} userId 
 */
async function insertRelation(followerId, userId) {
    const result = await UserRelation.create({
        followerId, userId
    })
}


/**
 * 删除关系
 * @param {int}} followerId 
 * @param {int} userId 
 */
async function deleteRelation(followerId, userId) {
    await UserRelation.destroy({
        where: {
            followerId, userId
        }
    })
}
module.exports = {
    getUsersByFollower,
    insertRelation,
    deleteRelation
}