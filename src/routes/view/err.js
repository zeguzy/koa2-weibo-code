/**
 * @description err 和 404 路由
 * @author zegu
 */

const router = require('koa-router')()


router.get('/error',async (ctx,next)=>{
    await ctx.render('error')
})

router.get('*',async (ctx,next)=>{
    await ctx.render('404')
})


module.exports = router