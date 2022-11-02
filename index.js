import  express from 'express'
import dotenv from 'dotenv'
import accountRouter from './src/routes/account.js'
import mongoose from 'mongoose'

dotenv.config()

const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.text())

expressApp.get('/', (req, res) => {
    res.send('Connected');
})

expressApp.use("/account", accountRouter)

const bootstrp = async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    expressApp.listen(process.env.PORT, () => {
        console.log(`Servidor levantado en el ${process.env.PORT}`)
    })
}

bootstrp()

