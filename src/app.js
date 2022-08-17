import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = process.env.PORT || 3333

app.listen(port, () => console.log(`App running on port ${port}`))