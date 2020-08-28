/**
 * 博客业务处理
 * @author zegu
 */

const { createBlog, getFollwerBlogById } = require('../service/blog')
const { SuccessModel, ErrorModel } = require('../model/ResultModel')
const { createBlogFailInfo } = require('../model/ErrorList')
const xss = require('xss')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../service/user')
const { createAtRelation } = require('../service/atRelation')
/**
 * 处理新建博客的业务逻辑
 * @param {object} param0 userId, content, image 
 */
async function create({ userId, content, image }) {
    const userNameList = []
    content = content.replace(
        REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
            userNameList.push(userName)
            return matchStr
        }
    )

    const atUserList = await Promise.all(
        userNameList.map(userName => getUserInfo(userName))
    )




    //调用sevice
    try {
        const result = await createBlog({ userId, content: content, image })

        await Promise.all(atUserList.map(userInfo => {
            console.log(userInfo.userId)
            createAtRelation(userInfo.userId, result.id)
        }))
        return new SuccessModel(result)
    } catch (ex) {
        // console.error(ex.message, ex.stack)
        console.log(ex)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 获取关注人微波
 * @param {int} userId 用户id
 * @param {int} pageIndex 页数
 */
async function getFollwerBlog(userId, pageIndex = 5) {
    //service
    const result = await getFollwerBlogById(userId, pageIndex, PAGE_SIZE)

    const { count, blogList } = result
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageIndex,
        count,
        pageSize: PAGE_SIZE
    })
}


module.exports = {
    create,
    getFollwerBlog
}