const http = require('http');

const MyKoa = () => {
    let arr = []
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
            body: request.body
        }
        // 依次执行。。。并且。。先绑定，先执行，先吐出来，给下一个。
        const run = async () => {
            let current
            for (let i = 0; i < arr.length; i++) {
                current = arr[i]
                current(ctx)
            }
        }
        run()
        const result = { status: 'success', code: ctx.code, data: ctx.body }
        response.end(JSON.stringify(result));
    });
    httpServer.use = (func) => {
        arr.push(func)
    }
    console.log('run')
    httpServer.on('error', function (e) {
        // Handle your error here
        console.log(e);
      });
    return httpServer
}

module.exports = MyKoa