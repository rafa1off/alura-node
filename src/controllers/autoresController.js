import autores from "../models/Autor.js"

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
            await autores.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.send({'message': 'Atualizado com sucesso'})
        } catch (err) {
            next(err)
        }
    }

    static listarAutor = async (req, res, next) => {
        try {
            const autor = await autores.findById(req.params.id)
            if (autor != null) {
                res.json(autor)
            } else {
                res.status(404).send({ 'message': 'Identificador não encontrado' })
            }
        } catch (err) {
            next(err)
        }
    }

    static deletarAutor = async (req, res, next) => {
        try {
            await autores.findByIdAndDelete(req.params.id)
            res.send({'message': 'Deletado com sucesso'})
        } catch (err) {
            next(err)
        }
    }
}