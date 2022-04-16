import faker from "@faker-js/faker";
import fs from "fs";

let getNewArticleData = () =>  {
    return {
        title: faker.company.companyName(),
        content: [
            { title: faker.company.bsNoun(), body: faker.lorem.paragraph() },
            { title: faker.company.bsNoun(), body: faker.lorem.paragraphs() },
        ],
        contributor: faker.internet.userName(),
    }
} 

let articleData = [];

for(let i = 0; i < 50; ++i) {
    articleData.push(getNewArticleData());
}

fs.writeFile("article-data.json", JSON.stringify(articleData), function(err) {
    console.log(err);
});
