import express from 'express'
import cors from 'cors'
const porta= 3000

const run = express()
run.use(cors())
run.use(express.json())
//run.use('/')

run.listen(porta)