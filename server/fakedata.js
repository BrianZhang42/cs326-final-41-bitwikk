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
        id: 12,
        userId: 1,
        articleID: 1,
        content: "WOW! This article sucks!"
    },
    {
        id: 13,
        userId: 2,
        articleID: 2,
        content: "Thumbs down"
    },
    {
        id: 14,
        userId: 3,
        articleID: 1,
        content: "Person above me is a loser"
    }
]

export let articles = [
    {
        ID: "NES", title: "NES",
        content: "Pretty cool system",
        contributers: ["Vetruvius"],
        images: [], commentIDs: [12],
        category: "console"
    },
    {
        ID: "SNES", title: "SNES",
        content: "Pretty super system",
        contributers: ["bob"],
        images: [], commentIDs: [13, 14],
        category: "console"
    },
    {
        ID: "Dragon_Warrior", title: "Dragon Warrior",
        content: "One guy owns 718 copies of this game.",
        contributers: ["bob"],
        images: [], commentIDs: [14],
        category: "game"
    }
]

