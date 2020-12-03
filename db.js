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
    fs.writeFileSync(dbPath, JSON.stringify(obj), 'utf8');
    return obj
}

const model = (key, schema) => {
    const getDate = () => {
        return connectDb()
    }

    const db = getDate();
    if (!db || !db[key] && schema) {
        saveIntoDb({...db, [key]: schema})
    }

    return {
        findOne: (condition) => {
            const db = getDate()
            return {
                ...db[key],
                save: function () {
                    return saveIntoDb({...db, [key]: this})
                }
            }
        },

    }
}
module.exports = model
module.exports = {
    model
}