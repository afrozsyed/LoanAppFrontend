const FetchClient = {
    get: async (url) => {
        const response = await fetch(url);
        return await response.json();
    },

    post: async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}

export default FetchClient;