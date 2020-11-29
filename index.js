const MyKoa = require('./MyKoa')
const MyRouter = require('./MyRouter')
const {getPokemonStatus, pokemonMorningWake} = require('./router/pokemon')

console.log(MyKoa)

const app = MyKoa()
const router = MyRouter()

router.get('/getPokemonStatus', getPokemonStatus)
router.post('/pokemonMorningWake', pokemonMorningWake)
router.add404((ctx) => ctx.body = 404)

app.use(router.routes())

const port = 5000
app.listen(port, () => {
    console.log('start at port ' + port)
})