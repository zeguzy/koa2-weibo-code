/**
 * @返回格式信息
 */

class BaseModel{
    constructor({errno,data,msg}){
        this.errno =errno
        if(data){
            this.data=data
        }
        if(msg){
            this.msg=msg
        }
    }
}

class SuccessModel extends BaseModel{
    constructor({data}){
        super({
            errno:0,
            data:data
        })
    }
}

class ErrorModel extends BaseModel{
    constructor({errno,msg}){
        super({
            errno:errno,
            msg:msg
        })
    }
}
module.exports = {
    SuccessModel,
    ErrorModel
}