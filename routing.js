import http from "http"
import fetch from "node-fetch"

const server = http.createServer((req, res) => {
    const url = req.url
    const results = req.data
        
    let welcomePage = "<html><body><h1>Pawpaw Fruit</h1><br><p>A Native Virginia Fruit</p></body></html> <img src=https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Asimina_triloba3.jpg/220px-Asimina_triloba3.jpg>"

    let notFound = "Page Not Found"
    
    // let tableData = `<table border='1' id ='results'><thead><th>NAME</th><th>HEIGHT</th><th>BIRTH_YEAR</th><th>GENDER</th><th>URL</th></thead><tr><td>${results}</td><td>${results.height}</td><td>${results.birth_year}</td><td>${results.gender}</td><td>${results.url}</td></tr>`

    let tableData = `<table border='1' id ='results'><thead><th>NAME</th><th>HEIGHT</th><th>BIRTH_YEAR</th><th>GENDER</th><th>URL</th></thead><tr><td>${results}</td></tr>`


    if(url === '/'){
        res.write(welcomePage)
        res.end()
    }

    if (url === '/list') {
        res.write(tableData)
        res.end()
    }

    const apiCall = async() => {
        try {
            const res = await fetch('https://swapi.dev/api/people', {
                method: 'GET'
            });
            const data = await res.json();
            // return console.log(data.results);
            createData(data.results);
            // apiCall(data.results);   
        } catch (error) {
            return console.log(error);
        }
    };

    apiCall();

    
    function createData(data) {
        data.forEach(results => {
            tableData +=`<tr><td>${results.name}</td><td>${results.height}</td><td>${results.birth_year}</td><td>${results.gender}</td><td>${results.url}</td></tr>`
        });
        tableData+= `</table>`
    }

    if (url !='/list') {
        res.write(notFound)
        res.end()
    }

    
});


const PORT = 8080;

server.listen(PORT, console.log(`The application is listening on port ${PORT}`));

