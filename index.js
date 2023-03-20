//import the http module
import http from "http"

//import the fetch module after installing fetch in node
import fetch from "node-fetch"

//create a server with HTTP
const server = http.createServer((req, res)=> {
    const url = req.url

    let welcomePage = "<html><body><h1>Pawpaw Fruit</h1><br><p>A Native Virginia Fruit</p></body></html> <img src=https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Asimina_triloba3.jpg/220px-Asimina_triloba3.jpg>"

    let tableData = "<table border='1'><thead><caption><b>Pawpaw Fruit Eater Demographics</b></caption><br><th>NAME</th><th>HEIGHT</th><th>BIRTH_YEAR</th><th>GENDER</th><th>URL</th></thead>"

    let notFound = "<html><body><h1>Page Not Found</h1></body></html>"

//creating routes with endpoints
    if(url === '/') {
    res.write(welcomePage)
    res.end()
    }
    if(url !='/list' && url !='/') {
        res.write(notFound)
        res.end()
    }
//creating a route that fetches API data
    if(url === '/list') {
        fetch('https://swapi.dev/api/people')
        .then(res => res.json())
        .then(data => {
            // console.log(data.results)
            createData(data)
            res.write(tableData)
            res.end() 
        });        
    }
    function createData(data) {
        data.results.forEach(element => {
            tableData+= `<tr><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
        });
        tableData+=`</table>`
    }
});

//initiate a port
const PORT = 4000;

//listen to the server
server.listen(PORT, ()=> console.log(`The server is running on port ${PORT}`))


