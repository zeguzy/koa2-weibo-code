/**
 * 博客业务处理
 * @author zegu
 */

const {
    createBlog
} = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')
const { createBlogFailInfo } = require('../model/ErrorList')
/**
 * 处理新建博客的业务逻辑
 * @param {object} param0 userId, content, image 
 */
async function create({ userId, content, image }) {
    //调用sevice
    try {
        const result = createBlog({ userId, content, image })
        return new SuccessModel(result)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}