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
app.set('port', process.env.PORT || 3000)
app.listen('port', ()=>{
    console.log(console.log('servidor en puerto' + app.get('port')))

})
