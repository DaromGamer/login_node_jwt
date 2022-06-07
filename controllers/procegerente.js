const conexion = require('../database/db')
const {promisify} = require('util')
const { redirect } = require('express/lib/response')

exports.buscarVentas = async (req, res)=>{
    try {
        conexion.query ('SELECT f.Id_factura, f.Modelo, f.Cantidad FROM Factura as f', (error, results)=>{
            exports.listaventas = results
        })
        res.redirect('/listVentas')
    } catch (error) {
        console.log(error)
    }
}