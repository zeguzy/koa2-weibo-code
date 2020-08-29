/**
 * 用户关系service
 * @author zegu
 */
const { User, UserRelation, AtRelation } = require('../db/model/index')
const { formateUser } = require('./__formate')
const Sequelize = require('sequelize')
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
                    followerId,
                    userId: {
                        [Sequelize.Op.ne]: followerId
                    }
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

async function getFollowersByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: {
            model: User,
            attributes: ['id', 'userName', 'nickName', 'picture', 'city']
        },
        where: {
            userId: userId,
            followerId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })

    let userList = result.rows.map(row => row.user)
    userList = userList.map(row => row.dataValues)
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

/**
 * 获取未读数
 * @param {int} userId 
 */
async function getRelationCountByUser(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId: userId,
            isRead: false
        }
    })
    return result.count
}
module.exports = {
    getUsersByFollower,
    insertRelation,
    deleteRelation,
    getFollowersByUser,
    getRelationCountByUser
}