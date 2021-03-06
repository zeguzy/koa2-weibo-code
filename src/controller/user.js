/**
 * @description user controller
 * @author zegu
 */
const { getUserInfo, createUser, deleteUser, updataUser } = require('../service/user')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')
const {
    registerUserNameNotExistInfo,
    UserNameIsExistInfo,
    registerFalid,
    deleteUserFailInfo,
    userNotExistError,
    changeUserFailInfo
} = require('../model/ErrorList')
const doCrypto = require('../utils/crypto')
const { follow } = require('./userRelation')
/**
 * 判断用户是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
    const result = await getUserInfo(userName)
    if (result) {
        return new SuccessModel(result)
    }

    //用户名未村在
    return new ErrorModel(registerUserNameNotExistInfo)
}
/**
 * 注册
 * @param {object} param0   userName, password, gender 
 */
async function register({ userName, password, gender }) {
    const result = await getUserInfo(userName)
    if (result) {
        //用户名已存在
        console.log('用户名已存在')
        return new ErrorModel(UserNameIsExistInfo)
    }

    //注册
    try {
        const result = await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        // console.log('result...', result)

        await follow(result.id, result.id)
        return new SuccessModel({})
    } catch (err) {
        console.error(err)
        return new ErrorModel(registerFalid)
    }
}

/**
 * 用户登录
 * @param {Object} ctx 上下文
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    password = doCrypto(password)
    const result = await getUserInfo(userName, password)
    if (!result) {
        return new ErrorModel(userNotExistError)
    }
    const { nickName, city, picture, gender, userId } = result
    // console.log(result)
    ctx.session.userInfo = { userName, nickName, city, picture, gender, userId }
    return new SuccessModel({})
}

/**
 * 删除用户
 * @param {String} userName yhm
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel({})
    }
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户基本信息
 * @param {Object} ctx 
 * @param {Object} param1  nickName,city,picture
 */
async function changeInfo(ctx, {
    newNickName,
    newCity,
    newPicture
}) {
    const { userName, gender, userId } = ctx.session.userInfo
    if (!newNickName) {
        newNickName = userName
    }

    //修改信息
    const result = await updataUser({ newNickName, newCity, newPicture }, {
        userName
    })
    if (result) {
        console.log(ctx.session.userInfo)
        ctx.session.userInfo = { nickName: newNickName, city: newCity, picture: newPicture, userName, gender, userId }
        console.log(ctx.session.userInfo)

        return new SuccessModel()
    }
    return new ErrorModel(changeUserFailInfo)
}

/**
 * 修改用户密码
 * @param {object} param0 userName, password, newPassword 
 */
async function changePassword({ userName, password, newPassword }) {
    const changeDate = {}
    if (newPassword) {
        changeDate.newPassword = newPassword
    }
    console.log('{ userName, password, newPassword }...', { userName, password, newPassword })
    const result = await updataUser(changeDate, { userName, password: doCrypto(password) })
    console.log('result...', result)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(changeUserFailInfo)
}

/**
 * 退出登录
 * @param {object} ctx  
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}
module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}
