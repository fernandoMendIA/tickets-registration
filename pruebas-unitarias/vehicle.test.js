import express from 'express'

import request from 'supertest';
import {vehiclesRouter} from '../routes/vehicles.js';
import { Vehicle, VehicleModel } from '../models/vehicle.js';
import mongoose from 'mongoose';
import 'dotenv/config'
import { Ticket } from '../models/ticket.js';
const app = express();
app.use(express.json());
app.use('/vehicles', vehiclesRouter);

describe('Pruebas Unitarias para VEHICLES', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,            
        });
        await VehicleModel.deleteMany({});
    });
    // al finalziar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
      });

    //1er test : GET
    test('Deberia Traer todas los vehiculos metodo: GET: todos los vehicuols', async() =>{

        await VehicleModel.create({"ouner": "Juan perez", "plate": "345GHS", "type_vehicle": "vagoneta", "image": "imagen.jpg", "color": "Red", "model": "Sedan-25", "car_brand": "Toyota", "year": 2020, "ruat": "AFA12"});
        await VehicleModel.create({"ouner": "María García", "plate": "678JKL", "type_vehicle": "sedán", "image": "carro.jpg", "color": "Blue", "model": "Civic-30", "car_brand": "Honda", "year": 2019, "ruat": "BGB34"});
        await VehicleModel.create({"ouner": "Luis Hernández", "plate": "901MNO", "type_vehicle": "camioneta", "image": "auto.jpg", "color": "Green", "model": "Explorer-40", "car_brand": "Ford", "year": 2018, "ruat": "CXC56"});
        await VehicleModel.create({"ouner": "Ana Martínez", "plate": "234PQR", "type_vehicle": "coupé", "image": "coche.jpg", "color": "Yellow", "model": "Mustang-50", "car_brand": "Ford", "year": 2021, "ruat": "DED78"});
        await VehicleModel.create({"ouner": "Pedro López", "plate": "567STU", "type_vehicle": "hatchback", "image": "vehiculo.jpg", "color": "Black", "model": "Golf-60", "car_brand": "Volkswagen", "year": 2017, "ruat": "EFE90"});
        await VehicleModel.create({"ouner": "Laura Ramírez", "plate": "890VWX", "type_vehicle": "pickup", "image": "car.jpg", "color": "White", "model": "Tacoma-70", "car_brand": "Toyota", "year": 2020, "ruat": "FGH12"});
        await VehicleModel.create({"ouner": "Carlos Rodríguez", "plate": "123YZA", "type_vehicle": "convertible", "image": "imagen.jpg", "color": "Silver", "model": "Camaro-80", "car_brand": "Chevrolet", "year": 2019, "ruat": "IJK34"});
        await VehicleModel.create({"ouner": "Sofía Díaz", "plate": "456BCD", "type_vehicle": "sedán", "image": "carro.jpg", "color": "Red", "model": "Accord-90", "car_brand": "Honda", "year": 2018, "ruat": "LMN56"});
        await VehicleModel.create({"ouner": "Miguel Torres", "plate": "789EFG", "type_vehicle": "camioneta", "image": "auto.jpg", "color": "Blue", "model": "Escape-100", "car_brand": "Ford", "year": 2021, "ruat": "OPQ78"});
        await VehicleModel.create({"ouner": "Elena Gómez", "plate": "012HIJ", "type_vehicle": "coupé", "image": "coche.jpg", "color": "Green", "model": "Mustang-110", "car_brand": "Ford", "year": 2017, "ruat": "RST90"});
        await VehicleModel.create({"ouner": "Javier Sánchez", "plate": "345KLM", "type_vehicle": "hatchback", "image": "vehiculo.jpg", "color": "Yellow", "model": "Polo-120", "car_brand": "Volkswagen", "year": 2020, "ruat": "UVW12"});
        await VehicleModel.create({"ouner": "Paula Martín", "plate": "678NOP", "type_vehicle": "pickup", "image": "car.jpg", "color": "Black", "model": "Tundra-130", "car_brand": "Toyota", "year": 2019, "ruat": "XYZ34"});
        await VehicleModel.create({"ouner": "Diego Jiménez", "plate": "901PQR", "type_vehicle": "convertible", "image": "imagen.jpg", "color": "White", "model": "Camaro-140", "car_brand": "Chevrolet", "year": 2018, "ruat": "ABC56"});
        await VehicleModel.create({"ouner": "Andrea López", "plate": "234STU", "type_vehicle": "sedán", "image": "carro.jpg", "color": "Silver", "model": "Civic-150", "car_brand": "Honda", "year": 2021, "ruat": "DEF78"});
        await VehicleModel.create({"ouner": "Pablo Ramírez", "plate": "567VWX", "type_vehicle": "camioneta", "image": "auto.jpg", "color": "Red", "model": "Explorer-160", "car_brand": "Ford", "year": 2017, "ruat": "GHI90"});
        await VehicleModel.create({"ouner": "Isabel Díaz", "plate": "890YZA", "type_vehicle": "coupé", "image": "coche.jpg", "color": "Blue", "model": "Mustang-170", "car_brand": "Ford", "year": 2020, "ruat": "JKL12"});
        await VehicleModel.create({"ouner": "Santiago Torres", "plate": "123BCD", "type_vehicle": "hatchback", "image": "vehiculo.jpg", "color": "Green", "model": "Golf-180", "car_brand": "Volkswagen", "year": 2019, "ruat": "MNO34"});
        await VehicleModel.create({"ouner": "Lucía Gómez", "plate": "456EFG", "type_vehicle": "pickup", "image": "car.jpg", "color": "Yellow", "model": "Tacoma-190", "car_brand": "Toyota", "year": 2018, "ruat": "PQR56"});
        await VehicleModel.create({"ouner": "Mateo Sánchez", "plate": "789HIJ", "type_vehicle": "convertible", "image": "imagen.jpg", "color": "Black", "model": "Camro-200", "car_brand": "Chevrolet", "year": 2021, "ruat": "STU78"});

        

        
        // solicitud - request
        const res =  await request(app).get('/vehicles');
        //verificar la respuesta
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(19);
    }, 10000);

    
});