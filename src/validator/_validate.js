/**
 * @description 数据校验
 * @author zegu
 */

const Ajv = require('ajv')

const ajv= new Ajv({
    //allErrors:true   //输出所有的错误，比较慢
})

/*
  *json schema 校验
  * @param {Object} schema json schema 规则
  * @param {Object} data  data 待校验的数据
  */
function _validate(schema,data={}){
    const valid = ajv.validate(schema,data)
    if(!valid){
        console.log(ajv.errors[0])
        return ajv.errors[0]
    }
}
module.exports = _validate