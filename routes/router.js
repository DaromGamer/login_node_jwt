const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

/*const conection = require('../database/db')*/
//router para las vistas
router.get('/', (req, res)=>{
    res.render('index')
    
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/loginAdmin', (req, res)=>{
    res.render('loginAdmin')
})
router.get('/loginGerente', (req, res)=>{
    res.render('loginGerente')
})


router.get('/register', (req, res)=>{
    res.render('register')
})

//router para los controladores
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router