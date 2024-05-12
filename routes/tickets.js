import { Router } from 'express'

import { TicketController } from '../controllers/tickets.js'

export const ticketsRouter = Router()

//crud create read update delete
ticketsRouter.get('/', TicketController.getAll) //endpoint 1. Read and filters
ticketsRouter.post('/', TicketController.create) //endpoint 2. Create
ticketsRouter.put('/:id', TicketController.update) //endpoint 3. Update
ticketsRouter.delete('/:id', TicketController.delete) //endpoint 4. Delete

//consultas avanzadas
ticketsRouter.get('/:id', TicketController.getById)
ticketsRouter.get('/by_date/:date1/:date2', TicketController.getByDate);
ticketsRouter.get('/repeat_speeders/:number', TicketController.getRepeatSpeeders);
ticketsRouter.delete('/delete_infractor/:name_infractor', TicketController.deleteByInfractorName);
ticketsRouter.delete('/delete_speedmin/:speed', TicketController.deleteByMinSpeed);

// 1 busqueda de multas entre 2 fechas route /by_date/:fecha1/:fecha2
// 2 mostrar todos los nombres que tienen mas de "numero" de infracciones route /repeat_speders/:number
// 3 borrar todas las infracciones que coincidan con "nombre" route /delete_infractor/:name_infractor
// 4 borrar todas las infracciones que tengan velocidad menor "numero" route /delete_speedmin/:speed
// 5 en la misma ruta por query con el mismo filtro si se le pasa un query filtrar por name, placa, color y tipo route ?name=juan&plate=33&color=red&type=camioneta
