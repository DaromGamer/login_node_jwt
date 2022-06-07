const express = require('express')
const req = require('express/lib/request')
const { redirect } = require('express/lib/response')
const router = express.Router()

const authController = require('../controllers/authController')
const procesos = require('../controllers/procesos')
const administrar = require('../controllers/administrar')
const procegerente = require('../controllers/procegerente')

/*const conection = require('../database/db')*/
//router para las vistas
router.get('/', (req, res)=>{
    res.render('index')
    
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/loginAdmin', (req, res)=>{
    res.render('loginAdmin', {alert:false})
})
router.get('/loginGerente', (req, res)=>{
    res.render('loginGerente', {alert:false})
})

//colocar en el req user el nombre mejorando le sentencia sql recordar
router.get('/ventas',authController.isAuthenticated, (req, res)=>{

    res.render('ventas',{user:req.user[0].Nombre,stockf:req.user[1].Stock,preciof:req.user[1].Precio,stockc:req.user[0].Stock,precioc:req.user[0].Precio})
})

router.get('/gerente',authController.isAuthenticatedG, (req, res)=>{
    res.render('gerente',{user:req.user[0].Nombre,stockf:req.user[1].Stock,stockc:req.user[0].Stock})
    //console.log({user:req.user})
})

router.get('/admin',authController.isAuthenticatedA, (req, res)=>{
    res.render('admin',{user:req.user[0].Nombre,buscado:administrar.resultado})
    //console.log({user:req.user})
    
})

router.get('/register',authController.isAuthenticatedA, (req, res)=>{
    res.render('register')
})

router.get('/registerGerente',authController.isAuthenticatedA, (req, res)=>{
    res.render('registerGerente')
})

router.get('/confirmCompra',authController.isAuthenticated, (req,res)=>{
    compra = procesos.mensaje(procesos.cantf,procesos.cantc,req.user[1].Precio,req.user[0].Precio)
    res.render('confirmCompra',{cf:procesos.cantf,cc:procesos.cantc,pf:req.user[1].Precio,pc:req.user[0].Precio,total:compra})
})

router.get('/lista',authController.isAuthenticatedA, (req, res)=>{
    res.render('lista',{gerentes:administrar.gerentes,vendedores:administrar.vendedores})
})

router.get('/listVentas',authController.isAuthenticatedG, (req, res)=>{
    res.render('listVentas',{facturados:procegerente.listaventas,preciof:req.user[1].Precio,precioc:req.user[0].Precio})
})


//router para los controladores
router.post('/register', authController.register)
router.post('/registerGerente', authController.registerG)
router.post('/login', authController.login)
router.post('/loginGerente', authController.loginG)
router.post('/loginAdmin', authController.loginA)

router.post('/ventas',procesos.factura)
router.post('/confirmCompra',procesos.finalizarCompra)
router.post('/buscar',administrar.buscar)
router.post('/regventa',administrar.rv)
router.post('/reggerente',administrar.rg)
router.post('/lista',administrar.listar)
router.post("/mostrarventas",procegerente.buscarVentas)

router.get('/logout', authController.logout)

module.exports = router