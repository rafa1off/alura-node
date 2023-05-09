import Erro404 from "../erros/Erro404.js"
import {livros} from "../models/index.js"

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
            const livro = await livros.findByIdAndUpdate(req.params.id, { $set: req.body })
            if (livro != null) {
                res.json({ 'message': 'Atualizado com sucesso' })
            } else {
                next(new Erro404('id'))
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
                next(new Erro404('id'))
            }
        } catch (err) {
            next(err)
        }
    }

    static deletarLivro = async (req, res, next) => {
        try {
            const livro = await livros.findByIdAndDelete(req.params.id)
            if (livro != null) {
                res.send({ 'message': 'Removido com sucesso' })
            } else {
                next(new Erro404('id'))
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