/**
 * @description处理user路由
 */

const router = require('koa-router')()
const {isExist} = require('../../controller/user')

router.prefix('/api/user')

router.post('/isExist',async (ctx,next)=>{
    const {userName}  = ctx.request.body
    const result = await isExist(userName)
    ctx.body= result
})

module.exports = router