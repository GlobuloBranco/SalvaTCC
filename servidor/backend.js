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
    if(!"cd_user" in usuarios || (!usuarios.cd_user)){
      return("DIGITE O CODIOGO DO USUARIO")
    }
    var resultado
    let sql = 'SELECT * FROM tb_user WHERE cd_user = ?'
    conexao.query(sql,[[usuarios.cd_user]], (err,res,field)=>{
      if(!err){
        resultado =res[0]
        console.log(resultado)
      }

    })
    
    return(resultado)
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
     
    await conexao.query(sql,(err,res)=>{
      if(!err){
        resultado = res
        console.log(resultado)
      }
    })
    return(resultado)
  }
  
  catch(error){
    mensagem = error
  return(mensagem)
  }
}


async function updateUser(usuarios){
  try{
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
    
    
    await conexao.query(sql,valores)
    return(mensagem)
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
  }
}


export default {
          //crud usuario
          insertUser,
          readUser,
          readAllUser,
          updateUser,
          deleteUser,
          //crud 
             }