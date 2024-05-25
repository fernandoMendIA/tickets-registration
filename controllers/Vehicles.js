import { Vehicle, VehicleModel } from '../models/vehicle.js'
import { Ticket, TicketModel } from '../models/ticket.js'


export class VehicleController {
  static async getAll(req, res) {
    const { plate, color, type } = req.query;
    const filters = {};
    if (plate) filters.plate = { $regex: new RegExp(plate, "i") };
    if (color) filters.color = { $regex: new RegExp(color, "i") };
    if (type) filters.type_vehicle = { $regex: new RegExp(type, "i") };
    
    const filteredVehicles = await Vehicle.findByFilters(filters);
    if (filteredVehicles) {
        res.json(filteredVehicles);
    } else {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  static async create (req, res) {

    const result = req.body
    if (result._id === "") {
      delete result._id;
    }
    console.log(result.date)
    const newVehicle = await Vehicle.create(result)
    if (!newVehicle) {
      return res.status(400).json({ message: "error en el servidor" })
    }else{
      res.status(201).json(newVehicle)
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const { body }= req
    console.log('crear este vehiculo')
    console.log(id,body)
    const updatedVehicle = await Vehicle.update(id, body)

    if (!updatedVehicle) {
      return res.status(400).json({ message: 'Vehicle not found' })
    }else{
      return res.json(updatedVehicle)
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    console.log(id)
    const result = await Vehicle.delete(id)

    if (!result) {
      return res.status(404).json({ message: 'Vehicle not found' })
    }else{
      return res.json({ message: 'Vehicle deleted', result })
    }
  }

  static async getMultasPorPropietario(req, res) {
   
    const { idvehiculo } = req.params;

    try {
        const vehiculo = await VehicleModel.findById(idvehiculo);
        
        if (!vehiculo)
            return res.status(404).json({ mensaje: 'Vehículo no encontrado' });

        const tickets = await TicketModel.find({ vehicle_ruat: idvehiculo });

        // Fusionar la información del vehículo en cada ticket
        const mergedTickets = tickets.map(ticket => {
            return {
                _id: ticket._id,
                date: ticket.date,
                plate: ticket.plate,
                type_vehicle: ticket.type_vehicle,
                image: ticket.image,
                speed: ticket.speed,
                vehicle_ruat: vehiculo
            };
        });

        res.json(mergedTickets);
    } catch(error) {
        res.status(500).json({ mensaje: error.message });
    }

  }

  static async getAllTicketsWithVehicleInfo(req, res) {
    try {
        // Obtener todas las infracciones
        const tickets = await TicketModel.find();

        // Array para almacenar la información detallada de cada infracción junto con la información del vehículo
        const ticketDetails = [];

        // Iterar sobre cada infracción para obtener su información detallada y la del vehículo correspondiente
        for (const ticket of tickets) {
            // Encontrar el vehículo correspondiente a la infracción
            const vehicle = await VehicleModel.findById(ticket.vehicle_ruat);
            // Si el vehículo existe, añadir información detallada de la infracción y del vehículo al array
            if (vehicle) {
                ticketDetails.push({
                    ticket: ticket,
                    vehicle: vehicle
                });
            }
        }

        res.json(ticketDetails);
    } catch(error) {
        res.status(500).json({ mensaje: error.message });
    }
}

}


