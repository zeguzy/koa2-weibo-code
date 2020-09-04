/**
 * at me api 路由
 * @author zegu
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogNotRead } = require('../../controller/at-Relation')
const { getBlogListStr } = require('../../utils/blog')
const blog = require('../../utils/blog')

router.prefix('/api/atMe')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const { userId } = ctx.session.userInfo
    const result = await getBlogNotRead(userId, pageIndex)

    result.data.blogListTpl = await getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router
