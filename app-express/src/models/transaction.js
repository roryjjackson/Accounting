const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../utils/sequelize");
class Transaction extends Model {}

Transaction.init(
  {
    // Model attributes are defined here
    transaction_id: {
      primaryKey: true,
      defaultValue: UUIDV4,
      type: DataTypes.UUID,
    },
    account_id: {
      type: DataTypes.UUID,
      references: "Accounts",
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Transaction", // We need to choose the model name
  }
);

module.exports = Transaction;
