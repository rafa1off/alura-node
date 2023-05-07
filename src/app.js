import express from 'express'
import db from './config/dbConnect.js'
import routes from './routes/index.js'

db
    .then(() => {
        console.log('Conexão bem sucedida')
    })
    .catch(err => console.log(err))

const app = express()
app.use(express.json())

routes(app)

export default app