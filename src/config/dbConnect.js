import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

let db = mongoose.connect(process.env.CONNECTION_STRING)

export default db