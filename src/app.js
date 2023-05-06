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

export default app