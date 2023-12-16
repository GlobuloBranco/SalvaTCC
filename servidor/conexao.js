import mysql from "mysql"
var conexao = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"x.isMyDog()==boolean",
    database: "adopet",
    port:"3306"
})

conexao.connect((err)=>{
    if(err){
        console.log("ocorreu um problema ",err)
    }
    
    })

export default conexao