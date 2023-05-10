import Erro404 from "../erros/Erro404.js"
import {autores, livros} from "../models/index.js"

export default class LivrosController {
    static listarLivros = async (req, res, next) => {
        try {
            res.json(await livros.find().populate('autor', 'nome'))
        } catch (err) {
            next(err)
        }
    }

    static cadastrarLivro = async (req, res, next) => {
        try {
            res.status(201).json(await new livros(req.body).save())
        } catch (err) {
            next(err)
        }
    }

    static atualizarLivro = async (req, res, next) => {
        try {
            const livro = await livros.findByIdAndUpdate(req.params.id, { $set: req.body })
            if (livro != null) {
                res.json({ 'message': 'Atualizado com sucesso' })
            } else {
                next(new Erro404('id'))
            }
        } catch (err) {
            next(err)
        }
    }

    static listarLivro = async (req, res, next) => {
        try {
            const livro = await livros.findById(req.params.id)
            if (livro != null) {
                res.json(livro)
            } else {
                next(new Erro404('id'))
            }
        } catch (err) {
            next(err)
        }
    }

    static deletarLivro = async (req, res, next) => {
        try {
            const livro = await livros.findByIdAndDelete(req.params.id)
            if (livro != null) {
                res.send({ 'message': 'Removido com sucesso' })
            } else {
                next(new Erro404('id'))
            }
        } catch (err) {
            next(err)
        }
    }

    static buscarLivrosporFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query)
            if (busca != null) {
                res.json(await livros.find(busca).populate('autor', 'nome'))
            } else {
                res.status(200).json({'message': 'Nada encontrado'})
            }
        } catch (err) {
            next(err)
        }
    }
}

async function processaBusca(parametro) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametro
    let busca = {}
    if (editora) busca.editora = {$regex: editora, $options: 'i'}
    if (titulo) busca.titulo = {$regex: titulo, $options: 'i'}
    if (minPaginas || maxPaginas) busca.numeroPaginas = {}
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas
    if (nomeAutor) {
        const autor = await autores.findOne({ nome: { $regex: nomeAutor, $options: 'i' } })
        if (autor != null) {
            busca.autor = autor._id
        } else {
            busca = null
        }
    }

    return busca
}