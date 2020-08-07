/**
 * 测试user 路由中的接口
 */
const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

let COOKIE = ''

//测试注册
test('用户应该注册成功',async ()=>{
    const res = await server
        .post('/api/user/register')
        .send({
            userName,
            password,
            gender:1
        })

    expect(res.body.errno).toBe(0)
})

//测试isExist
test('用户应该存在',async ()=>{
    const res = await server
        .post('/api/user/isExist')
        .send({userName})
    expect(res.body.errno).toBe(0)
})

//重复注册注册
test('重复注册应该失败',async ()=>{
    const res = await server
        .post('/api/user/register')
        .send({
            userName,
            password,
            gender:1
        })

    expect(res.body.errno).not.toBe(0)
})

//测试schema 检测
test('注册应该失败',async ()=>{
    const res = await server
        .post('/api/user/register')
        .send({
            userName:123,
            password:12,
            gender:'mail'
        })
    expect(res.body.errno).not.toBe(0)
})

//登录测试
test('登录应该成功',async ()=>{
    const res = await server
        .post('/api/user/login')
        .send({userName,password})
    console.log(res.body.errno)
    expect(res.body.errno).toBe(0)
    COOKIE = res.headers['set-cookie'].join(';')
})

//删除
test('删除应该成功',async ()=>{
    const res  =await server
        .post('/api/user/delete')
        .set('cookie',COOKIE)
    expect(res.body.errno).toBe(0)
})

//删除后再次查询用户名应该不存在
test('用户应该不存在',async ()=>{
    const res = await server
        .post('/api/user/isExist')
        .send({userName})
    expect(res.body.errno).not.toBe(0)
})

