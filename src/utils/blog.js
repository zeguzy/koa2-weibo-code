/**
 * 微波数据相关的工具方法
 * @author zegu
 */

const fs = require('fs')
const path = require('path')

const ejs = require('ejs')
const fullPath = path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
const BLOG_LIST_TPL = fs.readFileSync(fullPath).toString()


/**
 * 微博列表
 * @param {*} blogList 
 * @param {*} canReply 
 */
async function getBlogListStr(blogList = [], canReply = false) {
    return await ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}