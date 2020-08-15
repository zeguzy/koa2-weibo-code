/**
 * @description数据格式话
 * @author zegu
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
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
 * 格式化数据库的时间
 * @param {*} obj 
 */
function _formateDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updateAtFormat = timeFormat(obj.updatedAt)
    return obj
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
        return list.map(_formateDBTime)
    }

    return _formateDBTime(list)
}
module.exports = { formateUser, formateBlog }