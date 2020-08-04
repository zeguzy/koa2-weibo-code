/**
 * @description数据格式话
 * @author zegu
 */

const {DEFAULT_PICTURE} =require('../conf/constant')
/**
 *
 * @param {Object} obj 用户对象
 */
function _formateUserPicture(obj){
    if(obj.picture == null){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}
/**
 *@description 格式化用户数组，或者对象
 * @param {Array | Object } list 用户数组对象 或者 单个用户
 */
function formateUser(list){
    if(list == null){
        return list
    }

    if(list instanceof Array){
        //数组对象
        return list.map(_formateUserPicture)
    }
    //单个user
    return _formateUserPicture(list)
}
module.exports  =  formateUser