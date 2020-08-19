/**
 * 用户博客路由
 */

const { loginCheck } = require('../../middlewares/loginChecks')
const { getUserBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')

const router = require('koa-router')()

router.prefix('/api/profile/')

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)

    const result = await getUserBlogList({ userName, pageIndex })

    //渲染为字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    // console.log(result)
    ctx.body = result


})


module.exports = router