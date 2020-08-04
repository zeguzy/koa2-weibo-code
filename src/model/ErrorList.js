/**
 * @description 管理错误常量
 * @author zegu
 */

module.exports = {
    registerUserNameNotExistInfo:{
        errno:10003,
        msg:'用户名未存在'
    },

    UserNameIsExistInfo:{
        errno:10004,
        msg:'用户名存在'
    },
    registerFalid:{
        errno:10002,
        msg:'注册失败'
    }
}