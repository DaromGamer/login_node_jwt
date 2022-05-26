
const conexion = require('../database/db')
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
/*function stockf2() {
     probando2 = 1
     //probando2 = await conexion.query ('SELECT * FROM Vehiculos WHERE Modelo = ?', ["ford mustang"],{prepare: true})
     return probando2
}*/
function main() {
     const doQuery = (query) => {
         return new Promise((resolve, reject) => {
             con.query(query, (error, results, fields) => {
                 if(error) return reject(error);
                 console.log('Consulta correcta');
                 return resolve(results);
             });
         });
     }
 
     // si deseo utilizar el resultado de la consulta,
     // debo crear una función asíncrona y llamar a doQuery() usando await.
     const doStuffWithResults = async () => {
         const selectAllQuery = 'SELECT * FROM Vehiculos WHERE Modelo = "ford mustang"';
         const results = await doQuery(selectAllQuery);
         console.log(results);
         // Aquí puedes usar el resultado de tu consulta
     }
 
     // llamamos a nuestro método
     return doStuffWithResults();
 }

                     //SELECT u.Mail, u.Nombre FROM Vendedor as v, Usuario as u WHERE v.Mail = "ripazha.darom@gmail.com" and u.Mail = "ripazha.darom@gmail.com" esto es
                     //para lo del autentic
//resultset buscar
//const query = 'SELECT name, email, address FROM users WHERE id = ?';
//const result = await client.execute(query, [ id ], { prepare: true });


module.exports.elstock = main