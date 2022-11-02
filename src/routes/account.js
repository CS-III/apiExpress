import express from 'express'
import userModel from './schemas/user-schema.js'

const accountRouter = express.Router();

//Middleware que loguea la ip
accountRouter.use((req, res, next) => {
    console.log(req.ip);
  
    next()
})
//Obtener los detalles de una cuenta a partir del guid
accountRouter.get('/:guid', async (req, res) => {
    const { guid } = req.params;

    const user = await userModel.findById(guid)
    
    if (!user) return res.status(404).send()

    return res.send(user)
})

//Crear una nueva cuenta
accountRouter.post('', async (req, res) => {

    const { name, guid } = req.body

    if (!name || !guid) return res.status(400).send()

    const user = await userModel.findById(guid).exec()
    
    if (user) return res.status(409).send()

    const newUser = new userModel({
        _id: guid, name
    })
    
    await newUser.save();

    return res.send()
})

//Actualizar el nombre de una cuenta
accountRouter.put('/:guid', async (req, res) => {
    const { guid } = req.params

    const { name } = req.body

    if (!name) return res.status(400).send();

    const user =  await userModel.findById(guid)
    
    if (!user) return res.status(404).send()

    user.name = name

    await user.save()

    return res.send(user)
})

//Eliminar una cuenta
accountRouter.delete('/:guid', async (req, res) => {
    const { guid } = req.params;

    const user = await userModel.findById(guid)
    
    if (!user) return res.status(404).send()

    await user.remove()

    return res.send()
})

export default accountRouter