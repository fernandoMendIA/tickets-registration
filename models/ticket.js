import mongoose from 'mongoose';
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => {
        console.log('Conexion exitosa');
    }
).catch( error => console.log('error de conexion', error));

// Definición del esquema de tickets
const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Firstname is required.'],
  },
  date: {
    type: Date,
    default: Date.now
  },
  plate: String,
  type_vehicle: String,
  image: String,
  color: String,
  model: String,
  car_brand: String,
  speed: Number
});


// Modelo de la colección tickets
const TicketModel = mongoose.model('Ticket', ticketSchema, 'tickets');

export class Ticket {
  // get all and find by filters///////////
  static async findByFilters(filters) {
    try {
        const filteredTickets = await TicketModel.find(filters);
        return filteredTickets;
    } catch (error) {
        throw new Error('Error al recuperar los datos o filtrarlos', error);
    }
  }

  static async getById(id) {
    try {
      const ticket = await TicketModel.findById(id);
      return ticket;
    } catch (error) {
      console.error('Error al obtener el ticket por ID:', error);

    }
  }

  static async create(input) {
    try {
      const ticket = new TicketModel(input);
      await ticket.save();
      return ticket;
    } catch (error) {
      console.error('Error al crear el ticket:', error);

    }
  }

  static async update(id, input) {
    try {
      const updatedTicket = await TicketModel.findByIdAndUpdate(id, input, { new: true });
      return updatedTicket;
    } catch (error) {
      console.error('Error al actualizar el ticket:', error);

    }
  }

  static async delete(id) {
    try {
      const deletedTicket = await TicketModel.findByIdAndDelete(id);
      return deletedTicket;
    } catch (error) {
      console.error('Error al eliminar el ticket:', error);

    }
  }

  static async getByDate(fecha1, fecha2) {
    try {
      const tickets = await TicketModel.find({ date: { $gte: new Date(fecha1), $lte: new Date(fecha2) } });
      return tickets;
    } catch (error) {
      console.log(`error console message bydate: ${error}`)
    }
  }

  static async findRepeatSpeeders(number) {
    try {
      const repeatSpeeders = await TicketModel.aggregate([
        { $group: { _id: '$name', count: { $sum: 1 }, dates: { $push: '$date' }, 
        colors: { $push: '$color' }, plates: { $push: '$plate' }, 
        type_vehicles: { $push: '$type_vehicle' } } },
        { $match: { count: { $gt: parseInt(number) } } }
      ]);
  
      const data = repeatSpeeders.map(speeder => (
        {
          name: speeder._id,
          count: speeder.count,
          dates: speeder.dates,
          colors: speeder.colors,
          plates: speeder.plates,
          type_vehicles: speeder.type_vehicles
        }
      ));
  
      return data;
    } catch (error) {
      console.log(`error console message by repeat speeder: ${error}`)
    }
  }

  static async deleteByInfractorName(name_infractor) {
    try {
      const result = await TicketModel.deleteMany({ name: name_infractor });
      return result;
    } catch (error) {
      console.log('Error al eliminar infracciones por nombre:', error);
    }
  }

  static async deleteByMinSpeed(speed) {
    try {
      const result = await TicketModel.deleteMany({ speed: { $lt: parseInt(speed) } });
      return result;
    } catch (error) {
      console.log('Error al eliminar infracciones por velocidad mínima:', error);
    }
  }


}
