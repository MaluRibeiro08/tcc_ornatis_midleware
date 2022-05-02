const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/contaAdministradora/cadastrarConta', (req, res)=>{

    // let {nome, cpf, dataNascimento, foto, email, senha, telefone, idSexo} = req.body;

    // console.log(req.body);
    // // res.send('INSERÇÃO');

    // const urlCadastrarCliente = 'http://localhost/Cuidador/Cliente/api/cliente';

    // axios.post(urlCadastrarCliente, 
    //     {
    //         nome : nome,
    //         cpf : cpf,
    //         dataNascimento : dataNascimento,
    //         foto : foto,
    //         email : email,
    //         senha : senha,
    //         telefone : telefone,
    //         idSexo : idSexo
    //     },
    //     {
    //         'content-type': 'application/json'
    //     }
    // ).then(function (response) {
        console.log(`chegou`);
        res.send('INSERÇÃO');
    //     console.log('INSERÇÃO');
    // })

});

// app.listen(3001, ()=>{
//     console.log('SERVIDOR RODANDO EM http://localhost:3001');
// });

