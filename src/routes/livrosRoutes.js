import express from 'express'
import LivrosController from '../controllers/livrosController.js'

const router = express.Router()

router
    .get('/livros', LivrosController.listarLivros)
    .get('/livros/:id', LivrosController.listarLivro)
    .post('/livros', LivrosController.cadastrarLivro)
    .put('/livros/:id', LivrosController.atualizarLivro)
    .delete('/livros/:id', LivrosController.deletarLivro)

export default router