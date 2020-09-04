/**
 * at me api 路由
 * @author zegu
 */

const router = require('koa-roputer')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogNotRead } = require('../../controller/at-Relation')


router.prefix('/api/atMe')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    const { userId } = ctx.session.userInfo
    const result = await getBlogNotRead(userId, pageIndex)
})
