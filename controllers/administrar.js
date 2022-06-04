const conexion = require('../database/db')
const {promisify} = require('util')

exports.resultado = ""

exports.buscar = async (req, res)=>{
    try {
        mailb = req.body.user1 
        conexion.query ('SELECT u.Mail,u.Nombre FROM Usuario as u,Gerente as g WHERE u.Mail = g.Mail and g.Mail=?',[mailb] , (error, results)=>{
            if (results.length > 0){
                exports.resultado = "mail: " + results[0].Mail +", Nombre: "+ results[0].Nombre+", tipo: Gerente"
                res.redirect('/admin')
            }
            else{
                conexion.query ('SELECT u.Mail,u.Nombre FROM Usuario as u,Vendedor as v WHERE u.Mail = v.Mail and v.Mail=?',[mailb] , (error1, results1)=>{
                    if (results1.length > 0){
                        exports.resultado = "mail: " + results1[0].Mail +", Nombre: "+ results1[0].Nombre+", tipo: Vendedor"
                        res.redirect('/admin')
                    }
                    else{
                        exports.resultado = "no se encontro resultado"
                        res.redirect('/admin')
                    }  
                })
            }
            
        })
    } catch (error) {
        console.log(error)
    }
}
//'SELECT u.Mail,u.Nombre FROM Usuario as u,Gerente as g WHERE u.Mail = g.Mail '
exports.rg = async (req, res)=>{
    res.redirect('/registerGerente')
}
exports.rv = async (req, res)=>{ vf
    res.redirect('/register')
}



exports.listar = async (req, res)=>{
    try {
        conexion.query ('SELECT u.Mail,u.Nombre FROM Usuario as u,Gerente as g WHERE u.Mail = g.Mail', (error, results)=>{
            exports.gerentes = results
        })
        conexion.query ('SELECT u.Mail,u.Nombre FROM Usuario as u,Vendedor as v WHERE u.Mail = v.Mail', (error, results1)=>{
            exports.vendedores = results1
        })
        res.redirect('/lista')

    } catch (error) {
        console.log(error)
    }
}