import mongoose from "mongoose"
import ErroBase from "../erros/ErroBase.js"
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js"
import ErroValidacao from "../erros/ErroValidacao.js"
import Erro404 from "../erros/Erro404.js"

export default function manipuladorDeErros(err, req, res, next) {
    if (err instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarErro(res)
    } else if (err instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(err).enviarErro(res)
    } else if (err instanceof ErroBase) {
        err.enviarErro(res)
    } else {
        new ErroBase().enviarErro(res)
    }
}