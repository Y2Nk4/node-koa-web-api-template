require('./env')
module.exports = {
    // when env undefined, "development" is a default value
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_TYPE,
        // Use a different storage. Default: none
        "seederStorage": "json",
        // Use a different file name. Default: sequelize-data.json
        "seederStoragePath": "sequelizeData.json",
        // Use a different table name. Default: SequelizeData
        "seederStorageTableName": "sequelize_data"
    }
}
