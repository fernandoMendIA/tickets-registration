import express from 'express'
import bodyParser from "body-parser";
import { ticketsRouter } from './routes/tickets.js'
import { usuariosRouter } from './routes/usuarios.js'
import { vehiclesRouter } from './routes/vehicles.js'
import 'dotenv/config'
import {autenticar} from './middlewares/autenticationMid.js'
import cors from 'cors'
const corsOptions ={
  origin: ['http://localhost:4200','http://localhost:4200/', 'http://localhost:3000', 'http://localhost:5173/'],
  optionsSuccessStatus: 200
};
const app = express()
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));


app.use('/auth', usuariosRouter)
// app.use('/tickets', autenticar, ticketsRouter)
app.use('/tickets', ticketsRouter)

app.use('/vehicles', vehiclesRouter)
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
