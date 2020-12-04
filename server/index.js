const { model } = require('../db')
const { myMoment } = require('../util')

console.log('test')
console.log(model)

const pokemonSchema = {
    name: '',
    sleepRecord: [
        // {
        //     date: '',
        //     wakeupTime: '',
        //     sleepTime: '',
        // }
    ]
}

const PokemonModel = model('pokemon', pokemonSchema);
console.log(PokemonModel)

const getPokemonStatus = async () => {
    const pokemonInfo = await checkAndInsertLast(PokemonModel.findOne({}))
    return pokemonInfo
}

const checkAndInsertLast = async (pokemonInfo) => {
    if (pokemonInfo && pokemonInfo.sleepRecord) {
        let lastRecord = pokemonInfo.sleepRecord[pokemonInfo.sleepRecord.length - 1]

        if (lastRecord && lastRecord.date && myMoment.isSameDay(lastRecord.date)) {

        } else {
            // insert and init
            lastRecord = {
                date: Date.now(),
            }
            pokemonInfo.sleepRecord.push(lastRecord)
        }
        return pokemonInfo.save()
    } else {
        console.error('pokemonChangeSleepStatus')
        return
    }
}

const pokemonChangeSleepStatus = async (info) => {
    const { sleepTime, wakeupTime } = info
    const pokemonInfo = await checkAndInsertLast(PokemonModel.findOne({}))
    if (pokemonInfo && pokemonInfo.sleepRecord) {
        let lastRecord = pokemonInfo.sleepRecord[pokemonInfo.sleepRecord.length - 1]
        // 当日已有,就弱更新
        lastRecord.sleepTime = lastRecord.sleepRecord || (sleepTime ? Date.now() : '')
        lastRecord.wakeupTime = lastRecord.wakeupTime || (wakeupTime ? Date.now() : '')
        return pokemonInfo.save()
    } else {
        console.error('pokemonChangeSleepStatus')
        return
    }
}

module.exports = {
    getPokemonStatus, pokemonChangeSleepStatus
}
