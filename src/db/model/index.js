/**
 * @description 数据模型入口文件
 * @author zegu
 */
const User = require('./user')
const Blog = require('./blog')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})


module.exports = { User, Blog }