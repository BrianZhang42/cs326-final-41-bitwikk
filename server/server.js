import * as http from 'http';
import * as url from 'url';
import express from 'express';
import { router as userRouter } from "./user.js";
import { router as articleRouter } from "./article.js";

// const bodyParser = require("body-parser");
// const User = require("./models/user");
// const cookieParser = require("cookie-parser");
const articles = {};
const comments = {};

// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/");

const app = express();
app.use(express.json());

app.use("/user", userRouter);
// app.use("/article", articleRouter);

// router.use(bodyParser.urlencoded({
//     extended: false
// }));
// router.use(cookieParser());

//  request body: { content: string }
app.post('article/create/:title/:contributor/:category', (req, res) => {
    const article = req.params;
    if(article.title == undefined || article.contributor == undefined ||
        article.category == undefined) {
        res.status(400).json({message: `title, contributor, and category fields must be defined`})
    }
    if ((article.category != "game" && article.category != "console")) {
        res.status(418).json({message: `category field must be either 'game' or 'console'.`})
    }
    let { content } = req.body;
    article.content = content;
    const newID = (Object.keys(articles).length)+1;
    article.ID = newID;
    let images = {};
    let commentIDs = {};
    article.images = images;
    article.commentIDs = commentIDs;
    articles[article.ID] = article;
    // Status code 201: Created
    res.status(201).json(article);
  });

app.get('/article/:articleID', (req, res) => {
    const { articleID } = req.params;
    const article = articles[articleID];
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: `Article ${name} not found` });
    }
});

//   request body: { articleID: number, title: string, body: string }
app.post('/article/edit', (req, res) => {
    const formData = req.body;
    if(formData.articleID == undefined || formData.title == undefined ||
            formData.body == undefined) {
        res.status(400).json({message: `articleID, title, and body fields must be defined`})
    }
    const article = articles[formData.articleID];
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: `Article ${formData.articleID} not found` });
    }
});

app.post('/article/comment/:articleID/:userID', (req, res) => {
    const comment = req.params;
    let { content } = req.body;
    const newID = (Object.keys(comments).length)+1;
    comment.ID = newID;
    comments.content = content;
    comments[comment.ID] = comment;
});

app.get('/category/:category', (req, res) => {
    const { category } = req.params;
    let articlez = {};
    for (const i in articles) {
        if (i.category == category) { //can be "console" or "game"
            articlez[i] = {"title": i.title};
        }
    }
    if (articlez) {
      res.json(articlez);
    } else {
      res.status(404).json({ message: `No entries found in the ${name} category` });
    }
});

app.get('/article/search/:query', (req, res) => {
    const { query } = req.params;
    let articlez = {};
    for (const i in articles) {
        if (i.title.includes(query)) {
            articlez[i] = {"title": i.title};
        }
    }
    if (articlez) {
      res.json(articlez);
    } else {
      res.status(404).json({ message: `No entries found in the ${name} category` });
    }
});

app.use(express.static("static", { extensions: ["html"] }));
app.listen(3000, "", () => console.log("app is listening on port 3000!"));
