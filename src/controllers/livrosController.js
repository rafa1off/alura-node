import livros from "../models/livro.js"

export default class LivrosController {
    static listarLivros = async (req, res, next) => {
        try {
            res.json(await livros.find().populate('autor', 'nome'))
        } catch (err) {
            next(err)
        }
    }

    static cadastrarLivro = async (req, res, next) => {
        try {
            res.status(201).json(await new livros(req.body).save())
        } catch (err) {
            next(err)
        }
    }

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = await livros.findById(req.params.id)
            if (id != null) {
                await livros.findByIdAndUpdate(id, { $set: req.body })
                res.send({ 'message': 'Atualizado com sucesso' })
            } else {
                res.status(404).send({ 'message': 'Identificador não encontrado' })
            }
        } catch (err) {
            next(err)
        }
    }

    static listarLivro = async (req, res, next) => {
        try {
            const livro = await livros.findById(req.params.id)
            if (livro != null) {
                res.json(livro)
            } else {
                res.status(404).send({ 'message': 'Identificador não encontrado' })
            }
        } catch (err) {
            next(err)
        }
    }

    static deletarLivro = async (req, res, next) => {
        try {
            const id = await livros.findById(req.params.id)
            if (id != null) {
                await livros.findByIdAndDelete(id)
                res.send({ 'message': 'Removido com sucesso' })
            } else {
                res.status(404).send({ 'message': 'Identificador não encontrado' })
            }
        } catch (err) {
            next(err)
        }
    }

    static buscarLivrosporEditora = async (req, res, next) => {
        try {
            res.json(await livros.find({ 'editora': req.query.editora }))
        } catch (err) {
            next(err)
        }
    }
}