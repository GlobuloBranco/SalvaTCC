import express from "express";
import back from './backend.js'
const rota = express.Router()

//////////TUTOR
rota.post("/tutor/cadastro", async(req,res)=>{
    res.send({message: await back.insertTutor(req.body).catch((error) =>{return(error)})})})

rota.post("/tutor/todos/encontrar", async(req,res)=>{
    res.send({message: await back.readAllTutor(req.body).catch((error) =>{return(error)})})})

rota.post("/tutor/encontrar", async(req,res)=>{
    res.send({message: await back.readTutor(req.body).catch((error) =>{return(error)})})})

rota.put("/tutor/atualiza", async(req,res)=>{
    res.send({message: await back.updateTutor(req.body).catch((error) =>{return(error)})})})

rota.delete("/tutor/delete", async(req,res)=>{
    res.send({message: await back.deleteTutor(req.body).catch((error) =>{return(error)})})})
//////////FIM TUTOR


//////////PETS
// Rota para registro do pet
rota.post("/pet/registrar", back.registrarPet)

// O /:id_user é pego do front para buscar o id do usuário logado
rota.get("/pet/petsUsuario/:id_user", back.viewUserPets)

rota.put("/pet/atualiza",async (req,res) =>{
    res.send({message:await back.updatePets(req.body).catch((error)=>{return(error)})})})

rota.delete("/pet/delete",async (req,res) =>{
    res.send({message:await back.deletePets(req.body).catch((error)=>{return(error)})})})
//////////FIM PETS


//////////USUARIOS
rota.post("/cadastro/usuario",async (req,res) =>{
    console.log("cadastrando")
    res.send({message: await back.insertUser(req.body).catch((error)=>{return(`${error}`)})})
}) 

rota.post("/encontrar/usuario",async (req,res) =>{
    res.send(await back.readUser(req.body).catch((error)=>{return(`${error}`)}))
})


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