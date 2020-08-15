/**
 * @description 时间相关的工具函数
 * @author zegu
 * 
 */
const { format } = require('date-fns')


/**
 * 格式化时间，如9.05 23：02
 * @param {String} str  时间字符串
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}
module.exports = {
    timeFormat
}