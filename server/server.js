const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/");

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(cookieParser());
router.use("/api", require("./api/users"));





app.get('/', function(req, res) {res.redirect('/index')});

app.use(express.static("public", { index: false, extensions: ["html"] }));
app.listen(3000);