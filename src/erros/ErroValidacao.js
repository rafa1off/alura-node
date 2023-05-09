import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

export default class ErroValidacao extends RequisicaoIncorreta {
    constructor(err) {
        const mensagemDeErro = Object.values(err.errors)
            .map(erro => erro.message)
            .join('; ')
        
        super(`Os seguintes erros foram encontrados: ${mensagemDeErro}`)
    }
}