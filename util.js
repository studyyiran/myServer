const execSync = require('child_process').execSync;
const querystring = require('querystring');

function getJsonFromData(req) {
    return new Promise((resolve, reject) => {
        let chunk = ''
        req.on('data', (data) => {
            chunk += data
        })
        req.on('end', () => {
            resolve(querystring.parse(chunk))
        })
    })
}

const run = (command) => {
    try {
        console.log('R: ' + command)
        const result = execSync(command);
        return result
    } catch (e) {
        throw new Error('Error is: ' + e.output.join('-'))
    }
}