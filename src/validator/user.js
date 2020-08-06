/**
 * @description 数据格式校验
 * @author zegu
 */

const _validate = require('./_validate')

//校验规则
const schema = {
    type:'object',
    properties:{
        userName:{
            type:'string',
            pattern:'^[a-zA-Z][a-zA-z0-9_]+$',
            maxLength:255,
            minLength:2
        },
        password:{
            type:'string',
            maxLength:255,
            minLength:3
        },
        newPassword:{
            type:'string',
            maxLength:255,
            mainLength:3
        },
        nickName:{
            type:'string',
            maxLength:255
        },
        picture:{
            type:'string',
            maxLength:255
        },
        gender:{
            type:'number',
            minimum:1,
            maximum:3
        }
    }
}


//执行校验

/**
 *
 * @param {object} schema json schema 规则
 * @param {object} data 要校验的数据
 */
function userValidate(data={}){
    return _validate(schema,data)
}

module.exports = userValidate