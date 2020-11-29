const getPokemonStatus = (ctx, next) => {
    console.log('get getPokemonStatus')
    ctx.body = 'getPokemonStatus'
}

const pokemonMorningWake = (ctx, next) => {
    console.log('post getPokemonStatus')
    ctx.body = 'pokemonMorningWake'
}

module.exports = {
    getPokemonStatus,
    pokemonMorningWake
}