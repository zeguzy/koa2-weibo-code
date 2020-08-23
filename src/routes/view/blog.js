/**
 * 博客页面路由
 * @author zegu
 */


const router = require('koa-router')()
const { loginCheck, loginRedirect } = require('../../middlewares/loginChecks')
const { getUserBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getUserSquareList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/userRelation')
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

    //调用controller 获取微波第一页
    const result = await getUserBlogList({ userName: curUserName, pageIndex: 0 })
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    //获取粉丝
    //controller
    console.log('curUserInfo.id....', curUserInfo)
    const fansData = await getFans(curUserInfo.userId)

    console.log('fansData...', fansData.data)
    //我是否关注了此人
    const amIFollowed = fansData.data.userList.some(item => {
        return item.userName === myUserName
    })
    console.log('amIFollowed...', amIFollowed)


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
            isMe: isMe,
            fansData: fansData.data,
            amIFollowed
        }

    })
})

/**
 * 广场页
 */
router.get('/square', loginRedirect, async (ctx, next) => {
    //调用controller
    const result = await getUserSquareList({ pageIndex: 0 })
    const { isEmpty, blogList, pageSize, count } = result.data
    await ctx.render('square', {
        blogData: {
            isEmpty,
            count,
            blogList,
            pageSize,
            pageIndex: 0
        }
    })
})
module.exports = router