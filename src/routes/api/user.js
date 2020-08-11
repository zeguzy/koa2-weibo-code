/**
 * @description处理user路由
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser, changeInfo, changePassword, logout } = require('../../controller/user')
const userValidate = require('../../validator/user')
const genValidator = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')


router.prefix('/api/user')

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    const result = await isExist(userName)
    ctx.body = result
})

router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const {
        userName,
        password,
        gender
    } = ctx.request.body
    const result = await register({ userName, password, gender })
    ctx.body = result
})

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    const result = await login(ctx, userName, password)
    ctx.body = result
})

router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

//修改个人信息
router.patch('/changeInfo', loginCheck, async (ctx, next) => {
    const {
        nickName,
        city,
        picture
    } = ctx.request.body

    ctx.body = await changeInfo(ctx, {
        newNickName: nickName,
        newCity: city,
        newPicture: picture
    })
})

//修改密码
router.patch('/changePassword', loginCheck, async (ctx, next) => {
    const {
        password,
        newPassword
    } = ctx.request.body

    console.log(ctx.session.userInfo)
    const userName = ctx.session.userInfo.userName
    ctx.body = await changePassword({ userName, password, newPassword })

})

//退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})


module.exports = router

