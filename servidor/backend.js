import { error } from "console"
import mysql from "mysql"
var conexao = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database: "adopet"
})

// conexao.query('INSERT INTO [TABLE_NAME](NOMES DOS CAMPOS) VALUES(VALOREEEES) ')
// conexao.query('UPDATE [TABLE_NAME] SET [VARIAVEL = VALOR, VARIAVEL = VALOR] WHERE[condicao]')
// conexao.query('SELECT [COLUNA] FROM [TABLE_NAME] ')
// conexao.query('DELETE FROM [TABLE_NAME] WHERE[Condicao] ')

export async function insertUser(usuarios){
  try{
    let colunas = 'tb_user (nm_user, cpf_user, cidade_user, email_user, senha_user, sexo_user)',mensagem= "Sucesso"
    let insercao = `${usuarios.nm_user},${usuarios.cpf_user},${usuarios.cidade_user},${usuarios.email_user},${usuarios.senha_user},${usuarios.sexo_user}`
    console.log(conexao)
    
    conexao.connect()
    console.log(conexao)
    await conexao.query(`INSERT INTO ${campos} VALUES(${insercao})`)
    conexao.end();
    return(mensagem)
  }
  
  catch(error){
    mensagem = error
    if(conexao){
      await conexao.end();
    }
  return(mensagem)
  }
}


export async function updateUser(usuarios){
  try{
      var pk 
    if("cd_user" in usuarios && (usuarios.cd_user)){
      pk = ` WHERE ${usuarios.cd_user}`
      delete usuarios.cd_user
    }
    
    else{
      return("DIGITE O CODIGO DO CLIENTE")      
    }
    let sql =`UPDATE tb_user SET ` 
    let valores = []
    for(var key in usuarios){
      sql+= key + " = ?,"
      valores.push(usuarios[key])
    }
    sql.slice(0,-2)
    sql += pk
    
    
    conexao.connect()
    await conexao.query(sql,valores,()=>{
      if (error) throw error
    })
    conexao.end();
    return(mensagem)
  }
  
  catch(error){
    mensagem = error
    if(conexao){
      await conexao.end();
    }
  return(mensagem)
  }
}

