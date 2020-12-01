import sequelize from '../config/db'

let Sequelize = require('sequelize')
let { Model } = Sequelize

class GenTableViaScript extends Model {

}

GenTableViaScript.init({
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    // Model Properties Here

    // 基本时间信息
    created_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
    }
}, {
    sequelize,
    freezeTableName: true,
    tableName: 'gen_table_via_scripts',
    createdAt: false,
    updatedAt: false
})

export default GenTableViaScript
module.exports = GenTableViaScript
