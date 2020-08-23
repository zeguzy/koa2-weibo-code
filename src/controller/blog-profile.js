/**
 * 用户主页controller
 * @author zegu
 */

const { PAGE_SIZE } = require('../conf/constant')
const { getBlogListByUser } = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')


/**
 * 
 * @param {Object} param0  { userName, pageSize = 10, pageIndex = 0 }
 */
async function getUserBlogList({ userName, pageIndex = 0 }) {

    const pageSize = PAGE_SIZE
    //调用service
    const result = await getBlogListByUser({ userName, pageIndex, pageSize })

    const blogList = result.blogList
    // console.log(result)
    if (!result) {
        return new ErrorModel()
    }

    //返回数据
    return new SuccessModel({
        isEmpty: blogList.length == 0,
        blogList,
        pageSize,
        pageIndex,
        count: result.count
    })
}




module.exports = {
    getUserBlogList,
}