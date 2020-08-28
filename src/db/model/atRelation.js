/**
 * 用户at关系模型
 * @author zegu
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../type')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: 'blogId'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否已读'
    }

})
module.exports = AtRelation