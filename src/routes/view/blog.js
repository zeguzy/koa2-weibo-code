/**
 * 博客页面路由
 * @author zegu
 */


const router = require('koa-router')()
const { loginCheck, loginRedirect } = require('../../middlewares/loginChecks')
const { getUserBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getUserSquareList } = require('../../controller/blog-square')
const { getFans, getFollowersData, getRelationCount } = require('../../controller/userRelation')
const { getFollwerBlog } = require('../../controller/blog')

router.get('/', loginRedirect, async (ctx, next) => {

    //已经登录的用户信息
    const myUserInfo = ctx.session.userInfo
    const userId = myUserInfo.userId

    //获取第一页
    const result = await getFollwerBlog(userId, pageIndex = 0)

    //获取粉丝
    const fansData = await getFans(myUserInfo.userId)

    //关注人列表
    const followerData = await getFollowersData(myUserInfo.userId)

    //获取未读消息
    const atCountResult = await getRelationCount(myUserInfo.userId)
    userData = {
        userInfo: myUserInfo,
        fansData: fansData.data,
        followersData: {
            count: followerData.data.count,
            list: followerData.data.userList
        },
        atCount: atCountResult.data,
    }
    await ctx.render('index', {
        userData,
        blogData: result.data
    })
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
    const fansData = await getFans(curUserInfo.userId)

    //我是否关注了此人
    const amIFollowed = fansData.data.userList.some(item => {
        return item.userName === myUserName
    })

    //关注人列表
    const followerData = await getFollowersData(curUserInfo.userId)

    //获取未读消息
    const atCountResult = await getRelationCount(curUserInfo.userId)
    // console.log(userData)
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
            amIFollowed,
            atCount: atCountResult.data,
            followersData: {
                count: followerData.data.count,
                list: followerData.data.userList
            }
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