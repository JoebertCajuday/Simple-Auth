import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/db_connect.js';

class UserInformation extends Model {
    declare id: number;
    declare first_name: string;
    declare middle_name: string;
    declare last_name: string;
    declare createdAt: string;
    declare updatedAt: string;
}

UserInformation.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    middle_name: {
        type: DataTypes.STRING, 
    },
    last_name: {
        type: DataTypes.STRING
    }
}, { sequelize, freezeTableName: true, tableName: 'user_information' });


UserInformation.belongsTo(sequelize.models.Users, {
    targetKey: 'id', 
    foreignKey: 'user_id' 
});


UserInformation.sync();
export default UserInformation;   
