/**
 * @description 登录验证中间件
 * @author zegu
 */



const  {ErrorModel} = require('../model/ResultModel')
const {loginCheckFailInfo}=require('../model/ErrorList')


/**
 * API登录验证
 * @param {object} ctx  ctx
 * @param {function} next next
 */
async function loginCheck(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        await next()
        return
    }
    //未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 *页面 登录验证
 * @param {object} ctx ctx
 * @param {function} next  next
 */
async function loginRedirect(ctx,next) {
    if(ctx.session && ctx.session.userInfo){
        await next()
        return
    }

    //未登录
    const curUrl = ctx.url
    ctx.redirect('/login?url='+encodeURIComponent(curUrl))
}

module.exports = {
    loginRedirect,
    loginCheck
}