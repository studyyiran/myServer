const fs = require('fs');

const { filterObj, runCmd } = require('./util')

const dbPath = './dbStore.txt'

function connectDb() {
    try {
        runCmd('touch ' + dbPath)
        const data = fs.readFileSync(dbPath, 'utf8');
        const json = JSON.parse(data)
        return json
    } catch (e) {
        console.error(e)
    }
}

function saveIntoDb(obj) {
    const currentDb = connectDb()
    fs.writeFileSync(dbPath, JSON.stringify({...currentDb, ...obj}), 'utf8');
}

const model = (key, schema) => {
    const getDate = () => {
        return connectDb()
    }

    const db = getDate();
    if (!db || !db[key] && schema) {
        saveIntoDb({[key]: schema})
    }

    return {
        findOne: (condition) => {
            const db = getDate()
            return {
                ...db[key],
                save: function () {
                    const result = {[key]: this}
                    saveIntoDb(result)
                    return this
                }
            }
        },

    }
}
module.exports = model
module.exports = {
    model
}