const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log request on console with morgan
app.use(morgan("tiny"));

//mongodb connection//
connectDB();

//parse requests to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine which is EJS  embeded javascript we have initialized ejs so the files dont need an extension.ejs//
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"));

//load assets//
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//  catch the routes here
app.use("/", require("./server/routes/router"));

app.listen(3000, () => {
  console.log(`server is running on ${PORT}`);
});
