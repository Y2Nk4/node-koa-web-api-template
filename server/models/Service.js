import sequelize from '../config/db'

let Sequelize = require('sequelize'),
    {Model} = Sequelize

class Service extends Model {
}

Service.init({
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
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
    tableName: 'services',
    createdAt: false,
    updatedAt: false
})

export default Service
module.exports = Service
