import express from "express";
import back from './backend.js'
const rota = express.Router()

//////////USUARIOS
rota.post("/cadastro/usuario",async (req,res) =>{
    console.log("cadastrando")
    console.log(req.body)
    res.send({message: await back.insertUser(req.body).catch((error)=>{return(`${error}`)})})
}) 

rota.post("/encontrar/usuario",async (req,res) =>{
    res.send(await back.readUser(req.body).catch((error)=>{return(`${error}`)}))
})

// Rota para registro do pet
rota.post("/pet/registrar", back.registrarPet)

// O /:id_user é pego do front para buscar o id do usuário logado
rota.get("/pet/petsUsuario/:id_user", back.viewUserPets)

rota.get("/encontrar/todos/usuario",async (req,res) =>{
    res.send({message: await back.readAllUser(req.body).catch((error)=>{return(`${error}`)})})
}) 

rota.put("/atualizar/usuario",async (req,res) =>{
    res.send({message: await back.updateUser(req.body).catch((error)=>{return(`${error}`)})})
})

rota.delete("/delete/usuario",async (req,res) =>{
    res.send({message: await back.deleteUser(req.body).catch((error)=>{return(`${error}`)})})
}) 
//////////FIM USUARIOS

export default rota