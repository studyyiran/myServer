
const fs = require('fs');

function getIcons(req, res) {
    console.log('getIcons');
    try {
        run('touch iconConfig.txt')
        return fs.readFileSync('./iconConfig.txt', 'utf8');
    } catch (e) {
        console.error(e)
    }
}

function postIcons(req, res) {
    console.log('postIcons');
    const p = getJsonFromData(req).then((data) => {
        let target
        Object.keys(data).forEach((key) => {
            target = key
        })
        return fs.writeFileSync('./iconConfig.txt', JSON.stringify(target), 'utf8');
    })
    return p
}