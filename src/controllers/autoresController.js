import mongoose from "mongoose"
import autores from "../models/Autor.js"

class AutoresController {
    static listarAutores = async (req, res) => {
        try {
            res.json(await autores.find())
        } catch (err) {
            res.status(500).send({'message': err.message})
        }
    }

    static cadastrarAutor = async (req, res) => {
        try {
            res.status(201).json(await new autores(req.body).save())
        } catch (err) {
            res.status(500).send({'message': err.message})
        }
    }

    static atualizarAutor = async (req, res) => {
        try {
            await autores.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.send({'message': 'Atualizado com sucesso'})
        } catch (err) {
            res.status(500).send({'message': err.message})
        }
    }

    static listarAutor = async (req, res) => {
        try {
            const autor = await autores.findById(req.params.id)
            if (autor != null) {
                res.json(autor)
            } else {
                res.status(404).send({'message': 'Autor não encontrado'})
            }
        } catch (err) {
            if (err instanceof mongoose.Error.CastError) {
                res.status(400).send({'message': 'Um ou mais dados fornecidos estão incorretos'})
            } else {
                res.status(500).send({'message': 'Erro interno no servidor'})
            }
        }
    }

    static deletarAutor = async (req, res) => {
        try {
            await autores.findByIdAndDelete(req.params.id)
            res.send({'message': 'Deletado com sucesso'})
        } catch (err) {
            res.status(500).send({'message': err.message})
        }
    }
}

export default AutoresController