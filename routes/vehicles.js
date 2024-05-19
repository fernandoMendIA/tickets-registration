import {Router} from 'express';
import {VehicleController} from '../controllers/Vehicles.js';

// crud create read update delete
export const vehiclesRouter = Router();

vehiclesRouter.get('/', VehicleController.getAll) //endpoint 1. Read 
vehiclesRouter.post('/', VehicleController.create) //endpoint 2. Create
vehiclesRouter.put('/:id', VehicleController.update) //endpoint 3. Update
vehiclesRouter.delete('/:id', VehicleController.delete) //endpoint 4. Delete

//reporte 1 las multas de un id_vehiculo
vehiclesRouter.get('/multasporvehiculo/:idvehiculo', VehicleController.getMultasPorPropietario);
//reporte 2 todas las multas con los detalles de los vehiculos
vehiclesRouter.get('/detallemultasporvehiculo', VehicleController.getAllTicketsWithVehicleInfo) //endpoint 2. Create