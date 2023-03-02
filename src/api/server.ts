// If I used a token in Flask, can do:
// const token = '3b517524e32312e94e9b4c7eb0fe50907c6d1bd3c18df2dd'
const token = '73043cff0ac63c9ee820fe614b9a69563c9b8b5f107bd060'

// then will use that Token later in code

// below is an Object that writes rules for how to communicate with back-end database
// just like we did in Insomnia but without the tokens (on this project)
export const server_calls = {
    get: async () => {
        // const response = await fetch(`https://woozy-whiskey-shelf.glitch.me/api/shelf`,
        const response = await fetch(`https://phonebook-app-jbone.glitch.me/api/contacts`,

        {
            method: 'GET',
            // mode: "cors",
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer 73043cff0ac63c9ee820fe614b9a69563c9b8b5f107bd060', 
            }
            
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from the server')
        }

        return await response.json()
    },

    // data is coming from the register function that we imported, i think
    create: async (data: any = {}) => {
        const response = await fetch(`https://phonebook-app-jbone.glitch.me/api/contacts`,

        {
            method: 'POST',
            // mode: "cors",
            headers:{
                // This is coming from an application and we're passing in JSON:
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer 73043cff0ac63c9ee820fe614b9a69563c9b8b5f107bd060', 
            },
            // Put the data that's getting passed in from register into JSON string format and send it to the glitch link:
            body: JSON.stringify(data)
        });

        // read: "if bang response okay" i.e. "if we aren't getting an okay response"
        if (!response.ok) {
            // Error is an object:
            throw new Error('Failed to create new data on the server')
        }

        return await response.json()
    },

    update: async (id:string, data: any = {}) => {
        const response = await fetch(`https://phonebook-app-jbone.glitch.me/api/contacts/${id}`,

        {
            method: 'POST',
            // mode: "cors",
            headers:{
                // This is coming from an application and we're passing in JSON:
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer 73043cff0ac63c9ee820fe614b9a69563c9b8b5f107bd060',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Error is an object:
            throw new Error('Failed to update data on the server')
        }

        return await response.json()
    },

    delete: async (id:string) => {
        const response = await fetch(`https://phonebook-app-jbone.glitch.me/api/contacts/${id}`,

        {
            method: 'DELETE',
            // mode: "cors",
            headers:{
                // This is coming from an application and we're passing in JSON:
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer 73043cff0ac63c9ee820fe614b9a69563c9b8b5f107bd060',
            },
        });

        if (!response.ok) {
            // Error is an object:
            throw new Error('Failed to delete data on the server')
        }

        return;
    }

}