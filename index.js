import express from 'express'
import { ticketsRouter } from './routes/tickets.js'
import 'dotenv/config'

const app = express()
app.use(express.json())

app.use('/tickets', ticketsRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
