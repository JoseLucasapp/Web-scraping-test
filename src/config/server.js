import express from 'express'
import cors from 'cors'

import { notebooksRoutes } from '../routes/notebooks'

const app = express()
const router = express.Router()

app.use(express.json())
app.use(cors())
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello, this is the home page.')
})

notebooksRoutes(router)

export default app