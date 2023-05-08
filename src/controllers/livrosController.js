import livros from "../models/livro.js"

class LivrosController {
    static listarLivros = async (req, res) => {
        try {
            res.json(await livros.find().populate('autor', 'nome'))
        } catch (err) {
            res.send({'message': err.message})
        }
    }

    static cadastrarLivro = async (req, res) => {
        try {
            res.status(201).json(await new livros(req.body).save())
        } catch (err) {
            res.send({'message': err.message})
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            await livros.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).send({'message': 'Atualizado com sucesso'})
        } catch (err) {
            res.status(500).send({'message': err.message})
        }
    }

    static listarLivro = async (req, res) => {
        try {
            res.json(await livros.findById(req.params.id).populate('autor', 'nome'))
        } catch (err) {
            res.send({'message': err.message})
        }
    }

    static deletarLivro = async (req, res) => {
        try {
            await livros.findByIdAndDelete(req.params.id)
            res.status(200).send({message: 'Deletado com sucesso'})
        } catch (err) {
            res.send({'message': err.message})
        }
    }

    static buscarLivrosporEditora = async (req, res) => {
        try {
            res.send(await livros.find({ 'editora': req.query.editora }))
        } catch (err) {
            res.send({'message': err.message})
        }
    }
}

export default LivrosController