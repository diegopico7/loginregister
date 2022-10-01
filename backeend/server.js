const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //login
const bodyParser = require("body-parser");
const EmployeeRoute = require("./routes/EmployeeRoute");
const AuthRoute = require("../backeend/routes/auth");

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Base de datos conectada");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});

app.use("/api/employee", EmployeeRoute);
app.use("/api", AuthRoute);
