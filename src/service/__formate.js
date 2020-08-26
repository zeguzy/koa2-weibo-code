/**
 * @description数据格式话
 * @author zegu
 */

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant')
const { timeFormat } = require('../utils/dt')
/**
 *
 * @param {Object} obj 用户对象
 */
function _formateUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化数据库的时间
 * @param {*} obj 
 */
function _formateDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updateAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化微波内容
 * @param {Object} obj  微波数据对象
 */
function _formateContent(obj) {

    obj.contentFormate = obj.content

    //格式化
    obj.contentFormate = obj.contentFormate.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href='/profile/${userName}'>@${nickName}</a>`
        }
    )
    return obj
}
/**
 *@description 格式化用户数组，或者对象
 * @param {Array | Object } list 用户数组对象 或者 单个用户
 */
function formateUser(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        //数组对象
        return list.map(_formateUserPicture)
    }
    //单个user
    return _formateUserPicture(list)
}

/**
 * 格式化blog
 * @param {object} list 
 */
function formateBlog(list) {

    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formateDBTime).map(_formateContent)
    }

    //单个
    let result = list
    result = _formateContent(result)
    result = _formateDBTime(result)
    return result
}
module.exports = { formateUser, formateBlog }