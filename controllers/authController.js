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
            res.redirect('/admin')
        })

    }catch(error){
        console.log(error)
    }
}//----------------------------------------------------------------------------------------------------------------------

exports.registerG = async (req, res)=>{
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
                conexion.query('INSERT INTO Gerente SET ?',{Mail:user})
            }
            res.redirect('/admin')
        })

    }catch(error){
        console.log(error)
    }
}//-------------------------------------------------------------------------------------------------------------------

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
                        ruta: 'ventas'    
                    })


                }
            })
        }

    } catch (error) {
        console.log(error)
    }

}//-----------------------------------------------------------------------------------------------------------------------

exports.loginG = async (req, res)=>{
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
                ruta: 'loginGerente'
            })
        }else{
            conexion.query('SELECT * FROM Usuario as g,Gerente WHERE g.Mail = ?', [user], async (error, results)=>{
                if(results.length == 0 || ! (await bcryptjs.compare(pass, results[0].Clave))){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'loginGerente'    
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
                        ruta: 'gerente'    
                    })

                }
            })
        }

    } catch (error) {
        console.log(error)
    }

}//---------------------------------------------------------------------------------------------

exports.loginA = async (req, res)=>{
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
                ruta: 'loginAdmin'
            })
        }else{
            conexion.query('SELECT * FROM Usuario as a,Administrador WHERE a.Mail = ?', [user], async (error, results)=>{
                if(results.length == 0 || ! (await bcryptjs.compare(pass, results[0].Clave))){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'loginAdmin'    
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
                        ruta: 'admin'    
                    })

                }
            })
        }
    } catch (error) {
        console.log(error)
    }

}//-----------------------------------------------------------------------------------------------------------------------

//no termino de entender todo lo relacionado a 'next' pero funciona, recordar

exports.isAuthenticated = async (req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decodificada2 = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)

            conexion.query ('SELECT * FROM Usuario as v,Vendedor WHERE v.Mail = ?', [decodificada2.id], (error, results)=>{
                console.log(results)
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/')
    }
}//---------------------------------------------------------------------------------------------------------------

exports.isAuthenticatedG = async (req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decodificada3 = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            
            conexion.query ('SELECT * FROM Usuario as g,Gerente WHERE g.Mail = ?', [decodificada3.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/')
    }
}//------------------------------------------------------------------------------------------------------------------

exports.isAuthenticatedA = async (req, res, next)=>{
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            
            conexion.query ('SELECT * FROM Usuario as a,Administrador WHERE a.Mail = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                console.log("1 " results)
                req.user = results[0]
                console.log(req.user)
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/')
    }
}
exports.logout = (req, res)=>{
    res.clearCookie('jwt')
    return res.redirect('/')
}
