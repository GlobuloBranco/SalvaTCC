import express from "express";
import back from './backend.js'
const rota = express.Router()

//////////USUARIOS
rota.post("/cadastro/usuario",async (req,res) =>{
    console.log("cadastrando")
    res.send({message:back.insertUser(req.body).catch((error)=>{return(`${error}`)})})
}) 

rota.post("/encontrar/usuario",async (req,res) =>{
    res.send(back.readUser(req.body).catch((error)=>{return(`${error}`)}))
}) 

rota.post("/encontrar/todos/usuario",async (req,res) =>{
    res.send({message:back.readUser(req.body).catch((error)=>{return(`${error}`)})})
}) 

rota.put("/atualizar/usuario",async (req,res) =>{
    res.send({message:back.updateUser(req.body).catch((error)=>{return(`${error}`)})})
})

rota.post("/delete/usuario",async (req,res) =>{
    res.send({message:back.deleteUser(req.body).catch((error)=>{return(`${error}`)})})
}) 
//////////FIM USUARIOS

export default rota