const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    console.log('start debugger')
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        msg: '你好',
        isMe: true,
        blogList: [
            { id: 1, title: 'aaa' },
            { id: 2, title: 'bbb' },
            { id: 3, title: 'ccc' },
            { id: 4, title: 'ddd' },
            { id: 5, title: 'eee' },
        ]
    })
})

router.get('/json', async (ctx, next) => {
    // const  session = ctx.session
    // if (session.viewNum == null){
    //   session.viewNum = 0
    // }
    // session.viewNum ++
    throw Error()
    ctx.body = {
        title: 'koa2 json',
        // viewNum:session.viewNum
    }
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
