require('../../env')
let Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_TYPE || 'mysql',
    timezone: process.env.DB_TIMEZONE
})

export default sequelize
