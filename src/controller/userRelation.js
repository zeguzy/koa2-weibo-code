/**
 * 用户关系 业务逻辑
 * @author zegu
 */
const { getUsersByFollower, getFollowersByUser } = require('../service/userRelation')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')
const { insertRelation, deleteRelation } = require('../service/userRelation')
const { followErrorInfo, unfollowErrorInfo } = require('../model/ErrorList')
/**
 * 根据用户id返回粉丝列表
 * @param {int} userId 
 */
async function getFans(userId) {
    //service
    const { count, userList } = await getUsersByFollower(userId)
    return new SuccessModel({
        count, userList
    })
}

/**
 * 根据用户id返回关注人列表
 * @param {int} userId 
 */
async function getFollowersData(userId) {
    //service
    const { count, userList } = await getFollowersByUser(userId)
    return new SuccessModel({
        count, userList
    })
}

/**
 * 关注
 * @param {int} followerId 被关注人
 * @param {int} userId 关注人
 */
async function follow(followerId, userId) {

    try {
        await insertRelation(followerId, userId)
        return new SuccessModel()
    } catch (err) {
        console.error(err)
        new new ErrorModel(followErrorInfo)
    }
}

/**
 * 取消关注
 * @param {int} followerId 被关注人
 * @param {int} userId 关注人
 */
async function unfollow(followerId, userId) {
    try {
        await deleteRelation(followerId, userId)
        return new SuccessModel()
    } catch (err) {
        console.error(err)
        new new ErrorModel(unfollowErrorInfo)
    }
}


module.exports = {
    getFans,
    follow,
    unfollow,
    getFollowersData
}