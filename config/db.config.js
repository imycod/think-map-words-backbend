
module.exports = {
    development: {
        databases: {
            rest: {
                database: 'think_map_word',
                username: 'root',
                password: 'mWXS19971222',
                host: '127.0.0.1',
                port: 3306,
                dialect: 'mysql',
                pool:{
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        }
    },
}