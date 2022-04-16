import express from "express";
import { router as userRouter } from "./user.js";
import { router as articleRouter } from "./article.js";
import { createArticle, getCategory } from './articleUtil.js';
import { asyncRoute } from './utils.js';

// const bodyParser = require("body-parser");
// const User = require("./models/user");
// const cookieParser = require("cookie-parser");
const comments = {};

// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/");

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/article", articleRouter);

// router.use(cookieParser());

//  request body: { content: string }
app.post("/create/:title/:contributor/:category", asyncRoute((req, res) => {
    const {title, contributor, category} = req.params;
    const { content } = req.body;
    const [success, result] = createArticle(title, content, contributor,
                                            category);
    if (success) {
        // Status code 201: Created
        // Standard requires setting the Location header
        // to the location of the created resource
        res.location(`/article/${result.ID}`)
        res.status(201).end();
    } else {
        res.status(400).json(result);
    }
}));

// request body: { articleID: string, title: string, body: string }
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

app.get("/category/:category", asyncRoute((req, res) => {
    const { category } = req.params;
    const [success, result] = getCategory(category);
    if (!success) {
        res.status(404);
        res.json({message: result});
        return;
    }
    res.json(result);
}));

app.get('/article/search/:query', asyncRoute((req, res) => {
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
      res.status(404).json({message: `No entries found in the ${name} category`});
    }
}));

app.use(express.static("static"));

app.listen(3000, "", () => console.log("app is listening on port 3000!"));
