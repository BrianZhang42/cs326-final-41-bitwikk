export let user = [
    {
        userId: 1,
        email: "cringe@gmail.com",
        username: "john",
        password: "hello"
    },
    {
        userId: 2,
        email: "bepis@gmail.com",
        username: "ben",
        password: "password123"
    },
    {
        userId: 3,
        email: "gamerboi96@gmail.com",
        username: "Vetruvius",
        password: "********"
    },
    {
        userId: 4,
        email: "yummy@gmail.com",
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
        ID:1, title:"NES", content:"Pretty cool system", contributer:2, images:[], commentIDs:[12], category:"console"
    },
    {
        ID:2, title:"SNES", content:"Pretty super system", contributer:3, images:[], commentIDs:[13, 14], category:"console"
    }, 
    {
        ID:3, title:"Dragon Warrior", content:"One guy owns 718 copies of this game.", contributer:3, images:[], commentIDs:[14], category:"game"
    }
]

