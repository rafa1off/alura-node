import livros from "../models/livro.js"

class LivrosController {
    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor', 'nome')
            .then(livros => res.json(livros))
    }

    static cadastrarLivro = (req, res) => {
        const livro = new livros(req.body)
        livro.save()
            .then(() => {
                res.status(201).send(livro.toJSON())
            })
            .catch(err => res.send({message: err.message}))
    }

    static atualizarLivro = (req, res) => {
        const id = req.params.id

        livros.findByIdAndUpdate(id, { $set: req.body })
            .then(() => {
                res.status(200).send({message: 'Atualizado com sucesso'})
            })
            .catch(err => res.status(500).send({message: err.message}))
    }

    static listarLivro = (req, res) => {
        const id = req.params.id

        livros.findById(id)
            .populate('autor', 'nome')
            .then(livro => res.json(livro))
            .catch(err => res.send({message: err.message}))
    }

    static deletarLivro = (req, res) => {
        const id = req.params.id

        livros.findByIdAndDelete(id)
            .then(() => {
                res.status(200).send({message: 'Deletado com sucesso'})
            })
            .catch(err => res.send({message: err.message}))
    }

    static buscarLivrosporEditora = (req, res) => {
        const editora = req.query.editora

        livros.find({ 'editora': editora })
            .then(livros => res.send(livros))
            .catch(err => res.send({'message': err.message}))
    }
}

export default LivrosController