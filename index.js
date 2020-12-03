const MyKoa = require('./MyKoa')
const MyRouter = require('./MyRouter')
const {getPokemonStatusRouter, pokemonChangeSleepStatusRouter} = require('./router/pokemon')

const app = MyKoa()
const router = MyRouter()

router.get('/getPokemonStatus', getPokemonStatusRouter)
router.post('/pokemonChangeSleepStatus', pokemonChangeSleepStatusRouter)
router.add404((ctx) => ctx.body = 404)

app.use(router.routes())

const port = 5000
app.listen(port, () => {
    console.log('start at port ' + port)
})