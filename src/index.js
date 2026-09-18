import express from 'express'
import { StatusCodes } from 'http-status-codes'

import connectDB from '../config/DBConnect.js';
import { PORT } from '../config/serverConfig.js'
const app = express()

app.use(express.json())

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'ping'
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDB();
})
