import express from 'express'
import { ticketsRouter } from './routes/tickets.js'
import { usuariosRouter } from './routes/usuarios.js'
import { vehiclesRouter } from './routes/vehicles.js'

import 'dotenv/config'
import {autenticar} from './middlewares/autenticationMid.js'

const app = express()
app.use(express.json())

app.use('/auth', usuariosRouter)
app.use('/tickets', autenticar, ticketsRouter)
app.use('/vehicles', vehiclesRouter)
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
