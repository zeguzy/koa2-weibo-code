/**
 * 博客用户路由
 * @author zegu
 */

const router = require('koa-router')()
const { loginCheck, loginRedirect } = require('../../middlewares/loginChecks')


/**
 * 判断当前是否已经登录
 * @param {Object} ctx ctx上下文
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false
    }
    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})


router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
    await ctx.render('setting', ctx.session.userInfo)

})
module.exports = router