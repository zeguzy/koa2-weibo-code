/**
 * 用户广场页路由
 * @author zegu
 */

const { loginCheck } = require('../../middlewares/loginChecks')
const { getUserSquareList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')


const router = require('koa-router')()



router.prefix('/api/square/')
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {

    const { pageIndex } = ctx.params
    console.log(pageIndex)
    const result = await getUserSquareList({ pageIndex })

    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    console.log(result)
    ctx.body = result
})

module.exports = router
