const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv= require('dotenv');

const database= mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.cadastro = async (req, res) => {
    //console.log(req.body);

    // ! eu desconstrui os dados do formulario e coloquei eles em variaveis
    const { nome, email, senha, confirmaSenha, area_interesse}=req.body;

    database.query('SELECT email FROM usuario WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
        }

        
    // ! Validação para envio
        if(results.length > 0){
           //Se der maior que 0 já tem um email cadastrado
           return res.render('cadastro',{
            message: 'Email ou Senha Inválidos'
        });
        }else if (senha != confirmaSenha){
            return res.render('cadastro',{
                message: 'Senhas Não Coincidem'
            }) ; 
        }
        let hashedPassword = await bcrypt.hash(senha, 8);

        database.query('INSERT INTO usuario SET ?', {nome: nome, email:email, senha:hashedPassword, interesse:area_interesse}, (error, results) => {
            if(error){
                console.log(error);
            }else{
                return res.render('cadastro', {
                    message: 'Usuario Registrado'
                })
            }

            res.redirect('/login');
        });
    
    });
   
}

exports.login = async (req, res) => {
    const { email, senha}=req.body;

    database.query('SELECT senha FROM usuario WHERE email = ? ', [email] , async (error, result) =>{
        if(error){
            console.log(error)
        }
        var senhaJson=JSON.parse(JSON.stringify(result))
        
        var senhaBd=senhaJson[0]['senha']
        console.log(senhaBd)

        const senhaDescriptografada = await bcrypt.compare(senha, senhaBd);

        console.log(senhaDescriptografada)

        if(senhaDescriptografada)
        {
            res.redirect('/usuario');

        }
        else{
            return res.render('login', {
                message: 'Email ou Senha Invalidos'
            })
        }
    
        
    });
  

  };