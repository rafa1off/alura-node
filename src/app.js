import express from 'express'

const app = express()
app.use(express.json())

const livros = [
    { id: 1, 'titulo': 'O Senhor dos anéis' },
    { id: 2, 'titulo': 'O Hobbit' },
]

app.get('/', (req, res) => {
    res.status(200).send('Node')
})

app.get('/livros', (req, res) => {
    res.status(200).json(livros)
})

app.post('/livros', (req, res) => {
    livros.push(req.body)
    res.status(201).send('Livro adicionado')
})

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id)
}

app.put('/livros/:id', (req, res) => {
    let i = buscaLivro(req.params.id)
    livros[i].titulo = req.body.titulo
    res.json(livros)
})

app.get('/livros/:id', (req, res) => {
    let i = buscaLivro(req.params.id)
    res.json(livros[i])
})

app.delete('/livros/:id', (req, res) => {
    let i = buscaLivro(req.params.id)
    livros.splice(i, 1)
    res.json(livros)
})

export default app