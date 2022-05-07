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
        images: [
            "https://m.media-amazon.com/images/I/71zqr6fR58L._SL1500_.jpg",
            "https://i.pinimg.com/736x/9f/04/55/9f0455c6146a4406ae9ec655f8f0fced.jpg",
            "https://i.imgur.com/3IEsnFu.jpg",
            "https://www.nintendo.com/etc.clientlibs/noa/clientlibs/clientlib-ncom/resources/images/page/nes-classic/nes-classic-edition-front.png",
            "https://i.pinimg.com/originals/b8/fa/34/b8fa34e62ffdc2ec094748fd1d582084.jpg",
            "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/bo_15px_solid_white/f_auto/q_auto/dpr_auto/c_scale,w_600/v1/ncom/en_US/products/accessories/nintendo-switch/controllers/nintendo-entertainment-system-controllers.html/109045-nintendo-switch-online-nes-controller-right-1200x675?_a=AJADJWI0",

        ], 
        commentIDs: [12],
        categories: ["console"],
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
    },
    {
        ID: "SNES", title: "SNES",
        content: [
            { body: "It was pretty super." },
            { title: "History", body: "It was made and sold." },
            { title: "Hardware", body: "It had some hardware."}],
        contributors: ["bob"],
        images: [
            "https://m.media-amazon.com/images/I/71itkDwgyyL._SL1500_.jpg",
            "https://i.imgur.com/xrCp8eb.jpg",
            "https://static.wikia.nocookie.net/nintendo/images/7/7f/Super_Mario_World_for_Super_Nintendo%2C_%281991%29_TV_Commercial_1%2C_HD/revision/latest?cb=20190620184006&path-prefix=en",
            "https://www.mobygames.com/images/covers/l/431956-super-nintendo-entertainment-system-super-nes-classic-edition-dedicated-console-front-cover.jpg",
            "https://images.nintendolife.com/8dab5ebac991e/1280x720.jpg",
        ], 
        commentIDs: [13, 14],
        categories: ["console"],
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
        comments: [
            { username: "bob", content: "i just love the SNES :) it's so cool" },
            { username: "guy", content: "the SNES sucks >:( it's so bad" },
        ]
    },
    {
        ID: "Dragon_Warrior", title: "Dragon Warrior",
        content: [
            { body: "One guy owns 718 copies of this game." }],
        contributors: ["bob"],
        images: [], commentIDs: [14],
        categories: ["game"],
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
    },
    testArticle1, testArticle2,
]
