import express from 'express'
import cors from 'cors'
import rota from './rotas.js'
import bodyParser from 'body-parser'
const porta= 3000

const run = express()
try
{
run.use(cors())

// para poder ser usado usando axios e insomnia (axios é mto bom ^_^)
run.use(bodyParser.urlencoded({ extended: false }));
run.use(bodyParser.json());

run.use("/",rota)
}
catch(error){
console.log(error)
}

run.listen(porta,()=>{
    console.log("rotas ligadas")
})