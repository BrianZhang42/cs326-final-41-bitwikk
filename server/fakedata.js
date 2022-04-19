import faker from "@faker-js/faker";

let getNewArticleData = () =>  {
    return {
        title: faker.company.companyName(),
        content: [
            { title: faker.company.bsNoun(), body: faker.lorem.paragraph() },
            { title: faker.company.bsNoun(), body: faker.lorem.paragraphs() },
        ],
        contributors: [
            faker.internet.userName(),
            faker.internet.userName(),
            faker.internet.userName(),
        ],
        categories: [
            faker.company.catchPhrase(),
            faker.company.catchPhrase(),
        ],
        images: [
            faker.image.avatar(),
            faker.image.avatar(),
            faker.image.avatar(),
            faker.image.avatar(),
        ],
        details: [
            faker.company.bsNoun(),
            faker.company.bsNoun(),
            faker.company.bsNoun(),
        ],
        relatedTopics: [
            faker.company.bsNoun(),
            faker.company.bsAdjective(),
            faker.company.bsNoun(),
            faker.company.bsAdjective(),
        ],
    }
} 

export let users = [
    {
        // email: "cringe@gmail.com",
        username: "john",
        password: "hello"
    },
    {
        // email: "bepis@gmail.com",
        username: "ben",
        password: "password123"
    },
    {
        // email: "gamerboi96@gmail.com",
        username: "Vetruvius",
        password: "********"
    },
    {
        // email: "yummy@gmail.com",
        username: "bob",
        password: "longpassword"
    },
]

export let comments = [
    {
        ID: 12,
        username: "ben",
        articleID: "SNES",
        content: "WOW! This article sucks!"
    },
    {
        ID: 13,
        username: "Vetruvius",
        articleID: "Dragon_Warrior",
        content: "Thumbs down"
    },
    {
        ID: 14,
        username: "bob",
        articleID: "SNES",
        content: "Person above me is a loser"
    }
]

let testArticle1 = getNewArticleData();
let testArticle2 = getNewArticleData();
testArticle1.ID = "test-article-1";
testArticle2.ID = "test-article-2";

export let articles = [
    {
        ID: "NES", title: "NES",
        content: [
            { body: "It was pretty great." },
            { title: "History", body: "It was made and sold." },
            { title: "Hardware", body: "It had some hardware."}],
        contributors: ["Vetruvius", "bob"],
        images: [], commentIDs: [12],
        category: "console"
    },
    {
        ID: "SNES", title: "SNES",
        content: [
            { body: "It was pretty super." },
            { title: "History", body: "It was made and sold." },
            { title: "Hardware", body: "It had some hardware."}],
        contributors: ["bob"],
        images: [], commentIDs: [13, 14],
        category: "console"
    },
    {
        ID: "Dragon_Warrior", title: "Dragon Warrior",
        content: [
            { body: "One guy owns 718 copies of this game." }],
        contributors: ["bob"],
        images: [], commentIDs: [14],
        category: "game"
    },
    testArticle1, testArticle2,
]
