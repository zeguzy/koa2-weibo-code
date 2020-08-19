/**
 * 博客页面路由
 * @author zegu
 */


const router = require('koa-router')()
const { loginCheck, loginRedirect } = require('../../middlewares/loginChecks')
const { getUserBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})


//个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const userName = ctx.session.userInfo.userName
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    //已经登录的用户信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserName = ctx.params.userName
    let curUserInfo = myUserInfo
    const isMe = myUserName === curUserName
    console.log('curUserName...', myUserName, '...', curUserName, 'isMe...', isMe)

    if (!isMe) {
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) return
        else curUserInfo = existResult.data
    }

    //调用controller
    const result = await getUserBlogList({ userName: curUserName, pageIndex: 0 })

    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    // console.log(blogList)
    // console.log(count, blogList.length)
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            count,
            blogList,
            pageSize,
            pageIndex
        },
        userData: {
            userInfo: curUserInfo,
            isMe: isMe
        }

    })
})

module.exports = router