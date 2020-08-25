/**
 * 获取user数据
 * 格式化
 * @description user service
 * @author zegu
 */

const { User } = require('../db/model/index')
const { formateUser } = require('./__formate')
const doCrypto = require('../utils/crypto')

/**
 *获取用户信息
 * @param {String} username 用户名
 * @param {String} password 密码
 */
async function getUserInfo(userName, password) {
    //查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    //查询
    const result = await User.findOne({
        attribute: ['id', 'nickName', 'userName', 'gender', 'city', 'picture'],
        where: whereOpt
    })
    if (result == null) {
        return result
    }

    //格式化
    const formatRes = formateUser(result.dataValues)
    // console.log('userInfo....', formatRes)
    const { id, nickName, gender, city, picture } = formatRes
    return { userId: id, nickName, userName, gender, city, picture }
}


/**
 *
 * @param {String} userName
 * @param {String} password
 * @param {String} nickName
 * @param {number} gender
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    console.log('createUser...', userName, password, gender, nickName)
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    })
    return result.dataValues

}
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    return result > 0
}

/**
 * 
 * @param {object} param0 要修改的内容 newNickName, newCity, newPicture, newPassword
 * @param {object} param1 要查询的条件 userName, password
 */
async function updataUser({ newNickName, newCity, newPicture, newPassword }, { userName, password }) {
    const updateData = {}
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newCity) {
        updateData.city = newCity
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newPassword) {
        updateData.password = doCrypto(newPassword)
    }

    const updataWhere = {}

    if (userName) {
        updataWhere.userName = userName
    }
    if (password) {
        updataWhere.password = password
    }

    const result = await User.update(updateData, { where: updataWhere })
    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updataUser
}