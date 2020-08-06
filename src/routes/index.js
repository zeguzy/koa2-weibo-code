const router = require('koa-router')()
const {loginCheck,loginRedirect} = require('../middlewares/loginChecks')
router.get('/', loginRedirect,async (ctx, next) => {
    console.log('start debugger')
    await ctx.render('index2')
})

router.get('/json',loginCheck, async (ctx, next) => {
    // const  session = ctx.session
    // if (session.viewNum == null){
    //   session.viewNum = 0
    // }
    // session.viewNum ++
    throw Error()
})


router.get('/profile/:username', async function (ctx, next) {
    const { username } = ctx.params
    ctx.body = {
        title: 'this is profile',
        username
    }
})

router.get('/loadMore/:username/:pageIndex', async function (ctx, next) {
    const { username, pageIndex } = ctx.params
    ctx.body = {
        title: 'this is loadMore API',
        username,
        pageIndex
    }
})
module.exports = router
