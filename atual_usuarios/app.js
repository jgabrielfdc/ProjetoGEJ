// Eu usei a extensão do Better Commands pra organizar algumas coisas, recomendo utilizar
const express = require("express");
const path = require('path');
const mysql=require("mysql");
const dotenv= require('dotenv');

dotenv.config({path:'./.env'})//? Conecta env


const app = express();

const database= mysql.createConnection({
    host: process.env.DATABASE_HOST,// TODO: Tem que mudar dps pro ip do site
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public');
//console.log(__dirname)

app.use(express.static(publicDirectory))

//Traduz corpos de url codificados
app.use(express.urlencoded({ extended: false}));
// Traduz documentos Json
app.use(express.json());

app.set('view engine', 'hbs')

// * Verificação de Conexão com o Mysql
database.connect( (error) => {
    if(error){
        console.log(error)
    }else{
        console.log("Conexão Efetivada...")
    }
} )

// * Definindo Rotas
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(2020, () => {
    console.log("Server Iniciado na porta 2020");
})