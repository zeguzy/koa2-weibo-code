/**
 * 博客业务处理
 * @author zegu
 */

const {
    createBlog
} = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')
const { createBlogFailInfo } = require('../model/ErrorList')
const xss = require('xss')

/**
 * 处理新建博客的业务逻辑
 * @param {object} param0 userId, content, image 
 */
async function create({ userId, content, image }) {
    //调用sevice
    try {
        const result = await createBlog({ userId, content: xss(content), image })
        console.log('result ....', result)
        return new SuccessModel(result)
    } catch (ex) {
        // console.error(ex.message, ex.stack)
        console.log(ex)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}