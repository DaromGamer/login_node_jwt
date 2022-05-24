
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
     conexion.query ('SELECT * FROM Vehiculos WHERE Modelo = ?', ["ford mustang"],function(err, rows, fields) {
    if (err) throw err;
    probando2 = row[0].Stock
    return probando
     }
}


module.exports.elstock = stockf2
