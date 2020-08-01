/**
 * @description json test
 */

const serve = require('./server')

test('json  test demo ',async ()=>{
    const res = await serve.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json',
    })
    expect(res.body.title).toBe('koa2 json')
})