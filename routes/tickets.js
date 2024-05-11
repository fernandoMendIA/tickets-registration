import { Router } from 'express'

import { TicketController } from '../controllers/tickets.js'

export const ticketsRouter = Router()

//crud create read update delete
ticketsRouter.get('/', TicketController.getAll) //endpoint 1. Read
ticketsRouter.post('/', TicketController.create) //endpoint 2. Create
ticketsRouter.put('/:id', TicketController.update) //endpoint 3. Update
ticketsRouter.delete('/:id', TicketController.delete) //endpoint 4. Delete

//consultas avanzadas
ticketsRouter.get('/:id', TicketController.getById) //endpoint 5.

ticketsRouter.get('/by_date/:date1/:date2', TicketController.getByDate);
//Punto 2: Mostrar todos los nombres que tienen más de "numero" de infracciones
ticketsRouter.get('/repeat_speeders/:number', TicketController.getRepeatSpeeders);

//Punto 3: Borrar todas las infracciones que coincidan con "nombre"
ticketsRouter.delete('/delete_infractor/:name_infractor', TicketController.deleteByInfractorName);

//Punto 4: Borrar todas las infracciones que tengan velocidad menor "numero"
ticketsRouter.delete('/delete_speedmin/:speed', TicketController.deleteByMinSpeed);
