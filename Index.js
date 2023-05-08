const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./core/controllers/users.controller");
const cors = require('cors')

const app = express();

// parse application/x-www-form-urlencoded
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


// parse application/json
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});