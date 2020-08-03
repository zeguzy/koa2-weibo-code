/**
 * @description user controller
 * @author zegu
 */
const {getUserInfo,}=require('../service/user')
const  {SuccessModel,ErrorModel} = require('../model/ResultModel')
const {registerUserNameNotExistInfo}=require('../model/ErrorList')

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

module.exports = {
    isExist,
}