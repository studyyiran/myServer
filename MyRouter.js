
const MyRouter = () => {
    let routerArr = []

    // 这实际上是注册
    const addIntoRouterArr = (METHOD, path, func) => {
        const testMatched = (url, p) => url.indexOf(p) !== -1
        routerArr.push((ctx) => {
            if (!METHOD) {
                return func(ctx)
            } else {
                return METHOD === ctx.method && testMatched(ctx.url, path) && func(ctx)
            }
        })
    }

    const hoc = (func) => {
        return (...parms) => {
            return func(...parms) || true
        }
    }

    return {
        routes: () => (ctx) => {
            routerArr.find((currentFunc) => currentFunc(ctx))
        },
        get: (path, func) => addIntoRouterArr('GET', path, hoc(func)),
        post: (path, func) => addIntoRouterArr('POST', path, hoc(func)),
        add404: (func) => addIntoRouterArr(null, null, hoc((...params) => {
            console.log('get 404')
            console.log(params)
            func(...params)
        })),
    }
}

module.exports = MyRouter