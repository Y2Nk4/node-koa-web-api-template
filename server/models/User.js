import sequelize from '../config/db'

let Sequelize = require('sequelize')
let {Model} = Sequelize

class User extends Model {
    static async getUserById (id) {
        const userInfo = await User.findOne({
            where: {
                id
            }
        })

        return userInfo // 返回数据
    }
    static async getUserByName (username) {
        const userInfo = await User.findOne({
            where: {
                username
            }
        })
        return userInfo
    }
}

User.init({
    id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    balance: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_banned: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    tableName: 'users',
    createdAt: false,
    updatedAt: false
})

export default User
module.exports = User
