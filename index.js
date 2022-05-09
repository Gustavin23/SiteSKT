/* 
Estrutura de Back-end, onde iremos selecionar,
cadastrar, atualizar e deletar dados sobre os 
clientes, ou seja, criaremos um CRUD

CRUD 
    C -> Create: Quando cria-se dados no banco
    R -> Read: Quando lemos dados no banco
    U -> Update: Quando atualizamos dados no banco
    D -> Delete: Quando apagamos dados no banco

Vamos usar os verbos: GET, POST, PUT, DELETE, onde:
GET -> Read
POST -> Create
PUT -> Update
DELETE -> Delete

*/
// Importação do módulo express
const express = require('express'); 

// Importação do módulo do mongoose
const mongoose = require('mongoose');

const cors = require('cors');

// Criação do app referente ao express
const app = express();
app.use(cors())

// Preparar o servidor para receber json
app.use(express.json());

/* Caminho do banco de dados mongodb 
mongodb+srv://gustavord:<password>@cluster0.tkv9u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/
const urldb = "mongodb+srv://gustavord:Vilhena123@cluster0.tkv9u.mongodb.net/bancodedados?retryWrites=true&w=majority";
mongoose.connect(urldb, {useNewUrlParser: true,useUnifiedTopology: true});

// Definição do esquema de dados da tabela Schema
const tabela = mongoose.Schema({
    nome:{type:String,require},
    email:{type:String,require},
    telefone:{type:String}
});
const Cliente = mongoose.model("cliente",tabela);

// Definição de uma rota padrão
const default_route = "/api/cliente";

// Rota para listar os clientes com endpoint listar
app.get(`${default_route}/listar`,(req,res)=>{  
    Cliente.find().then((dados)=>{      
        res.status(200).send({output:dados});
    })
    .catch((erro)=>res.status(500).send({output:`Erro inteirno ao processar a consulta -> ${erro}`}));

});

// Rota para cadastrar os clientes com endpoint cadastrar
app.post(`${default_route}/cadastrar`,(req, res)=>{
    const cli = new Cliente(req.body);
    cli.save().then((dados)=>{
        res.status(201).send({output:`Cadastro realizado`, payload:dados})
    }).catch((erro) => console.error(`Erro ao tentar cadastrar: ${erro}`));

});

// Rota para atualizar os clientes com endpoint
/* Atualizar passagem de argumentos pela url com o
id do cliente*/
app.put(`${default_route}/atualizar/:id`,(req, res)=>{
    Cliente.findByIdAndUpdate(req.params.id,req.body,{new:true},(erro,dados)=>{
        if(erro){
            return res.status(500).send({output:`Não atualizou -> ${erro}`});
        }
        res.status(200).send({output:"Dados atualizados"})
    })
});

// Rota para apagar cliente com endpoint deletar    
app.delete(`${default_route}/apagar/:id`,(req, res)=>{
    Cliente.findByIdAndDelete(req.params.id,(erro,dados)=>{
        if(erro){return res.status(500).send({output:`Erro ao tentar apagar -> ${erro}`});
    }
    res.status(204).send({output:`Apagou`});
    });
});

// Definir a porta de comunicação do servidor
app.listen(5000,
    ()=>console.log("Servidor on-line em http://localhost:5000"));