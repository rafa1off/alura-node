import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js"

export default async function paginar(req, res, next) {
    try {
        let { limite = 5, pagina = 1, ordenacao = '_id:-1' } = req.query
        let [campoOrdenacao, ordem] = ordenacao.split(':')

        limite = parseInt(limite)
        pagina = parseInt(pagina)
        ordem = parseInt(ordem)

        if (limite > 0 && pagina > 0) {
            res.json(await req.resultado.sort({[campoOrdenacao]: ordem}).skip((pagina - 1) * limite).limit(limite))
        } else {
            next(new RequisicaoIncorreta())
        }
    } catch (err) {
        next(err)
    }
}