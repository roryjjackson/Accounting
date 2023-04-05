
const http = require("http");

const sequelize = require("../utils/sequelize");

const app = require("./app");


const server = http.createServer(app);

const PORT = process.env.PORT || 5001;

const connectToDb = async ()=>{
  try {
    await sequelize.authenticate();
    return('Connection has been established successfully.');
  } catch (error) {
   return ('Unable to connect to the database:');
  }
}

server.listen(PORT, error => {

    if (error) {
        return console.log(error);
    }
    connectToDb().then(res=> console.log(res))
    console.log("🚀 Server started on port " + PORT);

});
