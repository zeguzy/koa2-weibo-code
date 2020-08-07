/**
 * @description处理user路由
 */

const router = require('koa-router')()
const {isExist,register,login,deleteCurUser} = require('../../controller/user')
const userValidate = require('../../validator/user')
const genValidator = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const {loginCheck} = require('../../middlewares/loginChecks')

router.prefix('/api/user')

router.post('/isExist',async (ctx,next)=>{
    const {userName}  = ctx.request.body
    const result = await isExist(userName)
    ctx.body= result
})

router.post('/register',genValidator(userValidate),async (ctx,next)=>{
    const {
        userName,
        password,
        gender
    }  = ctx.request.body
    const result = await register({userName,password,gender})
    ctx.body=result
})

router.post('/login',async (ctx,next)=>{
    const {userName,password} = ctx.request.body
    const result =await login(ctx,userName,password)
    console.log('result...',result)
    ctx.body = result
})

router.post('/delete',loginCheck,async (ctx,next)=>{
    if(isTest){
        const {userName}= ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})
module.exports = router