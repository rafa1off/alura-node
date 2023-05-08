import autores from "../models/Autor.js"

class AutoresController {
    static listarAutores = async (req, res) => {
        try {
            res.json(await autores.find())
        } catch (err) {
            res.send({'message': err.message})
        }
    }

    static cadastrarAutor = async (req, res) => {
        try {
            res.status(201).json(await new autores(req.body).save())
        } catch (err) {
            res.send({'message': err.message})
        }
    }

    static atualizarAutor = async (req, res) => {
        try {
            await autores.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).send({'message': 'Atualizado com sucesso'})
        } catch (err) {
            res.status(500).send({'message': err.message})
        }
    }

    static listarAutor = async (req, res) => {
        try {
            res.json(await autores.findById(req.params.id))
        } catch (err) {
            res.send({'message': err.message})
        }
    }

    static deletarAutor = async (req, res) => {
        try {
            await autores.findByIdAndDelete(req.params.id)
            res.status(200).send({'message': 'Deletado com sucesso'})
        } catch (err) {
            res.send({'message': err.message})
        }
    }
}

export default AutoresController