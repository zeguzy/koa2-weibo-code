/**
 * at 关系
 * @author zegu
 */

const { AtRelation } = require('../db/model/index')
async function createAtRelation(userId, blogId) {
    await AtRelation.create({
        userId: userId,
        blogId: blogId
    })
}

module.exports = {
    createAtRelation
}