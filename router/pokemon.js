
const {getPokemonStatus, pokemonChangeSleepStatus} =  require('../server')
const {getJsonFromData} =  require('../util')

const getPokemonStatusRouter = async (ctx, next) => {
    console.log('get getPokemonStatus')
    const result = await getPokemonStatus()
    ctx.body = JSON.stringify(result)
}

const pokemonChangeSleepStatusRouter = async (ctx, next) => {
    console.log('post pokemonChangeSleepStatus')
    const body = await getJsonFromData(ctx.request)
    const result = await pokemonChangeSleepStatus(body)
    ctx.body = JSON.stringify(result)
}

module.exports = {
    getPokemonStatusRouter,
    pokemonChangeSleepStatusRouter
}