import  express from 'express'
import dotenv from 'dotenv'
import { USERS_BBDD } from './bd/bbdd.js'

dotenv.config()

const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.text())

//Obtener los detalles de una cuenta a partir del guid
expressApp.get('/account/:guid', (req, res) => {
    const { guid } = req.params;

    const user = USERS_BBDD.find( user => user.guid === guid)
    
    if (!user) return res.status(404).send()

    return res.send(user)
})

//Crear una nueva cuenta
expressApp.post('/account', (req, res) => {

    const { name, guid } = req.body

    if (!name || !guid) return res.status(400).send();

    const user = USERS_BBDD.find( user => user.guid === guid)
    
    if (user) return res.status(409).send()

    USERS_BBDD.push({
        name, guid
    })

    return res.send()
})

//Actualizar el nombre de una cuenta
expressApp.put('/account/:guid', (req, res) => {
    const { guid } = req.params

    const { name } = req.body

    if (!name) return res.status(400).send();

    const user = USERS_BBDD.find( user => user.guid === guid)
    
    if (!user) return res.status(404).send()

    user.name = name

    return res.send(user)
})

//Eliminar una cuenta
expressApp.delete('/account/:guid', (req, res) => {
    const { guid } = req.params;

    const userIndex = USERS_BBDD.findIndex( user => user.guid === guid)
    
    if (userIndex === -1) return res.status(404).send()

    USERS_BBDD.splice(userIndex, 1)

    return res.send()
})

expressApp.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor levantado en el ${process.env.PORT}`)
})