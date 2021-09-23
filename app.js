const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const db = require("./models");
db.sequelize.sync();

const user_route = require("./router/user_route");
app.use(user_route);

app.listen(port, () => {
  console.log(`Server is listening on PORT No. ${port}`);
});
