const conexion = require('../database/db')
const {promisify} = require('util')
const req = require('express/lib/request')
const res = require('express/lib/response')
const { redirect } = require('express/lib/response')

let cantidadford
let cantidadcorvete

exports.factura = async (req, res)=>{
    try {
        cantidadford = req.body.cantidadFord
        cantidadcorvete = req.body.cantidadCorvete
        if(cantidadford>0 || cantidadcorvete>0){
            exports.cantf = cantidadford
            exports.cantc = cantidadcorvete
            res.redirect('/confirmCompra')
        }
        else{
            //console.log("no")
            cantidadford = 0
            cantidadcorvete = 0
            res.redirect('/ventas')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/ventas')
    }
}
exports.mensaje = function(cf, cc, pf, pc){
    let mensaje
    let total
    if(cf>0){
        //mensaje = "ford mustang x " + cf + "        " + (cf*pf)+"\n"
        total = cf*pf
    }
    if(cc>0){
        //mensaje += "corvete x " + cc + "        " + (cc*pc)+"\n"
        total += cc*pc
    }
    if(cf>0 || cc>0){
        mensaje = "EL total de su compra es: " + total
    }
    else{
        mensaje = "no selecciono nada para comprar"
    }
    return mensaje
}

exports.finalizarCompra= async function(req, res){
    try {
        cf = cantidadford
        cc = cantidadcorvete
        
        conexion.query ('SELECT * FROM Factura', (error, results)=>{
            if(results != ""){
                id_usable = parseInt(results[results.length-1].Id_factura) + 1
                if(cf>0){
                    conexion.query('INSERT INTO Factura SET ?',{Id_factura:id_usable,Modelo:"ford mustang",Cantidad:cf,id_Vendedor:1,Rut:1}, (error, results)=>{
                        if(error){console.log(error)}
                        else{
                            exports.cantf = 0
                        }
                    })
                }
                if (cc>0){
                    conexion.query('INSERT INTO Factura SET ?',{Id_factura:id_usable,Modelo:"corvete",Cantidad:cc,id_Vendedor:1,Rut:1}, (error, results)=>{
                        if(error){console.log(error)}
                        else{
                            exports.cantc = 0
                        }
                    })
                }
                //res.redirect('/ventas')
                res.render('login', {
                    alert: true,
                    alertTitle: "Venta exitosa",
                    alertMessage: "¡Se ha guardado su venta!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 8000,
                    ruta: 'ventas'    
                })
                console.log("F")
            }
            else{
                //
                if(cf>0){
                    conexion.query('INSERT INTO Factura SET ?',{Id_factura:1,Modelo:"ford mustang",Cantidad:cf,id_Vendedor:1,Rut:1}, (error, results)=>{
                        if(error){console.log(error)}
                        else{
                            exports.cantf = 0
                        }
                    })
                }
                if (cc>0){
                    conexion.query('INSERT INTO Factura SET ?',{Id_factura:1,Modelo:"corvete",Cantidad:cc,id_Vendedor:1,Rut:1}, (error, results)=>{
                        if(error){console.log(error)}
                        else{
                            exports.cantc = 0
                        }
                    })
                }
                //res.redirect('/ventas')
                res.render('login', {
                    alert: true,
                    alertTitle: "Venta exitosa",
                    alertMessage: "¡Se ha guardado su venta!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 8000,
                    ruta: 'ventas'    
                })               
            }
        })

    } catch (error) {
        console.log(error)
    }
}