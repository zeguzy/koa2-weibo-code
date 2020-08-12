/**
 * @description 处理blog数据
 * @author zegu
 */
const { Blog } = require('../db/model/index')


/**
* 
* @param {object} param0 userId, content, image 
*/
async function createBlog({ userId, content, image }) {
    console.log('userId, content, image....', userId, content, image)
    const result = await Blog.create({
        userId, content, image
    })
    return result.dataValues
}


module.exports = {
    createBlog
}