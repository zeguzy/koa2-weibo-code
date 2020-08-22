/**
 * 用户关系 业务逻辑
 * @author zegu
 */
const { getUsersByFollower } = require('../service/userRelation')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')

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

module.exports = {
    getFans
}