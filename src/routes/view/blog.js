/**
 * 博客页面路由
 * @author zegu
 */


const router = require('koa-router')()
const { loginCheck, loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})


module.exports = router