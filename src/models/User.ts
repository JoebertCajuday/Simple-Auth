import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../configs/db_connect.js';

class Users extends Model {
    declare id: number;
    declare user_name: string;
    declare email: string;
    declare password: string;
    declare status: number;
    declare createdAt: string;
    declare updatedAt: string;
}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

}, { sequelize, freezeTableName: true, tableName: 'users'});



Users.sync();
export default Users