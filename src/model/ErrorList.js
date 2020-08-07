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
    },
    jsonSchemaFiledInfo:{
        errno:10009,
        msg:'数据验证失败'
    },
    userNotExistError:{
        errno:10004,
        msg:'登录失败用户名或密码错误'
    },
    loginCheckFailInfo:{
        errno:10005,
        msg:'用户未登录'
    },
    deleteUserFailInfo:{
        errno:10010,
        msg:'删除用户失败'
    },
}