/**
 * 博客路由
 * @author zegu
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx, next) => {
    //调用controller
    const { content, image } = ctx.request.body
    console.log(ctx.session.userInfo)
    ctx.body = await create({ userId: ctx.session.userInfo.userId, content, image })
})

module.exports = router