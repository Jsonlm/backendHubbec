const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/hubbecbd"; // URL de la base de datos

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión:"));
db.once("open", () => {
  console.log("Conexión exitosa!");
});

module.exports = mongoose;