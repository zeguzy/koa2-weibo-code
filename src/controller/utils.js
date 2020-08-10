/**
 * @description 工具  保存文件
 * @author zegu
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResultModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorList')
const fse = require('fs-extra')
//文件最大体积 1M
const MIX_SIZE = 1 * 1024 * 1024
const dirName = path.join(__dirname, '..', '..', 'uploadFiles')


fse.pathExists(dirName).then(ex => {
    if (!ex) {
        fse.ensureDir(dirName)
    }
})


/**
 * 
 * @param {string} name 
 * @param {string} type 
 * @param {string} size 
 * @param {string} filePath 
 */
async function saveFile({ name, type, size, filePath }) {
    if (size > MIX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    const fileName = Date.now() + '.' + name
    const distFilePath = path.join(dirName, fileName)
    await fse.move(filePath, distFilePath)

    //返回信息
    return new SuccessModel({
        url: '/' + fileName
    })


}

module.exports = {
    saveFile,
}