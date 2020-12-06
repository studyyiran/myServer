const testMatched = (url, p) => url.indexOf(p) !== -1

const MyRouter = () => {
    let routerArr = []

    // 这实际上是注册
    const addIntoRouterArr = (METHOD, path, func) => {
        routerArr.push((ctx) => {
            if (METHOD === '404') {
                return func(ctx)
            } else {
                return METHOD === ctx.method && testMatched(ctx.url, path) && func(ctx)
            }
        })
    }

    const hoc = (func) => {
        return (ctx) => {
            // 已经匹配到
            ctx.haveMatched = true
            return func(ctx)
        }
    }

    return {
        routes: () => async (ctx) => {
            for (let i = 0; i < routerArr.length; i++) {
                const result = await routerArr[i](ctx)
                // 路由里面，如果匹配到了例如 get 等中间件。就中断掉
                if (ctx.haveMatched) {
                    break
                }
            }
        },
        get: (path, func) => addIntoRouterArr('GET', path, hoc(func)),
        post: (path, func) => addIntoRouterArr('POST', path, hoc(func)),
        add404: (func) => addIntoRouterArr('404', null, hoc((params) => {
            console.log('get 404')
            console.log(params)
            func(params)
        })),
    }
}

module.exports = MyRouter