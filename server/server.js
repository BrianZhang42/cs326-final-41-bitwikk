import express from "express";
import cookieParser from "cookie-parser";
import { bwroute } from "./bwroute.js";
import { router as userRouter } from "./user.js";
import { router as articleRouter } from "./article.js";
import { createArticle, getCategory, searchArticles,
         getRandomArticle } from "./articleUtil.js";
import { projectRoot, asyncRoute, serve404 } from "./utils.js";
import { UserDB } from "./model.js";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// setup user secrets
dotenv.config();

// connect to MongoDB
await mongoose.connect(process.env.MONGO_URL, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Successfully connected to database!"));

// TODO: once this is hosted on Heroku, check the Origin header to prevent CSRF

// Heroku sets the PORT environment variable
// default to 3000 if the variable is empty
const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/article", articleRouter);

//  request body: { content: string }
app.post("/create", bwroute({
    requiresLogin: true,
    requiredQueryParameters: [],
    bodySchema: {
        "title": "string",
        "category": "string",
        "content": "string",
        "images": ["string"]
    },
    handler: async (req, res, username) => {
        // TODO: validation
        const { title, category, content, images } = req.body;
        const [success, result] = await createArticle(title, content, username, category);
        if (success) {
            // Status code 201: Created
            // Standard requires setting the Location header
            // to the location of the created resource
            res.set("Access-Control-Expose-Headers", "Location")
            res.location(`/article/${result.ID}`)
            res.status(201).end();
        } else {
            res.status(400).json(result);
        }
    }
}));

app.get("/category/:category", bwroute({
    requiresLogin: false,
    requiredQueryParameters: [],
    bodySchema: null,
    handler: async (req, res) => {
        const { category } = req.params;
        const [success, result] = getCategory(category);
        if (!success) {
            res.status(404);
            res.json({message: result});
            return;
        }
        res.json(result);
    }
}));

app.get("/search", bwroute({
    requiresLogin: false,
    requiredQueryParameters: ["query"],
    bodySchema: null,
    handler: async (request, response) => {
        response.sendFile(`${projectRoot}/client/search_result.html`);
    }
}));

app.get("/search_articles", bwroute({
    requiresLogin: false,
    requiredQueryParameters: ["query"],
    bodySchema: null,
    handler: async (request, response) => {
        const [success, result] = await searchArticles(request.query.query);
        if (!success) {
            response.status(404);
            response.json({message: result});
            return;
        }
        response.json(result);
    }
}));

app.get("/random", bwroute({
    requiresLogin: false,
    requiredQueryParameters: [],
    bodySchema: null,
    handler: async (request, response) => {
        let article = await getRandomArticle();
        response.redirect(307, `/article/${article.ID}`);
    }
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

app.listen(PORT, "", () => console.log(`app is listening on port ${PORT}!`));
