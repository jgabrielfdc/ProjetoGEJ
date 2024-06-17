const express = require('express');

const router = express.Router();

// ! Redirecionamento das páginas

router.get("/", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('index');
});

router.get("/materiais", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('materiais');
});

router.get("/suporte", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('suporte');
});

router.get("/login", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('login');
});

router.get("/cadastro", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('cadastro');
});

router.get("/sql", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('sql');
});

router.get("/usuario", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('usuario');
});

router.get("/html", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('html');
});

router.get("/intro", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('intro');
});
router.get("/equipe", (req, res) => {
    //res.send("<h2>Home Page</h2>")
    res.render('equipe');
});

module.exports= router;

// ! Fim dos redirecionamentos