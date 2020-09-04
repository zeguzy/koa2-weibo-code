/**
 * 博客路由
 * @author zegu
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog')
const genValidator = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { getFollwerBlog } = require('../../controller/blog')
const { getBlogListStr } = require('../../utils/blog')


router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    //调用controller
    const { content, image } = ctx.request.body
    ctx.body = await create({ userId: ctx.session.userInfo.userId, content, image })
})


router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {

    const { pageIndex } = ctx.params
    const { userId } = ctx.session.userInfo

    const result = await getFollwerBlog(userId, pageIndex)

    result.data.blogListTpl = await getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router