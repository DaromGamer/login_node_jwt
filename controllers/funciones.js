
const conexion = require('../database/db')
const {promisify} = require('util')

function stockf() {
     probando = 0
     conexion.query ('SELECT * FROM Vehiculos WHERE Modelo = ?', ["ford mustang"], async (error, results)=>{
        console.log(results[0].Stock)
        const probando = results[0].Stock
        return probando
        
    })
     return probando
}
function stockf2() {
     const probando = 1
     conexion.query ('SELECT * FROM Vehiculos WHERE Modelo = ?', ["ford mustang"],(prepare: true) {
    if (err) throw err;
    probando2 = row[0].Stock
    return probando
     })
}
                     //SELECT u.Mail, u.Nombre FROM Vendedor as v, Usuario as u WHERE v.Mail = "ripazha.darom@gmail.com" and u.Mail = "ripazha.darom@gmail.com" esto es
                     //para lo del autentic


module.exports.elstock = stockf2
