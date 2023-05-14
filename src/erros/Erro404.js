import ErroBase from "./ErroBase.js";

export default class Erro404 extends ErroBase {
    constructor(item) {
        if (item == 'página') {
            super('Página não encontrada', 404)
        } else if (item == 'id') {
            super('Identificador não encontrado', 404)
        }
    }
}