let path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
require('dotenv').config({path, silent: true})
