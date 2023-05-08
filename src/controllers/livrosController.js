import livros from "../models/livro.js"

class LivrosController {
    static listarLivros = async (req, res) => {
        try {
            res.json(await livros.find().populate('autor', 'nome'))
        } catch (err) {
            res.status(500).send({'message': 'Erro interno no servidor'})
        }
    }

    static cadastrarLivro = async (req, res) => {
        try {
            res.status(201).json(await new livros(req.body).save())
        } catch (err) {
            res.status(500).send({'message': 'Erro interno no servidor'})
        }
    }

    static atualizarLivro = async (req, res) => {
        try {
            await livros.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.send({'message': 'Atualizado com sucesso'})
        } catch (err) {
            res.status(500).send({'message': 'Erro interno no servidor'})
        }
    }

    static listarLivro = async (req, res) => {
        try {
            res.json(await livros.findById(req.params.id).populate('autor', 'nome'))
        } catch (err) {
            res.status(500).send({'message': 'Erro interno no servidor'})
        }
    }

    static deletarLivro = async (req, res) => {
        try {
            await livros.findByIdAndDelete(req.params.id)
            res.send({message: 'Deletado com sucesso'})
        } catch (err) {
            res.status(500).send({'message': 'Erro interno no servidor'})
        }
    }

    static buscarLivrosporEditora = async (req, res) => {
        try {
            res.send(await livros.find({ 'editora': req.query.editora }))
        } catch (err) {
            res.status(500).send({'message': 'Erro interno no servidor'})
        }
    }
}

export default LivrosController