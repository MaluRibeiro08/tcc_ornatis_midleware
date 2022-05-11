const express = require('express');
const { send } = require('express/lib/response');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//funcoes
const getDados_funcionamento = (obj_dados_funcionamento) =>
{
    // console.log(response.data.data.dados_funcionamento[6]);
    let arr_dados_funcionamento = [];

    let contador = 1;
    while (contador <= 7)
    {
        if(obj_dados_funcionamento[contador]=== undefined)
        {
            arr_dados_funcionamento.push('')
        }
        else
        {
            // console.log("dia"+ contador + " é definido")
            arr_dados_funcionamento.push(obj_dados_funcionamento[contador])
        }
        contador = contador + 1;
    }
    // console.log(arr_dados_funcionamento);
    return arr_dados_funcionamento;
}

const getTaxas_cancelamento = (obj_taxas_cancelamento) =>
{
    // console.log(response.data.data.dados_funcionamento[6]);
    let arr_taxas_cancelamentos = [];

    let contador = 1;
    while (contador <= tamanh_array_taxas)
    {
        if(obj_taxas_cancelamento[contador]=== undefined)
        {
            arr_taxas_cancelamentos.push('')
        }
        else
        {
            // console.log("dia"+ contador + " é definido")
            arr_taxas_cancelamentos.push(obj_taxas_cancelamento[contador])
        }
        contador = contador + 1;
    }
    // console.log(arr_taxas_cancelamentos);
    return arr_taxas_cancelamentos;
}

const getDados_pagamento = (obj_dados_pagamento) =>
{
    // console.log(response.data.data.dados_funcionamento[6]);
    let arr_dados_pagamento = [];

    let contador = 1;
    while (contador <= 6)
    {
        if(obj_dados_pagamento[contador]=== undefined)
        {
            // console.log("forma"+ contador + " é indefinido")
            // arr_dados_pagamento.push('')
        }
        else
        {
            // console.log("forma"+ contador + " é definido")
            arr_dados_pagamento.push(contador.toFixed())
        }
        contador = contador + 1;
    }
    // console.log(arr_dados_pagamento);
    return arr_dados_pagamento;
}


// ADM - CONTA_ADM
    //CADASTRO
        app.post('/contaAdministradora/cadastrarConta', (req, res)=>{
            
            console.log(req.body);

            const urlCadastrarEmpresa = 'http://localhost/tcc_ornatis_back-end/api-ornatis/rotas/adm/contaAdministradora/';

            axios.post(urlCadastrarEmpresa, req.body, {'content-type': 'application/json'}).then
            (
                function (response) 
                {
                    res.statusCode = 200;
                    res.send(response.data);
                    console.log(response.data);
                }
            )
        });

    //LISTAGEM DE PERFIL
        app.get('/contaAdministradora/listarPerfil/:id_empresa', (req, res)=>{
            
            // console.log(req.params);
            let id_empresa = req.params.id_empresa;
            // console.log(id_empresa);

            const urlListagemDadosPerfil = `http://localhost/tcc_ornatis_back-end/api-ornatis/rotas/adm/contaAdministradora/?id_empresa=${id_empresa}&acao=carregarPerfil`;

            console.log(urlListagemDadosPerfil);
            axios.get(urlListagemDadosPerfil, res).then
            (
                function (response) 
                {
                    console.log("teste");
                    console.log(response.data.data);
                    const dados_conta_adm_api = response.data.data;

                    const taxa_unica = dados_conta_adm_api.taxa_cancelamento_empresa.taxa_unica_cancelamento;
                    let taxas_personalizadas = null;
                    if(taxa_unica === undefined)
                    {
                        taxas_personalizadas = Object.values(dados_conta_adm_api.taxa_cancelamento_empresa);
                    }                 
                    const contaAdministradora = 
                    {
                            
                            nome_fantasia: 'teste 1005',
                            cnpj: '23456789765432',
                            telefone: '12345678654321',
                            biografia: 'Biografia 1005',
                            intervalo_tempo_padrao_entre_servicos: 15,
                            taxa_unica_cancelamento: 12,
                            imagem_perfil: null,
                            nome_usuario_instagram: null,
                            link_facebook: null,
                            cep: '12345678',
                            bairro: 'SPairro 1005',
                            rua: 'Rua 1005',
                            numero: '12',
                            complemento: 'Complemento 1',
                            id_cidade: 3510609,
                            nome_cidade: 'Carapicuíba',
                            nome_estado: 'São Paulo',
                            sigla_estado: 'SP',

                          dados_funcionamento: getDados_funcionamento(dados_conta_adm_api.dados_funcionamento),
                          dados_formas_pagamento: getDados_pagamento(dados_conta_adm_api.dados_pagamento.formas_aceitas),
                          observacoes_pagamento: dados_conta_adm_api.dados_pagamento.observacoes_pagamento,
                          taxa_unica_cancelamento: taxa_unica,
                          dados_taxa_cancelamento: taxas_personalizadas,
                        
                        }


                   
                    res.send(contaAdministradora);
                    // console.log(response.data.data);
                }
            )
        });

// ADM - FUNCIONARIO
    //CADASTRO
        app.post('/contaAdministradora/cadastroFuncionario', (req, res)=>{
                    
            console.log(req.body);

            const urlCadastrarFuncionario = 'http://localhost/tcc_ornatis_back-end/api-ornatis/rotas/adm/funcionario/';

            axios.post(urlCadastrarFuncionario, req.body, {'content-type': 'application/json'}).then
            (
                function (response) 
                {
                    res.statusCode = 200;
                    res.send(response.data);
                    console.log(response.data);
                }
            )
        });


// EXEMPLO PROFESSOR
    app.post('/cliente/cadastrarcliente', (req, res)=>{

        let {nome, cpf, dataNascimento, foto, email, senha, telefone, idSexo} = req.body;

        console.log(req.body);
        // res.send('INSERÇÃO');

        const urlCadastrarCliente = 'http://localhost/Cuidador/Cliente/api/cliente';

        axios.post(urlCadastrarCliente, 
            {
                nome : nome,
                cpf : cpf,
                dataNascimento : dataNascimento,
                foto : foto,
                email : email,
                senha : senha,
                telefone : telefone,
                idSexo : idSexo
            },
            {
                'content-type': 'application/json'
            }
        ).then(function (response) {
            res.send('INSERÇÃO');
            console.log('INSERÇÃO');
        })

    });


// PORTA A SER ESCUTADA
    app.listen(3001, ()=>{
        console.log('SERVIDOR RODANDO EM http://localhost:3001');
    });

