import mysql from "mysql"
var conexao = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database: "adopet"
})

// conexao.query('INSERT INTO [TABLE_NAME](NOMES DOS CAMPOS) VALUES(VALOREEEES) ')
// conexao.query('DELETE FROM [TABLE_NAME] WHERE[Condicao] ')
// conexao.query('UPDATE [TABLE_NAME] SET [VARIAVEL = VALOR, VARIAVEL = VALOR] WHERE[condicao]')
// conexao.query('SELECT [COLUNA] FROM [TABLE_NAME] ')

async function insertUser(usuarios)
conexao.connect()
let campos = 'tb_user (nm_user, cpf_user, cidade_user, email_user, senha_user, sexo_user)'
let isercao usuarios
connection.query(`INSERT INTO ${campos} VALUES(${})`,
 (err, rows, fields)=> {
    if (err) throw err;
    
  });
  
  connection.end();