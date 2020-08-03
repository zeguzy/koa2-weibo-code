/**
 * @description 封装数据类型
 */

const Sequelize  =require('sequelize')

module.exports = {
    STRING:Sequelize.STRING,
    INTEGER:Sequelize.INTEGER,
    DECIMAL:Sequelize.DECIMAL,
    TEXT:Sequelize.TEXT,
    BOOLEAN:Sequelize.BOOLEAN
}