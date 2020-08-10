const  {User}= require('./index')

!(async function(){
    const zhangsan = await User.create({
        userName:'zhangsan2',
        password:'123',
        nickName:'张三'
    })})().catch(
    (err)=>{
        console.log(err)
    }
)