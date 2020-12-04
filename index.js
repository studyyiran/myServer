const MyKoa = require('./MyKoa')
const MyRouter = require('./MyRouter')
const {getPokemonStatusRouter, pokemonChangeSleepStatusRouter} = require('./router/pokemon')

const app = MyKoa()

// 静态资源不走路由
app.use((ctx) => {
    if (ctx.url.indexOf('/api/pokemon') === -1) {
        ctx.haveMatched = true
        ctx.body = 'not chuli such res'
    }
})

const router = MyRouter()

router.get('/pokemon/getPokemonStatus', getPokemonStatusRouter)
router.post('/pokemon/pokemonChangeSleepStatus', pokemonChangeSleepStatusRouter)
router.add404((ctx) => ctx.body = 404)

app.use(router.routes())

const port = 5000
app.listen(port, () => {
    console.log('start at port ' + port)
})