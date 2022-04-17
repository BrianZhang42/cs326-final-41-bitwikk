import express from "express";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./user.js";
import { router as articleRouter } from "./article.js";
import { createArticle, getCategory, searchArticles } from './articleUtil.js';
import { projectRoot, asyncRoute, serve404 } from './utils.js';

// const cookieParser = require("cookie-parser");

// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/");

// TODO: once this is hosted on Heroku, check the Origin header to prevent CSRF

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/article", articleRouter);

//  request body: { content: string }
app.post("/create", asyncRoute((req, res) => {
    if (!validateSession(request, response)) { return; }

    // TODO: validation
    const { title, content } = req.body;
    const [success, result] = createArticle(title, content, request.cookies.user,
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

app.get('/search', asyncRoute((request, response) => {
    if (!requireParams(request.query, ["query"], response)) {
        return;
    }
    const [success, result] = searchArticles(request.query.query);
    if (!success) {
        res.status(404);
        res.json({message: result});
        return;
    }
    res.json(result);
}));

// static serving
app.use((request, response, next) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
        next();
        return;
    }
    if (request.originalUrl == "/") {
        response.sendFile(`${projectRoot}/static/index.html`, {
            lastModified: false
        });
        return;
    }

    const serveDirect = () =>
        response.sendFile(`${projectRoot}/static${request.originalUrl}`, {
            lastModified: false
        }, err => {
            if (err !== undefined) {
                serve404(response);
            }
        });

    if (    request.originalUrl.endsWith(".js") ||
            request.originalUrl.endsWith(".css") ||
            request.originalUrl.endsWith(".png")) {
        serveDirect();
        return;
    }

    if (request.originalUrl.endsWith(".html")) {
        serve404(response);
        return;
    }

    // try adding html
    response.sendFile(`${projectRoot}/static${request.originalUrl}.html`, {
        lastModified: false
    }, err => {
        if (err !== undefined) {
            serveDirect();
        }
    });
});

app.listen(3000, "", () => console.log("app is listening on port 3000!"));
