/**
 * @description json schema 验证中间件
 * @author zegu
 */

const  {ErrorModel} = require('../model/ResultModel')
const {jsonSchemaFiledInfo}=require('../model/ErrorList')

/**
 *
 * @param {function} validateFn  验证函数
 */
function genValidator(validateFn){
    async function validator(ctx,next){
        const data = ctx.request.body
        const error = validateFn(data)
        if(error){
            console.log(' validator err...............')
            ctx.body = new ErrorModel(jsonSchemaFiledInfo)
            return
        }
        await next()

    }
    return validator
}
module.exports= genValidator