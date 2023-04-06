const {  Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../utils/sequelize");
class Account extends Model {}

Account.init({
  // Model attributes are defined here
  account_id: {
    primaryKey :true,
    defaultValue :UUIDV4,
    type: DataTypes.UUID
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0
    // allowNull defaults to true
  }
}, {
  timestamps:true,
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Account' // We need to choose the model name
});

module.exports = Account;
