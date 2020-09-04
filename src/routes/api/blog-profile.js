/**
 * 用户博客路由
 */

const { loginCheck } = require('../../middlewares/loginChecks')
const { getUserBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unfollow } = require('../../controller/userRelation')

const router = require('koa-router')()

router.prefix('/api/profile/')

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)

    const result = await getUserBlogList({ userName, pageIndex })

    //渲染为字符串
    result.data.blogListTpl = await getBlogListStr(result.data.blogList)

    // console.log(result)
    ctx.body = result


})

router.post('/follow', loginCheck, async (ctx, next) => {
    const userId = ctx.session.userInfo.userId
    const { followerId } = ctx.request.body

    //调用cotroller
    ctx.body = await follow(followerId, userId)
})

router.post('/unfollow', loginCheck, async (ctx, next) => {
    const userId = ctx.session.userInfo.userId
    const { followerId } = ctx.request.body

    //调用cotroller
    ctx.body = await unfollow(followerId, userId)
})


module.exports = router