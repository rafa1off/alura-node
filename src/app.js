import express from 'express'
import db from './config/dbConnect.js'
import livros from './models/livro.js'
import routes from './routes/index.js'
import { ObjectId } from 'bson'

db.then(res => console.log('Conexão bem sucedida'))
    .catch(err => console.log(err))

const app = express()
app.use(express.json())

function buscaLivro(id) {
    let obid = new ObjectId(id)
    return livros.find({'_id': obid})
}

routes(app)

app.route('/livros/:id')
    .get((req, res) => {
        let id = new ObjectId(req.params.id)
        livros.find({ '_id': id })
            .then(livro => res.json(livro))
            .catch(err => res.send(err))
    })
    .put((req, res) => {
        let id = new ObjectId(req.params.id)
        livros.find({ '_id': id })
    })
    .delete((req, res) => {
        let id = new ObjectId(req.params.id)
        livros.deleteOne({ '_id': id })
    })

export default app