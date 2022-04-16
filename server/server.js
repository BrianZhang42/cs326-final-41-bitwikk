import express from "express";
import { router as userRouter } from "./user.js";
import { router as articleRouter } from "./article.js";
import { addComment, checkEdit, createArticle, editArticle, getCategory } from './articleUtil.js';
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
    const [checkSuccess, checkResult] = checkEdit(req.body);
    if (!checkSuccess) {
        res.status(400).json(checkResult);
        return;
    }
    const success = editArticle(...checkResult);
    if (success) {
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

app.post('/article/comment/:articleID/:user', (req, res) => {
    addComment(req.params.articleID, req.params.user, req.body);
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
