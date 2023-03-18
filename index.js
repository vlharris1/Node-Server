//import the http module
const http = require("http")

//create a server with HTTP
const server = http.createServer((req, res)=> {
    console.log("the server is created")
})

//initiate a port
const PORT = 4000;

//listen to the server
server.listen(PORT, ()=> console.log(`The server is running on port ${PORT}`))