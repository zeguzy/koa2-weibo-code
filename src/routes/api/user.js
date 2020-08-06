/**
 * @description处理user路由
 */

const router = require('koa-router')()
const {isExist,register,login} = require('../../controller/user')
const userValidate = require('../../validator/user')
const genValidator = require('../../middlewares/validator')
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
})

router.post('/login',async (ctx,next)=>{
    const {userName,password} = ctx.request.body
    return login(ctx,userName,password)
})
module.exports = router