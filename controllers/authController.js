const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')


//metodo de registro
exports.register = async (req, res)=>{
    try {
        const name = req.body.name
        const user = req.body.user
        const pass = req.body.pass
        const numtel = req.body.numero
        let passHash = await bcryptjs.hash(pass, 8)
        //console.log(passHash)
        conexion.query('INSERT INTO Usuario SET ?',{Mail:user,Nombre:name,Numero_tel:numtel,Clave:passHash}, (error, results)=>{
            if(error){console.log(error)}
            else{
                conexion.query('INSERT INTO Vendedor SET ?',{Mail:user})
            }
            res.redirect('/')
        })

    }catch(error){
        console.log(error)
    }
}
//metodo de loguin
exports.login = async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass
        console.log(user+"-"+pass)

        if(!user || !pass){
            res.render('login',{
                alert:true,
                alertTitle: 'Advertencia',
                alertMessage: 'Ingrese un correo y contraseña',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM Usuario as v,Vendedor WHERE v.Mail = ?', [user], async (error, results)=>{
                if(results.length == 0 || ! (await bcryptjs.compare(pass, results[0].Clave))){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
            
                }else{
                    //inicio de secion
                    const mail = results[0].Mail
                    const token = jwt.sign({id:mail}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JW_TIEMPO_EXPIRA
                    })
                    console.log("token: "+ token+" para el usuario: "+mail)
                    
                    const cookieOptions = {
                        expires: new Date(Date.now()+process.env.JW_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''    
                    })


                }
            })
        }

    } catch (error) {
        console.log(error)
    }

}