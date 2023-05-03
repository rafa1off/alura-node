import livros from "../models/livro.js"

class LivroController {
    static listarLivros = (req, res) => {
        livros.find()
            .then(livros => res.json(livros))
    }

    static cadastrarLivro = (req, res) => {
        const livro = new livros(req.body)
        livro.save()
            .then(response => res.status(201).send(livro.toJSON()))
            .catch(err => res.send(err.message))
        }
}

export default LivroController