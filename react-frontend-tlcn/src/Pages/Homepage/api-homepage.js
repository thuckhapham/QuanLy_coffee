const createTable = async (credentials, table) => {
    try {
        console.log(credentials.type + ' ' + credentials.token)
        let response = await fetch('http://localhost:3000/api/table/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': credentials.type + ' ' + credentials.token
            },
            body: JSON.stringify(table)
        })

        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}

const getTables = async (page = 1, pagesize = 10, signal) => {
    try {

        let response = await fetch('http://localhost:5000/api/table/' +
            '?page=' + page + '&pagesize=' + pagesize, {
            method: 'GET',
            signal: signal
        })
        console.log(response)
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}
export {
    createTable,
    getTables
}