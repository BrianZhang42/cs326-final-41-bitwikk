import mongoose from "mongoose";
const { Schema } = mongoose;

export const UserDB = mongoose.model("User", new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }  // bcrypt hash+salt
}));

export const SessionDB = mongoose.model("Session", new Schema({
    ID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    expiry: { type: Date, required: true },
}));

let articleSchema =  Schema({
    ID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    contributors: { type: [String], required: true },
    images: { type: [String], required: true },
    commentIDs: { type: [String], required: true },
    category: { type: String, required: true }
})

// index articles by their title and content so that they
// can be text-searched
articleSchema.index({ title: 'text', content: 'text' });

export const ArticleDB = mongoose.model("Article", articleSchema);

export const CommentDB = mongoose.model("Comment", new Schema({
    ID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    articleID: { type: String, required: true },
    content: { type: String, required: true },
}));
