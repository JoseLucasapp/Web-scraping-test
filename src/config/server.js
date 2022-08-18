import express from 'express'
import cors from 'cors'

import { notebooksRoutes } from '../routes/notebooks'

const app = express()
const router = express.Router()

app.use(express.json())
app.use(cors())
app.use('/api', router)

notebooksRoutes(router)


export default app