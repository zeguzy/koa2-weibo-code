/**
 * 用户广场页业务逻辑
 * @author zegu
 */

const { getBlogListByUser } = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')
const { PAGE_SIZE } = require('../conf/constant')
const { getUserSquareCache } = require('../cache/blog')


async function getUserSquareList({ pageIndex }) {

    const pageSize = PAGE_SIZE
    //调用service
    const result = await getUserSquareCache({ pageIndex, pageSize })

    if (!result) return new ErrorModel()

    return new SuccessModel({
        isEmpty: result.blogList.length == 0 ? true : false,
        blogList: result.blogList,
        pageSize: PAGE_SIZE,
        count: result.count
    })
}

module.exports = {
    getUserSquareList
}