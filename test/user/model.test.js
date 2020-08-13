/**
 * @description model单元测试
 * @author zegu
 */
const  {User} = require('../../src/db/model/index')

test(' 测试modle是否符合预期 ',()=>{
    const user = User.build({
        userName:'zhangsan',
        password:'123',
        nickName:'张三',
        city:'bg',
        picture:'/dfdf.jpg',
        gender:1
    })

    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123')
    expect(user.nickName).toBe('张三')
    expect(user.city).toBe('bg')
    expect(user.picture).toBe('/dfdf.jpg')
    expect(user.gender).toBe(1)
})