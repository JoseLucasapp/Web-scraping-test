import dotenv from 'dotenv'
import app from './config/server'

dotenv.config()

const port = process.env.PORT || 3333

app.listen(port)