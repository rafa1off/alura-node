import Erro404 from "../erros/Erro404.js"
import {autores} from "../models/index.js"

export default class AutoresController {
    static listarAutores = async (req, res, next) => {
        try {
            res.json(await autores.find())
        } catch (err) {
            next(err)
        }
    }

    static cadastrarAutor = async (req, res, next) => {
        try {
            res.status(201).json(await new autores(req.body).save())
        } catch (err) {
            next(err)
        }
    }

    static atualizarAutor = async (req, res, next) => {
        try {
            const autor = await autores.findByIdAndUpdate(req.params.id, { $set: req.body })
            if (autor != null) {
                res.json({ 'message': 'Atualizado com sucesso' })
            } else {
                next(new Erro404('id'))
            }
        } catch(err) {
            next(err)
        }
    }

    static listarAutor = async (req, res, next) => {
        try {
            const autor = await autores.findById(req.params.id)
            if (autor != null) {
                res.json(autor)
            } else {
                next(new Erro404('id'))
            }
        } catch (err) {
            next(err)
        }
    }

    static deletarAutor = async (req, res, next) => {
        try {
            const autor = await autores.findByIdAndDelete(req.params.id)
            if (autor != null) {
                res.send({ 'message': 'Removido com sucesso' })
            } else {
                next(new Erro404('id'))
            }
        } catch (err) {
            next(err)
        }
    }
}