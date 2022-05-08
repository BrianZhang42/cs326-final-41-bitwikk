export async function createArticle(formData) {
    try {
        let url = `/article/create?title=${formData.title}&contributor=${formData.contributor}&category=${formData.category}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export async function readArticle(articleID) {
    try {
        const response = await fetch(`/article/${articleID}/get`, {
            method: "GET",
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function updateArticle(articleID, formData) {
    try {
        const response = await fetch(`/article/${articleID}/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        return response;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function addComment(articleID, formData) {
    try {
        const response = await fetch(`/article/${articleID}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        return response;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export async function getComment(articleID, commentID) {
    try {
        const response = await fetch(`/article/${articleID}/comment/${commentID}`, {
            method: "GET",
        });
        if (!response.ok) {
            throw `Got ${response.status} response for comment ${commentID}: ${await response.text()}`;
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

// export async function deleteArticle(formData) {
//     try {
//         const response = await fetch(`/article/delete`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(formData)
//         });
//         const data = await response.json();
//         return data
//     }
//     catch (err) {
//         console.log(err);
//         return null;
//     }
// }

export async function search(queryString) {
    try {
        const response = await fetch(`/search_articles?query=${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
