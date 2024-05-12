import { Ticket } from '../models/ticket.js'

export class TicketController {
  static async getAll(req, res) {
    const { name, plate, color, type } = req.query;
    const filters = {};
    if (name) filters.name = { $regex: new RegExp(name, "i") }; // "i" para hacer la búsqueda insensible a mayúsculas/minúsculas
    if (plate) filters.plate = { $regex: new RegExp(plate, "i") };
    if (color) filters.color = { $regex: new RegExp(color, "i") };
    if (type) filters.type_vehicle = { $regex: new RegExp(type, "i") };
    console.log(filters)
    
    const filteredTickets = await Ticket.findByFilters(filters);
    if (filteredTickets) {
        res.json(filteredTickets);
    } else {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async getById (req, res) {
    const { id } = req.params
    const ticket = await Ticket.getById(id)
    if (ticket) {return res.json(ticket)}
    else{
      res.status(404).json({ message: 'ticket not found' })
    }
  }

  static async create (req, res) {
    const result = req.body
    const newTicket = await Ticket.create(result)
    if (!newTicket) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }else{
      res.status(201).json(newTicket)
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const { body }= req
    const updatedTicket = await Ticket.update(id, body)

    if (!updatedTicket) {
      return res.status(400).json({ message: 'Ticket not found' })
    }else{
      return res.json(updatedTicket)
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    console.log(id)
    const result = await Ticket.delete(id)
    console.log(result)
    if (!result) {
      return res.status(404).json({ message: 'Ticket not found' })
    }else{
      return res.json({ message: 'Ticket deleted', result })
    }
  }

  static async getByDate(req, res) {
   
    const { date1, date2 } = req.params;
    const tickets = await Ticket.getByDate(date1, date2);
    if(tickets) {
      res.json(tickets);
    } else {
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async getRepeatSpeeders(req, res) {

      const { number } = req.params;
      const repeatSpeeders = await Ticket.findRepeatSpeeders(number);
    if(repeatSpeeders){
      res.json(repeatSpeeders);
    } else {
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async deleteByInfractorName(req, res) {

    const { name_infractor } = req.params;
    const result = await Ticket.deleteByInfractorName(name_infractor);
    if(result){
      res.json({ message: 'Infracciones eliminadas', result });
    } else {
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async deleteByMinSpeed(req, res) {
    const { speed } = req.params;
    const result = await Ticket.deleteByMinSpeed(speed);
    if(result) {
      res.json({ message: 'Infracciones eliminadas', result });
    } else {
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

}


// 1 busqueda de multas entre 2 fechas route /by_date/:fecha1/:fecha2
// 2 mostrar todos los nombres que tienen mas de "numero" de infracciones route /repeat_speders/:number
// 3 borrar todas las infracciones que coincidan con "nombre" route /delete_infractor/:name_infractor
// 4 borrar todas las infracciones que tengan velocidad menor "numero" route /delete_speedmin/:speed
// 5 en la misma ruta por query con el mismo filtro si se le pasa un query filtrar por name, placa, color y tipo route ?name=juan&plate=33&color=red&type=camioneta
