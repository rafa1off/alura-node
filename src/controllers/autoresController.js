import autores from "../models/Autor.js"

class AutoresController {
    static listarAutores = (req, res) => {
        autores.find()
            .then(autores => res.json(autores))
    }

    static cadastrarAutor = (req, res) => {
        const autor = new autores(req.body)
        autor.save()
            .then(() => {
                res.status(201).send(autor.toJSON())
            })
            .catch(err => res.send({message: err.message}))
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id

        autores.findByIdAndUpdate(id, { $set: req.body })
            .then(() => {
                res.status(200).send({message: 'Atualizado com sucesso'})
            })
            .catch(err => res.status(500).send({message: err.message}))
    }

    static listarAutor = (req, res) => {
        const id = req.params.id

        autores.findById(id)
            .then(autor => res.json(autor))
            .catch(err => res.send({message: err.message}))
    }

    static deletarAutor = (req, res) => {
        const id = req.params.id

        autores.findByIdAndDelete(id)
            .then(() => {
                res.status(200).send({message: 'Deletado com sucesso'})
            })
            .catch(err => res.send({message: err.message}))
    }
}

export default AutoresController