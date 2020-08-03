/**
 * @description处理user路由
 */

const router = require('koa-router')()
const {isExist} = require('../../controller/user')

router.prefix('/api/user')

router.get('/isExist',async (ctx,next)=>{
    const {username}  = ctx.request.body
    const result = await isExist(username)
    ctx.body= result
})

module.exports = router