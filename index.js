import  express from 'express';
import dotenv from 'dotenv';
import { USERS_BBDD } from './bd/bbdd.js';

dotenv.config();

const PORT = process.env.PORT;

const expressApp = express();

expressApp.use(express.json())
expressApp.use(express.text())

//Obtener los detalles de una cuenta a partir del guid
expressApp.get()

//Crear una nueva cuenta
expressApp.post()

//Actualizar una cuenta
expressApp.put()

//Eliminar una cuenta
expressApp.delete()

expressApp.listen(PORT, () => {
    console.log(`Servidor levantado en el ${PORT}`)
})