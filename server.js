const http = require("node:http")

const server = http.createServer((request, response) => {
    response.end()
})

server.listen(8080)