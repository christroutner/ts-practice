import { DataTypes, Model } from 'sequelize';
export default class User extends Model {
}
export function initUser(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, { sequelize });
}
