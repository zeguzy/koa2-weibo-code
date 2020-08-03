/**
 * 获取user数据
 * 格式化
 * @description user service
 * @author zegu
 */

const {User} = require('../db/model/index')
const formateUser = require('./__formate')
/**
 * 
 * @param {String} username 用户名
 * @param {String} password 密码
 */
async function getUserInfo(username,password){
    //查询条件
    const whereOpt = {
        userName:username
    }
    if(password){
        Object.assign(whereOpt,{password})
    }
    //查询
    const result = await User.findOne({
        attribute:['id','nickName','userName','gender','city','picture'],
        where:whereOpt
    })
    if(result==null){
        return  result
    }

    //格式化
    const formatRes = formateUser(result.dataValues)
    return formatRes
}

module.exports = {getUserInfo}