import express from 'express'
import cors from 'cors'
import rota from './rotas.js'
const porta= 3000

const run = express()
try
{run.use(cors())
run.use(express.json())
run.use("/",rota)
}
catch(error){
console.log(error)
}

run.listen(porta,()=>{
    console.log("rotas ligadas")
})