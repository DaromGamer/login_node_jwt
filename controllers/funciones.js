
const conexion = require('../database/db')
const {promisify} = require('util')

function stockf() {
     probando = 0
     conexion.query ('SELECT * FROM Vehiculos WHERE Modelo = ?', ["ford mustang"], async (error, results)=>{
        console.log(results[0].Stock)
        probando = results[0].Stock
        return probando
        
    })
     return probando
}

module.exports.elstock = stockf
