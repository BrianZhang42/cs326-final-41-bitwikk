export async function createArticle(formData) {
	try {
		let url = `/article/create?title=${formData.title}&contributor=${formData.contributor}&category=${formData.category}`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
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
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
		return null;
	}
}

export async function updateArticle(formData) {
	try {
		const response = await fetch(`/article/${formData.ID}/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
            body: JSON.stringify(formData),
		});
		location.reload();
		return response;
	}
	catch (err) {
		console.log(err);
		return null;
	}
}
  
export async function deleteArticle(formData) {
	try {
		const response = await fetch(`/article/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData)
		});
		const data = await response.json();
		return data
	}
	catch (err) {
		console.log(err);
		return null;
	}
}

export async function search(queryString) {
	try {
		const response = await fetch(`/article/search?query=${queryString}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		const data = await response.json();
		return data;
	}
	catch (err) {
		console.log(err);
		return null;
	}
}