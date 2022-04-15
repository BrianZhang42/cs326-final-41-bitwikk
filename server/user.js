import express from "express";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

export const router = express.Router();

// simulating database
const users = {};

// require("dotenv").config({ path: __dirname + "/../private.env" });

// const saltRounds = 10;
// const SECRET = process.env.SECRET;

router.post("/login", async (request, response) => {
    try {
        response.status(200);
    } catch (e) {
        response.status(500);
    }
    response.end();
});

// empty request body
router.get("/get", async (request, responses) => {
    const { userID } = req.params;
    const user = users[userID];
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User ${userID} not found` });
}});


// request body: { username: string, email: string, password: string }
router.post("/create", async (request, response) => {
    let user = req.body;
    const newID = (Object.keys(users).length)+1;
    user.ID = newID;
    users[user.ID] = user;
    // Status code 201: Created
    res.status(201).json(user);
});

// request body: { ID: number, username: string, email: string, password: string }
router.post("/edit", async (request, response) => {
    let user = req.body;
    users[user.ID] = user;
    res.status(200).json(user);
});


router.post("/delete", async (request, response) => {
    users[]
});

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
