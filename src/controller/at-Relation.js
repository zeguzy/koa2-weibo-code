/**
 * at 关系处理
 * @param {number} userId 
 */

const { getRelationCountByUser } = require('../service/userRelation')
const { SuccessModel } = require('../model/ResultModel')
const { PAGE_SIZE } = require('../conf/constant')
const { getBlogByNotRead, changeStatusByBlogId } = require('../service/atRelation')
/**
 * 用户唯读消息数量
 * @param {int} userId 
 */
async function getRelationCount(userId) {
    //service
    const result = await getRelationCountByUser(userId)
    return new SuccessModel(result)
}


async function getBlogNotRead(userId, pageIndex = 0) {
    const pageSize = PAGE_SIZE
    //service 
    const { atCount, blogList } = await getBlogByNotRead(userId, pageSize, pageIndex)
    blogList.forEach(async (element) => {
        try {
            await changeStatusByBlogId(element.id)
        } catch{
            console.error('change atRelation err')
        }
    })
    return new SuccessModel({
        atCount,
        blogData: {
            pageSize,
            pageIndex,
            count: atCount,
            blogList
        }
    })
}


module.exports = {
    getRelationCount,
    getBlogNotRead
}