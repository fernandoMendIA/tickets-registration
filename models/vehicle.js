import mongoose from 'mongoose';
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => {
        console.log('Conexion exitosa');
    }
).catch( error => console.log('error de conexion', error));

// Definición del esquema de vehicles
const vehicleSchema = new mongoose.Schema({
  ouner: String,
  date: {
    type: Date,
    default: Date.now
  },
  plate: {type:String, require:true, unique:true},
  type_vehicle: String,
  image: String,
  color: String,
  model: String,
  car_brand: String,
  year: Number,
  ruat:  {type:String, require:true, unique:true}
});


// Modelo de la colección vehicles
export const VehicleModel = mongoose.model('Vehicle', vehicleSchema, 'vehicles');

export class Vehicle {
  // get all and find by filters///////////
  static async findByFilters(filters) {
    try {
        const filteredVehicles = await VehicleModel.find(filters);
        return filteredVehicles;
    } catch (error) {
        throw new Error('Error al recuperar los datos o filtrarlos', error);
    }
  }

  static async create(input) {
    try {
      const vehicle = new VehicleModel(input);
      await vehicle.save();
      return vehicle;
    } catch (error) {
      console.error('Error al crear el vehicle:', error);
    }
  }

  static async update(id, input) {
    try {
      const updatedVehicle = await VehicleModel.findByIdAndUpdate(id, input, { new: true });
      return updatedVehicle;
    } catch (error) {
      console.error('Error al actualizar el Vehicle:', error);

    }
  }

  static async delete(id) {
    try {
      const deletedVehicle = await VehicleModel.findByIdAndDelete(id);
      return deletedVehicle;
    } catch (error) {
      console.error('Error al eliminar el vehicle:', error);

    }
  }


}
