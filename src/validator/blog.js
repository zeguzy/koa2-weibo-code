/**
 * blog校验
 * @author zegu
 */


const _validate = require('./_validate')

//校验规则
const schema = {
    type: 'object',
    properties: {
        picture: {
            type: 'string',
            maxLength: 255
        },
        content: {
            type: 'string',
            maxLength: 255
            // minLength: 
        }
    }
}

function blogValidate(data = {}) {
    return _validate(schema, data)
}

module.exports = blogValidate
