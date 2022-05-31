const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const funciones = require('../controllers/funciones')

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


router.get('/register', (req, res)=>{
    res.render('register', {alert:false})
})
//colocar en el req user el nombre mejorando le sentencia sql recordar
router.get('/ventas',authController.isAuthenticated, (req, res)=>{
    res.render('ventas',{user:req.user[0].Nombre,stockf:req.user[0].Stock,preciof:req.user[0].Precio})
})

router.get('/gerente',authController.isAuthenticatedG, (req, res)=>{
    res.render('gerente',{user:req.user.Nombre})
    console.log({user:req.user})
})

router.get('/admin',authController.isAuthenticatedA, (req, res)=>{
    res.render('admin',{user:req.user.Nombre})
    console.log({user:req.user})
    
})

router.get('/register',authController.isAuthenticatedA, (req, res)=>{
    res.render('register')
})

router.get('/registerGerente',authController.isAuthenticatedA, (req, res)=>{
    res.render('registerGerente')
})

//router para los controladores
router.post('/register', authController.register)
router.post('/registerGerente', authController.registerG)
router.post('/login', authController.login)
router.post('/loginGerente', authController.loginG)
router.post('/loginAdmin', authController.loginA)

router.get('/logout', authController.logout)

module.exports = router
