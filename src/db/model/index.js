/**
 * @description 数据模型入口文件
 * @author zegu
 */
const User = require('./user')
const Blog = require('./blog')
const UserRelation = require('./userRelation')
const AtRelation = require('./atRelation')
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})

Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
    foreignKey: 'blogId'
})

module.exports = { User, Blog, UserRelation, AtRelation }