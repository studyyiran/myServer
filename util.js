const execSync = require('child_process').execSync;
const querystring = require('querystring');

function getJsonFromData(req) {
    return new Promise((resolve, reject) => {
        let chunk = ''
        req.on('data', (data) => {
            chunk += data
        })
        req.on('end', () => {
            resolve(chunk === "{}" ? {} : JSON.parse(chunk))
        })
    })
}

const runCmd = (command) => {
    try {
        console.log('R: ' + command)
        const result = execSync(command);
        return result
    } catch (e) {
        throw new Error('Error is: ' + e.output.join('-'))
    }
}

const filterObj = (data, filterString) => {
    const newObj = {}
    Object.keys(data).forEach((key) => {
        if (key !== filterString) {
            newObj[key] = data[key]
        }
    })
    return newObj
}
const myMoment = {
    isSameDay: (t) => new Date(t).toDateString() === new Date().toDateString()
}

module.exports = {
    getJsonFromData,
    runCmd,
    filterObj,
    myMoment
}