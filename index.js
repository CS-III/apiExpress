import  express from 'express'
import dotenv from 'dotenv'
import accountRouter from './src/routes/account.js'

dotenv.config()

const expressApp = express()

expressApp.use(express.json())
expressApp.use(express.text())

expressApp.get('/', (req, res) => {
    res.send('Connected');
})

expressApp.use("/account", accountRouter)

expressApp.listen(process.env.PORT, () => {
    console.log(`Servidor levantado en el ${process.env.PORT}`)
})