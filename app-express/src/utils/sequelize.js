const { Sequelize } = require("sequelize");
const path = require("path");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:', {
//   define: {
//     freezeTableName: true
//   }
// });

console.log(path.join(process.cwd(), "data.sqlite3"));

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(process.cwd(), "data.sqlite3"),
});

module.exports = sequelize;
