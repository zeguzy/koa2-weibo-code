/**
 * at 关系处理
 * @param {number} userId 
 */

const { getRelationCountByUser } = require('../service/userRelation')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')
const { PAGE_SIZE } = require('../conf/constant')
const { getBlogByNotRead, updateAtRelation } = require('../service/atRelation')
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
    try {
        const { atCount, blogList } = await getBlogByNotRead(userId, pageSize, pageIndex)
        blogList.forEach(async (element) => {
            await updateAtRelation(element.id)
        })
        return new SuccessModel({
            atCount,
            pageSize,

            pageIndex,
            count: atCount,
            blogList
        })
    } catch{
        console.error('change atRelation err')
        // return new ErrorModel({})
    }


}


module.exports = {
    getRelationCount,
    getBlogNotRead
}