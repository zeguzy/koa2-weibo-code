/**
 * @description sequelize 同步数据库
 */

const seq = require('./seq')
require('./model/index')

// //测试连接
// seq.authenticate().then(()=>{
//     console.log('oK')
// }).catch(()=>{
//     console.log('err')
// })

//执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit
}).catch(err => {
    console.log(err)
})
