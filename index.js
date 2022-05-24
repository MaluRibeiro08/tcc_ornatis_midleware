const express = require('express');
const { send } = require('express/lib/response');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//FUNCOES
    const getDados_funcionamento = (obj_dados_funcionamento) =>
    {
        // console.log(response.data.data.dados_funcionamento[6]);
        let arr_dados_funcionamento = [];

        let contador = 1;
        while (contador <= 7)
        {
            if(obj_dados_funcionamento[contador]=== undefined)
            {
                arr_dados_funcionamento.push(null)
            }
            else
            {
                // console.log("dia"+ contador + " é definido")
                arr_dados_funcionamento.push(obj_dados_funcionamento[contador])
            }
            contador = contador + 1;
        }
        // console.log(arr_dados_funcionamento);
        console.log(arr_dados_funcionamento);
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
                    // console.log("teste");
                    // console.log(response.data.data);
                    const dados_conta_adm_api = response.data.data;

                    const taxa_unica = dados_conta_adm_api.taxa_cancelamento_empresa.taxa_unica_cancelamento;
                    let taxas_personalizadas = null;

                    // const arr = getDados_funcionamento(dados_conta_adm_api.dados_funcionamento);
                    const arr = Object.values(dados_conta_adm_api.dados_funcionamento);
                    // console.log(arr[0][0])
                    // console.log(arr[0])
                    if(taxa_unica === undefined)
                    {
                        taxas_personalizadas = Object.values(dados_conta_adm_api.taxa_cancelamento_empresa);
                        console.log(taxas_personalizadas);
                    }                 
                    const contaAdministradora = 
                    {
                            
                        nome_fantasia: dados_conta_adm_api.dados_empresa[0].nome_fantasia,
                        cnpj: dados_conta_adm_api.dados_empresa[0].cnpj,
                        telefone: dados_conta_adm_api.dados_empresa[0].telefone,
                        biografia: dados_conta_adm_api.dados_empresa[0].biografia,
                        intervalo_tempo_padrao_entre_servicos: dados_conta_adm_api.dados_empresa[0].intervalo_tempo_padrao_entre_servicos,
                        taxa_unica_cancelamento: dados_conta_adm_api.dados_empresa[0].taxa_unica_cancelamento,
                        imagem_perfil: dados_conta_adm_api.dados_empresa[0].imagem_perfil,
                        nome_usuario_instagram: dados_conta_adm_api.dados_empresa[0].nome_usuario_instagram,
                        link_facebook: dados_conta_adm_api.dados_empresa[0].link_facebook,
                        cep: dados_conta_adm_api.dados_endereco_empresa[0].cep,
                        bairro: dados_conta_adm_api.dados_endereco_empresa[0].bairro,
                        rua: dados_conta_adm_api.dados_endereco_empresa[0].rua,
                        numero_rua: dados_conta_adm_api.dados_endereco_empresa[0].numero,
                        complemento: dados_conta_adm_api.dados_endereco_empresa[0].complemento,
                        id_cidade: dados_conta_adm_api.dados_endereco_empresa[0].id_cidade,
                        nome_cidade: dados_conta_adm_api.dados_endereco_empresa[0].nome_cidade,
                        nome_estado: dados_conta_adm_api.dados_endereco_empresa[0].nome_estado,
                        sigla_estado: dados_conta_adm_api.dados_endereco_empresa[0].sigla_estado,

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

    //LISTAGEM
        app.get('/contaAdministradora/listarFuncionarios/:id_empresa', (req, res)=>{
                
            // console.log(req.params);
            let id_empresa = req.params.id_empresa;
            console.log(id_empresa);

            const urlListagemDadosListarFuncionarios = `http://localhost/tcc_ornatis_back-end/api-ornatis/rotas/adm/funcionario/?id_empresa=${id_empresa}&acao=listarFuncionarios`;

            axios.get(urlListagemDadosListarFuncionarios, res).then
            (
                function (response) 
                {
                    // console.log(response.data.data);

                    res.send(response.data.data);
                }
            )
        });

    //DELECAO
        app.delete('/contaAdministradora/desabilitarFuncionario/:id_funcionario', (req, res)=>{
                

            // console.log(req.params);
            let id_funcionario = req.params.id_funcionario;
            // console.log(id_empresa);

            const urlDeletarFuncionario = `http://localhost/tcc_ornatis_back-end/api-ornatis/rotas/adm/funcionario/?id_funcionario=${id_funcionario}&acao=desabilitarFuncionario`;

            console.log(urlDeletarFuncionario);
          

            axios.delete(urlDeletarFuncionario, req.body, {'content-type': 'application/json'}).then
            (
                function (response) 
                {
                    // res.statusCode = 200;
                    res.send(response.data);
                    console.log(response.data);
                }
            )
        });


// ADM - SERVICO
    //CADASTRO
        app.post('/contaAdministradora/cadastrarServico', (req, res)=>{
                        
            console.log(req.body);
        });

    //LISTAGEM
        app.get('/contaAdministradora/listarServicos/:id_empresa', (req, res)=>{
                
            // console.log(req.params);
            let id_empresa = req.params.id_empresa;
            console.log("vamos listar os servicos da empresa " + id_empresa);

            const urlListagemServicos = `http://localhost/tcc_ornatis_back-end/api-ornatis/rotas/adm/servico/?id_empresa=${id_empresa}&acao=listarServicosPorEmpresa`;

            axios.get(urlListagemServicos, res).then
            (
                function (response) 
                {
                    console.log(response.data);
                    res.send(response.data.data);
                }
            )
        });

    //DELECAO
        app.delete('/contaAdministradora/desabilitarServico/:id_servico', (req, res)=>{
                
            console.log(req.params);
            let id_servico = req.params.id_servico;
            console.log(id_servico);

            const urlDeletarServico = `http://localhost/tcc_ornatis_back-end/api-ornatis/rotas/adm/servico/?id_servico=${id_servico}&acao=desabilitarServico`;

            axios.delete(urlDeletarServico, req.body, {'content-type': 'application/json'}).then
            (
                function (response) 
                {
                    // res.statusCode = 200;
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

