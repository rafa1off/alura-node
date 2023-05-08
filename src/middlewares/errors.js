import mongoose from "mongoose"

export default function manipuladorDeErros(err, req, res, next) {
    if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({'message': 'Um ou mais dados fornecidos estão incorretos'})
    } else {
        res.status(500).send({'message': 'Erro interno no servidor'})
    }
}