/**
 * 用户关系模型
 * @author zegu
 */

const seq = require('../seq')
const { INTEGER } = require('../type')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注的用户id'
    }
})
module.exports = UserRelation