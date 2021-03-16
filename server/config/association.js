/**
 *
 * File: association.js
 * Usage: 用于绑定关联的 Models
 * Author: Y2Nk4
 *
 * */

let Service = require('../models/Service')
let User = require('../models/User')

User.hasMany(Service, {
    as: 'Services',
    foreignKey: 'user_id'
})
Service.belongsTo(User, {
    as: 'Services',
    foreignKey: 'user_id'
})
