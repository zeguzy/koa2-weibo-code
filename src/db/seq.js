/**
 * @description 创建sequelize实例
 */
const Sequelize = require('sequelize')
const {MYSQL_CONF} = require('../conf/db')
const { isTest } = require('../utils/env')
const {host,user,password,database} = MYSQL_CONF
const conf ={
    host:host,
    dialect:'mariadb'
}
if(isTest){
    conf.logging = ()=>{}
}
// conf.pool = {
//     max:5,//连接池中的最大的连接数量
//     min:0,//最小
//     idle:10000  //如果一个连接池 10 s内没有被使用则释放
// }
// console.log(host,user,password,database)
const seq = new  Sequelize(database,user,password,conf)
module.exports = seq


// //测试连接
// seq.authenticate().then(()=>{
//     console.log('oK')
// }).catch((err)=>{
//     console.log(err)
// })