import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('user_management', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    pool: {
        max: 10,
    },
    logging: false
})

