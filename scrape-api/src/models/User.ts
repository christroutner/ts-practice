import { DataTypes, Model, Sequelize } from 'sequelize'

export default class User extends Model {}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    { sequelize }
  )
}
