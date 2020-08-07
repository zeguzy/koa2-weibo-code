/**
 * @description user controller
 * @author zegu
 */
const {getUserInfo,createUser,deleteUser}=require('../service/user')
const  {SuccessModel,ErrorModel} = require('../model/ResultModel')
const {
    registerUserNameNotExistInfo,
    UserNameIsExistInfo,
    registerFalid,
    deleteUserFailInfo,
    userNotExistError}=require('../model/ErrorList')
const doCrypto = require('../utils/crypto')
/**
 * @param {String} username 用户名
 */
async function isExist (username){
    const result = await getUserInfo(username)
    if(result){
        return  new SuccessModel({data:result})
    }

    //用户名未村在
    return new ErrorModel(registerUserNameNotExistInfo)
}

async function register ({userName,password,gender}){
    const result = await getUserInfo(userName)
    if(result){
        //用户名已存在
        console.log(用户名已存在)
        return new ErrorModel(UserNameIsExistInfo)
    }

    //注册
    try{
        createUser({
            userName,
            password:doCrypto(password),
            gender
        })
        return new SuccessModel({})
    }catch(err){
        console.error(err)
        return new ErrorModel(registerFalid)
    }
}

/**
 * 用户注册
 * @param {Object} ctx 上下文
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx,userName,password){
    password = doCrypto(password)
    const result = await getUserInfo(userName,password)
    if(!result){
        return new ErrorModel(userNotExistError)
    }
    const {nickName,city,picture,gender} = result
    ctx.session.userInfo = {userName,nickName,city,picture,gender}
    return new SuccessModel({})
}

/**
 * 删除用户
 * @param {String} userName yhm
 */
async function deleteCurUser(userName) {
    const result = await deleteUser(userName)
    if(result){
        return new SuccessModel({})
    }
    return new ErrorModel(deleteUserFailInfo)
}
module.exports = {
    isExist,
    register,
    login,
    deleteCurUser
}
