/**
 * @description user controller
 * @author zegu
 */
const {getUserInfo,createUser}=require('../service/user')
const  {SuccessModel,ErrorModel} = require('../model/ResultModel')
const {registerUserNameNotExistInfo,UserNameIsExistInfo,registerFalid}=require('../model/ErrorList')

/**
 * 
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
        return new ErrorModel(UserNameIsExistInfo)
    }

    //注册
    try{
        createUser({userName,password,gender})
        return new SuccessModel({})
    }catch(err){
        console.error(err)
        return new ErrorModel(registerFalid)
    }
}

module.exports = {
    isExist,
    register
}