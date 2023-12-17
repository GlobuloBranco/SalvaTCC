import { rejects } from "assert"
import conexao from "./conexao.js"



// conexao.query('INSERT INTO [TABLE_NAME](NOMES DOS CAMPOS) VALUES(VALOREEEES) ')
// conexao.query('UPDATE [TABLE_NAME] SET [VARIAVEL = VALOR, VARIAVEL = VALOR] WHERE[condicao]')
// conexao.query('SELECT [COLUNA] FROM [TABLE_NAME] ')
// conexao.query('DELETE FROM [TABLE_NAME] WHERE[Condicao] ')

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
    let sql = 'SELECT * FROM tb_user WHERE cd_user = ? ;'
  
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
    //achar todos os prenchidos e adicionar eles no array
    let prenchidos = {}
    let campos = Object.keys(usuarios)
    for(let i =0; Object.keys(usuarios).length>i;i++){
      if(usuarios[campos[i]])
        prenchidos[campos[i]] = usuarios[campos[i]]
    }
    usuarios = prenchidos


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
//////////////////PET

// Função para registrar um pet
const registrarPet = (req, res) => {

  // Pega os valores do front
  const {id_user, name_pet, gender, raca, porte, castrado, image} = req.body
  const sql = "INSERT INTO TB_PET (ID_USER, NM_PET, SEXO, RACA, PORTE, CASTRADO, IMG_PET) VALUES ?"
  const values = [[id_user, name_pet, gender, raca, porte, castrado, image]]
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
//////////////////FIM PET

export default {
          //crud usuario
          insertUser,
          readUser,
          readAllUser,
          updateUser,
          deleteUser,
          registrarPet,
          viewUserPets
          //crud 
             }