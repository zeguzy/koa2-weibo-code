/**
 * @description处理user路由
 */

const router = require('koa-router')()
const {isExist,register} = require('../../controller/user')

router.prefix('/api/user')

router.post('/isExist',async (ctx,next)=>{
    const {userName}  = ctx.request.body
    const result = await isExist(userName)
    ctx.body= result
})

router.post('/register',async (ctx,next)=>{
    const {
        userName,
        password,
        gender
    }  = ctx.request.body
    console.log('ok\n')
    const result = await register({userName,password,gender})
})
module.exports = router