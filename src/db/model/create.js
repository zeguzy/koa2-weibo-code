const  {User}= require('./index')

!(async function(){
    const zhangsan = await User.create({
        userName:'zhangsan',
        password:'123',
        nickName:'张三'
    })})()
