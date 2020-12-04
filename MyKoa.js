const http = require('http');

const MyKoa = () => {
    let middlewareArr = []
    const httpServer = http.createServer(function (request, response) {
        console.log(request.url)
        // 1 匹配路由
        // 2 匹配出结果了
        // 3 决定是 404 吗？
        // 4 –返回请求
        const ctx = {
            request: request,
            response: response,
            code: 200,
            method: request.method,
            url: request.url,
            body: request.body,
            haveMatched: false
        }
        // 依次执行。。。并且。。先绑定，先执行，先吐出来，给下一个。
        const run = async () => {
            let p1 = Promise.resolve()
            for (let i = 0; i < middlewareArr.length; i++) {
                if (!ctx.haveMatched) {
                    console.log('start')
                    const p = await middlewareArr[i](ctx)
                    console.log('end')
                } else {
                    break
                }
            }
        }

        // const run = new Promise((resolve, reject) => {
        //     let p1
        //     for (let i = 0; i < middlewareArr.length; i++) {
        //         if (!ctx.haveMatched) {
        //             p1 = p1 ? p1.then(middlewareArr[i](ctx)) : middlewareArr[i](ctx)
        //         } else {
        //             break
        //         }
        //     }
            
        //     return p1
        // })

        run().then((res) => {
            
            const result = { status: 'success', code: ctx.code, data: ctx.body }
            response.end(JSON.stringify(result));
        })
        
    });
    // 添加中间件
    httpServer.use = (func) => {
        middlewareArr.push(func)
    }
    
    httpServer.on('error', function (e) {
        // Handle your error here
        console.log(e);
      });
    return httpServer
}

module.exports = MyKoa