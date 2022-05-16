const express = require('express')
const dotenv  = require('dotenv')
const cookieParser = require('cookie-parser')
const { path } = require('express/lib/application')

const app = express()

//motor de plantillas
app.set('view engine','ejs')

//carpeta para archivos estaticos
app.use(express.static('public'))

//para procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//seteamos las variables de entorno
dotenv.config({path: './env/.env'})

//para poder trabajar con las cookies
app.use(cookieParser())

app.use('/', require('./routes/router'))

/*app.get('/', (req, res)=>{
    res.render('index')
})*/
<<<<<<< HEAD
//hola
app.listen(4000, ()=>{
    console.log('SERVER UP runnung in http://localhost:4000')
=======

app.listen(process.env.PORT || 3001, '0.0.0.0', ()=>{
    console.log('servidor en puerto ' + app.get('port'))
>>>>>>> d2629db4a6e936769d1e22c1a63a773fa62501b3

})
