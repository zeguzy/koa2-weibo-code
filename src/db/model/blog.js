/**
 * 用户博客数据模型
 * @author zegu
 */

const seq = require('../seq')
const { TEXT, STRING, INTEGER } = require('../type')

const Blog = seq.define('blog', {
    id: {
        type: INTEGER,
        primaryKey: true,
        'autoIncrement': true
    },
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    image: {
        type: STRING,
        allowNull: true,
        unique: false,
        comment: '图片'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '内容'
    }
})


module.exports = Blog