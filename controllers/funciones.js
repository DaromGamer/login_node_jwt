
/*const conexion = require('../database/db')
const {promisify} = require('util')

function stockf() {
     probando = 2
     conexion.query ('SELECT * FROM Vehiculos WHERE Modelo = ?', ["ford mustang"], async (error, results)=>{
        console.log(results[0].Stock)
        probando = results[0].Stock
        return probando
        
    })
     return probando
}
function stockf2() {
     probando2 = 1
     //probando2 = await conexion.query ('SELECT * FROM Vehiculos WHERE Modelo = ?', ["ford mustang"],{prepare: true})
     conexion.query("SELECT * FROM Vehiculos WHERE Modelo = 'ford mustang'", function (err, result, fields){
          if(err) {
            throw err;
          } else {
            probando2 = result[0].Stock
          }
        });
     return probando2
}


                     //SELECT u.Mail, u.Nombre FROM Vendedor as v, Usuario as u WHERE v.Mail = "ripazha.darom@gmail.com" and u.Mail = "ripazha.darom@gmail.com" esto es
                     //para lo del autentic
//resultset buscar
//const query = 'SELECT name, email, address FROM users WHERE id = ?';
//const result = await client.execute(query, [ id ], { prepare: true });


module.exports.elstock = stockf2*/

//aqui mi intento por lograr colocar un resultado de una consulta sql en una variable global, vamos me rendi pero encontre otra forma de hacer lo que queria
//me duele el orgullo pero almenos puedo dormir
