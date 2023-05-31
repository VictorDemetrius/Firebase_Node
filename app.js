const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('./crud-37598-firebase-adminsdk-i1lz3-23d8486d74.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine" , "handlebars")

app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())

app.get("/", function(req,res){
    res.render("primeira_pagina")
})

app.get("/consulta", function(req,res){
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " +erro)
    })
})

app.post("/cadastrar", function(req, res){
    var dados = db.collection('projeto_firebase').add({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.data_contato,
        observacao: req.body.observacao
    })
        res.redirect("/")
        
    })

app.get("/excluir/:id", function(req,res){
    post.destroy({
        where: {'id': req.params.id},
        force: true
      }).then(function(){
        res.redirect("/consulta")
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " +erro)
    })
})


app.listen(8081, function(){
    console.log("Servidor Ativo!")
})
