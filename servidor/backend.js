import { rejects } from "assert"
import conexao from "./conexao.js"


///////////funcoes auxiliares
function verificaCampos(obj){
 let prenchidos = {}
    let campos = Object.keys(obj)
    for(let i =0; Object.keys(obj).length>i;i++){
      if(obj[campos[i]])
        prenchidos[campos[i]] = obj[campos[i]]
    }
    return(prenchidos)
}
///////////////////fim funcoes auxiliares

//////////////////TUTOR
async function insertTutor(tutor){
try{
    let colunas = 'tb_tutor (nm_instituicao, cnpj_tutor, cidade_tutor, num_tutor, senha_tutor, email_tutor)'
    let insercao = [[tutor.nm_tutor,tutor.cnpj_tutor,tutor.cidade_tutor,tutor.num_tutor,tutor.senha_tutor,tutor.email_tutor]]
    
    await conexao.query(`INSERT INTO ${colunas} VALUES ?`,[insercao])
    return("Sucesso")
  }
  catch(error){
  return(error)
  }
}

async function readTutor(tutor){
  try{
    if(!"cd_tutor" in tutor || (!tutor.cd_tutor)){
      return("DIGITE O CODIOGO DO USUARIO")
    }
  
    var resultado
    let sql = 'SELECT * FROM tb_tutor WHERE cd_tutor = ? ;'
  
    const resposta = new Promise((resolve,rejects)=>{
      conexao.query(sql,[[tutor.cd_tutor]], (err,res,field)=>{
      if(!err){
        resultado =res[0]
        resolve(resultado)
      }
      else{
        throw new err
        
        }
     })
  })
 
    return(await resposta)
  
  }
  catch(error){
    mensagem = error
  return(mensagem)
  }
}

// Login do usuário
const loginUser = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM TB_USER WHERE EMAIL_USER = ? AND SENHA_USER = ?";
  conexao.query(sql, [email, password], ((err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.length < 1) {
      res.status(400).json({ msg: "Email ou senha inválidos" });
      return;
    }
    res.status(200).json({ msg: "Sucesso", id_user: result[0].ID_USER });
  }))
}

async function readAllTutor(tutor){
  try{
      
    var resultado
    let sql = 'SELECT * FROM tb_tutor ;'
  
    const resposta = new Promise((resolve,rejects)=>{
      conexao.query(sql,[[tutor.cd_tutor]], (err,res,field)=>{
      if(!err){
        resultado =res
        resolve(resultado)
      }
      else{
        throw new err
        
        }
     })
  })
 
    return(await resposta)
  
  }
  catch(error){
    mensagem = error
  return(mensagem)
  }
}

async function updateTutor(tutor){
  try{
    //valida os campos que não foram preenchidos
    tutor = verificaCampos(tutor)

     var pk 
    if("cd_tutor" in tutor && (tutor.cd_tutor)){
      pk = ` WHERE cd_tutor = '${tutor.cd_tutor}'`
      delete tutor.cd_tutor
    }
    
    else{
      return("DIGITE O CODIGO DO TUTOR")      
    }
    let sql =`UPDATE tb_tutor SET ` 
    let valores = []
    for(var key in tutor){
      sql+= key + " = ?, "
      valores.push(tutor[key])
    }
    sql = sql.slice(0,-2)
    sql += pk
    
    
   conexao.query(sql,valores)
    return("Sucesso")
  }
  
  catch(error){
    mensagem = error
  return(mensagem)
  }
}

async function deleteTutor(tutor){
  try{
    if ("cd_tutor" in tutor && (tutor.cd_tutor)){
      let sql = 'DELETE FROM tb_tutor WHERE cd_tutor = ? '
      conexao.query(sql,[[tutor.cd_tutor]])
      return("Deletado")
    }

    else{
      return("DIGITE O CODIGO DO TUTOR")
    }
  }

  catch(error){
    mensagem = error
    return(mensagem)
  }

}
//////////////////FIM TUTOR

//////////////////USUARIOS
async function insertUser(usuarios){
  try{
    console.log(usuarios)
    let colunas = 'tb_user (nm_user, cpf_user, cidade_user, email_user, senha_user, sexo_user)'
    let insercao = [[usuarios.nm_user,usuarios.cpf_user,usuarios.cidade_user,usuarios.email_user,usuarios.senha_user,usuarios.sexo_user]]
    console.log(insercao)
    
    await conexao.query(`INSERT INTO ${colunas} VALUES ?`,[insercao])
    return("Sucesso")
  }
  
  catch(error){
   
  return(error)
  }
}

async function readUser(usuarios){
  try{
    console.log(usuarios);
    if(!"cd_user" in usuarios || (!usuarios.cd_user)){
      return("DIGITE O CODIOGO DO USUARIO")
    }
  
    var resultado
    let sql = 'SELECT * FROM tb_user WHERE id_user = ? ;'
  
    const resposta = new Promise((resolve,rejects)=>{
      conexao.query(sql,[[usuarios.cd_user]], (err,res,field)=>{
      if(!err){
        resultado =res[0]
        resolve(resultado)
      }
     })
  })
 
    return(await resposta)
  
  }
  catch(error){
    mensagem = error
  return(mensagem)
  }
}

async function readAllUser(){
  try{
    
    //coluans não possui: senha,pk e cpf
    let colunas = 'nm_user, cidade_user, email_user, sexo_user',resultado    
    let sql = `SELECT ${colunas} FROM tb_user`
     
    const resposta = new Promise((resolve, reject)=>{
     conexao.query(sql,(err,res)=>{
      if(!err){
        resultado = res
        resolve(resultado)
      }
    })
  })
    return(await resposta)
  }
  
  catch(error){
    mensagem = error
  return(mensagem)
  }
}


async function updateUser(usuarios){
  try{
    //valida os campos que não foram preenchidos
    usuarios = verificaCampos(usuarios)

     var pk 
    if("cd_user" in usuarios && (usuarios.cd_user)){
      pk = ` WHERE cd_user = '${usuarios.cd_user}'`
      delete usuarios.cd_user
    }
    
    else{
      return("DIGITE O CODIGO DO CLIENTE")      
    }
    let sql =`UPDATE tb_user SET ` 
    let valores = []
    for(var key in usuarios){
      sql+= key + " = ?, "
      valores.push(usuarios[key])
    }
    sql = sql.slice(0,-2)
    sql += pk
    
    
   conexao.query(sql,valores)
    return("Sucesso")
  }
  
  catch(error){
    mensagem = error
  return(mensagem)
  }
}

async function deleteUser(usuarios){
  try{
    if ("cd_user" in usuarios && (usuarios.cd_user)){
      let sql = 'DELETE FROM tb_user WHERE cd_user = ? '
      conexao.query(sql,[[usuarios.cd_user]])
      return("Deletado")
    }

    else{
      return("DIGITE O CODIGO DO USUARIO")
    }
  }

  catch(error){
    mensagem = error
    return(mensagem)
  }

}
//////////////////FIM USUARIOS

//////////////////PET

// Função para registrar um pet
const registrarPet = (req, res) => {
  // Pega os valores do front
  const {id_user, name_pet, gender, raca, porte, castrado, image} = req.body
  const date = new Date()
  const date_pub = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
  const sql = "INSERT INTO TB_PET (ID_USER, NM_PET, SEXO, RACA, PORTE, CASTRADO, DATE_PUB, IMG_PET) VALUES ?"
  const values = [[id_user, name_pet, gender, raca, porte, castrado, date_pub, image]]
  conexao.query(sql, [values], (err) => {
    if (err) throw err;
    res.status(200).json("Pet inserido")
  })
}

// Função para visualizar todos os pets do usuário
const viewUserPets = (req, res) => {

  // Pega o id do usuário pel link /pet/petsUsuarios/1 por exemplo
  const { id_user } = req.params
  const sql = "SELECT * FROM TB_PET WHERE ID_USER = ?"
  conexao.query(sql, id_user, (err, result) => {
    if (err) throw err
    if (result.length < 0) {
      res.status(400).json({msg: "Nenhum pet registrado"})
      return;
    }
    res.status(200).json(result)
  })
}


// Função para visualizar um pet específico
const viewPet = (req, res) => {
  // Pega o id do usuário pel link /pet/petsUsuarios/1 por exemplo
  const { idPet } = req.params
  const sql = "SELECT TB_PET.*, TB_USER.NM_USER FROM TB_PET JOIN TB_USER ON TB_PET.ID_USER = TB_USER.ID_USER WHERE TB_PET.CD_PET = ?"
  conexao.query(sql, idPet, (err, result) => {
    if (err) throw err
    res.status(200).json(result)
  })
}

async function readAllPet(){
  try{
    
    //coluans não possui: senha,pk e cpf
    let sql = `SELECT * FROM tb_pet`
     
    const resposta = new Promise((resolve, reject)=>{
     conexao.query(sql,(err,res)=>{
      if(!err){
        resolve(res)
      }
    })
  })
    return(await resposta)
  }
  
  catch(error){
    mensagem = error
  return(mensagem)
  }
}

//atualiz pets
async function updatePets(pets){
  try{
    //valida os campos que não foram preenchidos
    pets = verificaCampos(pets)

    var pk 
    if("cd_pet" in pets && (pets.cd_pet)){
      pk = ` WHERE cd_pet = ${pets.cd_pet}`
      delete pets.cd_pet
    }
    
    else{
      return("DIGITE O CODIGO DO ANIMAL")      
    }
    let sql =`UPDATE tb_pet SET ` 
    let valores = []
    for(var key in pets){
      sql+= key + " = ?, "
      valores.push(pets[key])
    }
    sql = sql.slice(0,-2)
    sql += pk
    
    
   conexao.query(sql,valores)
    return("Sucesso")
  }
  
  catch(error){
    mensagem = error
  return(mensagem)
  }
}

async function deletePets(pets){
  try{
    if ("cd_pet" in pets && (pets.cd_pet)){
      let sql = 'DELETE FROM tb_pet WHERE cd_pet = ? '
      conexao.query(sql,[[pets.cd_pet]])
      return("Deletado")
    }

    else{
      return("DIGITE O CODIGO DO ANIMAL")
    }
  }
  catch(error){
    return(error)
  }
}
//////////////////FIM PET

export default {
          //crud usuario
          insertUser,
          readUser,
          readAllUser,
          updateUser,
          loginUser,
          deleteUser,
          //fim crud usuarios

          //crud pets
          registrarPet,
          viewUserPets,
          readAllPet,
          updatePets,
          viewPet,
          deletePets,
          //fim crud pets
          
          //crud tutor
          insertTutor,
          readTutor,
          readAllTutor,
          updateTutor,
          deleteTutor

          //fim tutor
             }