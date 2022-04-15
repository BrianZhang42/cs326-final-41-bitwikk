import express from 'express';
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jwt-simple");
const User = require("../models/user");

const router = express.Router();

// require("dotenv").config({ path: __dirname + "/../private.env" });

const saltRounds = 10;
const SECRET = process.env.SECRET;

router.post("/user/login", async (request, response) => {});

router.get("/user/get", async (request, responses) => {});
router.post("/user/create", async (request, response) => {});
router.post("/user/edit", async (request, response) => {});
router.post("/user/delete", async (request, response) => {});

// router.post("/user", (req, res) => {
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//         bcrypt.hash(req.body.password, salt, null, (err, hash) => {
//             let newUser = new User({
//                 username: req.body.username,
//                 password: hash,
//                 email: req.body.email,
//             });

//             newUser.save((err) => {
//                 if (err) {
//                     res.status(500).json({ error: "Error creating user" });
//                 } else {
//                     res.redirect("/login"); // New user created
//                 }
//             });
//         });
//     });
// });

// router.post("/auth", (req, res) => {
//     User.findOne({ username: req.body.username }, (err, user) => {
//         if (err) throw err;

//         if (!user) {
//             res.status(401).json({ error: "Invalid username" });
//         } else {
//             bcrypt.compare(req.body.password, user.password, (err, valid) => {
//                 if (err) {
//                     res.status(400).json({ error: "Failed to authenticate." });
//                 } else if (valid) {
//                     const token = jwt.encode({ username: user.username }, SECRET);
//                     res.clearCookie("x-auth").cookie("x-auth", token, { expires: new Date(Date.now() + 90000), httpOnly: true}).redirect("/index");
//                 } else {
//                     res.status(401).json({ error: "Wrong password" });
//                 }
//             });
//         }
//     });
// });


export router;
