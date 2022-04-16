import faker from "@faker-js/faker";
import fs from "fs";

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

let articleData = [];

for(let i = 0; i < 50; ++i) {
    articleData.push(getNewArticleData());
}

fs.writeFile("article-data.json", JSON.stringify(articleData), function(err) {
    console.log(err);
});
