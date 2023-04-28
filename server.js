const http = require('http');
const port = 8000

const rotas = {
    '/': 'Hello World',
    '/livros': 'Bem vindo à biblioteca',
    '/autores': 'Lista de autores'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(rotas[req.url]);
});

server.listen(port, () => {
    console.log(`Server escutando em http://localhost:${port}
    Ctrl C para encerrar`)
})