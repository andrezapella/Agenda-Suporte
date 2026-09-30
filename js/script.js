
let funcionarios =
    JSON.parse(
        localStorage.getItem("funcionarios")
    ) || [];


let atividades =
    JSON.parse(
        localStorage.getItem("atividades")
    ) || [];


let agendamentos =
    JSON.parse(
        localStorage.getItem("agendamentos")
    ) || [];


let configuracoes =
    JSON.parse(
        localStorage.getItem("configuracoes")
    ) || {

        tema: "claro",

        cor: "#2563eb"

    };


let dataAtual =
    new Date();


document.addEventListener(
    "DOMContentLoaded",
    function() {

        aplicarConfiguracoes();

        atualizarTudo();

    }
);


function atualizarTudo() {

    atualizarSelects();

    renderizarCalendario();

    renderizarFuncionarios();

    renderizarAtividades();

    atualizarCards();

}


function salvarDados() {

    localStorage.setItem(
        "funcionarios",
        JSON.stringify(funcionarios)
    );


    localStorage.setItem(
        "atividades",
        JSON.stringify(atividades)
    );


    localStorage.setItem(
        "agendamentos",
        JSON.stringify(agendamentos)
    );

}


function abrirFuncionario() {

    document
        .getElementById("modalFuncionario")
        .classList.add("aberto");

}


function salvarFuncionario() {

    const nome =
        document
            .getElementById("nomeFuncionario")
            .value
            .trim();


    const cor =
        document
            .getElementById("corFuncionario")
            .value;


    if (!nome) {

        alert(
            "Digite o nome do funcionário."
        );

        return;

    }


    funcionarios.push({

        id:
            Date.now(),

        nome:
            nome,

        cor:
            cor

    });


    salvarDados();


    document
        .getElementById("nomeFuncionario")
        .value = "";


    fecharModais();


    atualizarTudo();

}


function abrirAtividade() {

    document
        .getElementById("modalAtividade")
        .classList.add("aberto");

}


function salvarAtividade() {

    const nome =
        document
            .getElementById("nomeAtividade")
            .value
            .trim();


    const cor =
        document
            .getElementById("corAtividade")
            .value;


    if (!nome) {

        alert(
            "Digite o nome da atividade."
        );

        return;

    }


    atividades.push({

        id:
            Date.now(),

        nome:
            nome,

        cor:
            cor

    });


    salvarDados();


    document
        .getElementById("nomeAtividade")
        .value = "";


    fecharModais();


    atualizarTudo();

}


function atualizarSelects() {

    const funcionario =
        document.getElementById(
            "funcionarioAgenda"
        );


    const atividade =
        document.getElementById(
            "atividadeAgenda"
        );


    const filtroFuncionario =
        document.getElementById(
            "filtroFuncionario"
        );


    const filtroAtividade =
        document.getElementById(
            "filtroAtividade"
        );


    funcionario.innerHTML = "";

    atividade.innerHTML = "";

    filtroFuncionario.innerHTML =
        `<option value="">
            Todos os funcionários
        </option>`;

    filtroAtividade.innerHTML =
        `<option value="">
            Todas as atividades
        </option>`;


    funcionarios.forEach(
        function(f) {

            funcionario.innerHTML +=
                `<option value="${f.id}">
                    ${f.nome}
                </option>`;


            filtroFuncionario.innerHTML +=
                `<option value="${f.id}">
                    ${f.nome}
                </option>`;

        }
    );


    atividades.forEach(
        function(a) {

            atividade.innerHTML +=
                `<option value="${a.id}">
                    ${a.nome}
                </option>`;


            filtroAtividade.innerHTML +=
                `<option value="${a.id}">
                    ${a.nome}
                </option>`;

        }
    );

}


function abrirAgenda(data = null) {

    if (
        funcionarios.length === 0 ||
        atividades.length === 0
    ) {

        alert(
            "Primeiro cadastre pelo menos um funcionário e uma atividade."
        );

        return;

    }


    atualizarSelects();


    document
        .getElementById("idAgendamento")
        .value = "";


    document
        .getElementById("tituloAgenda")
        .textContent =
        "Nova atividade";


    document
        .getElementById("descricaoAgenda")
        .value = "";


    if (data) {

        document
            .getElementById("dataAgenda")
            .value = data;

    }
    else {

        document
            .getElementById("dataAgenda")
            .value =
            formatarDataInput(
                new Date()
            );

    }


    document
        .getElementById("modalAgenda")
        .classList.add("aberto");

}


function salvarAgendamento() {

    const id =
        document
            .getElementById(
                "idAgendamento"
            )
            .value;


    const data =
        document
            .getElementById(
                "dataAgenda"
            )
            .value;


    const funcionarioId =
        Number(
            document
                .getElementById(
                    "funcionarioAgenda"
                )
                .value
        );


    const atividadeId =
        Number(
            document
                .getElementById(
                    "atividadeAgenda"
                )
                .value
        );


    const descricao =
        document
            .getElementById(
                "descricaoAgenda"
            )
            .value
            .trim();


    if (!data) {

        alert(
            "Informe a data."
        );

        return;

    }


    if (!funcionarioId) {

        alert(
            "Selecione o funcionário."
        );

        return;

    }


    if (!atividadeId) {

        alert(
            "Selecione a atividade."
        );

        return;

    }


    if (id) {

        const evento =
            agendamentos.find(
                function(a) {

                    return a.id ==
                        Number(id);

                }
            );


        if (evento) {

            evento.data =
                data;

            evento.funcionarioId =
                funcionarioId;

            evento.atividadeId =
                atividadeId;

            evento.descricao =
                descricao;

        }

    }
    else {

        agendamentos.push({

            id:
                Date.now(),

            data:
                data,

            funcionarioId:
                funcionarioId,

            atividadeId:
                atividadeId,

            descricao:
                descricao

        });

    }


    salvarDados();

    fecharModais();

    atualizarTudo();

}


function renderizarCalendario() {

    const grade =
        document.getElementById(
            "gradeCalendario"
        );


    grade.innerHTML = "";


    const ano =
        dataAtual.getFullYear();


    const mes =
        dataAtual.getMonth();


    const primeiroDia =
        new Date(
            ano,
            mes,
            1
        ).getDay();


    const quantidadeDias =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();


    document
        .getElementById("mesAno")
        .textContent =
        dataAtual.toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );


    /* Espaços antes do primeiro dia */

    for (
        let i = 0;
        i < primeiroDia;
        i++
    ) {

        const vazio =
            document.createElement("div");


        vazio.className =
            "dia dia-vazio";


        grade.appendChild(vazio);

    }


    const hoje =
        new Date();


    /* Criar dias */

    for (
        let dia = 1;
        dia <= quantidadeDias;
        dia++
    ) {

        const elemento =
            document.createElement("div");


        elemento.className =
            "dia";


        const numero =
            document.createElement("div");


        numero.className =
            "numero";


        numero.textContent =
            dia;


        if (

            dia === hoje.getDate() &&

            mes === hoje.getMonth() &&

            ano === hoje.getFullYear()

        ) {

            numero.classList.add("hoje");

        }


        elemento.appendChild(
            numero
        );


        /* Botão + */

        const botao =
            document.createElement(
                "button"
            );


        botao.className =
            "adicionar-dia";


        botao.textContent =
            "+";


        botao.title =
            "Adicionar atividade";


        botao.onclick =
            function() {

                abrirAgenda(
                    criarData(
                        ano,
                        mes,
                        dia
                    )
                );

            };


        elemento.appendChild(
            botao
        );


        const data =
            criarData(
                ano,
                mes,
                dia
            );


        let eventos =
            agendamentos.filter(
                function(evento) {

                    return evento.data ===
                        data;

                }
            );


        /* Filtro funcionário */

        const filtroFuncionario =
            document
                .getElementById(
                    "filtroFuncionario"
                )
                .value;


        /* Filtro atividade */

        const filtroAtividade =
            document
                .getElementById(
                    "filtroAtividade"
                )
                .value;


        if (filtroFuncionario) {

            eventos =
                eventos.filter(
                    function(e) {

                        return String(
                            e.funcionarioId
                        ) ===
                        filtroFuncionario;

                    }
                );

        }


        if (filtroAtividade) {

            eventos =
                eventos.filter(
                    function(e) {

                        return String(
                            e.atividadeId
                        ) ===
                        filtroAtividade;

                    }
                );

        }


        /* Mostrar eventos */

        eventos.forEach(
            function(evento) {

                const funcionario =
                    funcionarios.find(
                        function(f) {

                            return f.id ===
                                evento.funcionarioId;

                        }
                    );


                const atividade =
                    atividades.find(
                        function(a) {

                            return a.id ===
                                evento.atividadeId;

                        }
                    );


                if (
                    !funcionario ||
                    !atividade
                ) {

                    return;

                }


                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "evento";


                div.style.background =
                    funcionario.cor;


                div.style.borderLeftColor =
                    atividade.cor;


                div.innerHTML = `

                    <strong>
                        ${funcionario.nome}
                    </strong>

                    <small>
                        ${atividade.nome}
                    </small>

                `;


                if (evento.descricao) {

                    div.title =
                        evento.descricao;

                }


                div.onclick =
                    function() {

                        editarAgendamento(
                            evento.id
                        );

                    };


                elemento.appendChild(
                    div
                );

            }
        );


        grade.appendChild(
            elemento
        );

    }

}


function editarAgendamento(id) {

    const evento =
        agendamentos.find(
            function(a) {

                return a.id === id;

            }
        );


    if (!evento) {

        return;

    }


    atualizarSelects();


    document
        .getElementById(
            "idAgendamento"
        )
        .value =
        evento.id;


    document
        .getElementById(
            "dataAgenda"
        )
        .value =
        evento.data;


    document
        .getElementById(
            "funcionarioAgenda"
        )
        .value =
        evento.funcionarioId;


    document
        .getElementById(
            "atividadeAgenda"
        )
        .value =
        evento.atividadeId;


    document
        .getElementById(
            "descricaoAgenda"
        )
        .value =
        evento.descricao || "";


    document
        .getElementById(
            "tituloAgenda"
        )
        .textContent =
        "Editar atividade";


    document
        .getElementById(
            "modalAgenda"
        )
        .classList.add("aberto");

}


function renderizarFuncionarios() {

    const lista =
        document.getElementById(
            "listaFuncionarios"
        );


    lista.innerHTML = "";


    funcionarios.forEach(
        function(f) {

            const quantidade =
                agendamentos.filter(
                    function(a) {

                        return a.funcionarioId ===
                            f.id;

                    }
                ).length;


            lista.innerHTML += `

                <div class="item">

                    <span
                        class="bolinha"
                        style="background:${f.cor}"
                    ></span>

                    <div class="item-info">

                        <strong>
                            ${f.nome}
                        </strong>

                        <small>
                            ${quantidade}
                            atividade(s)
                        </small>

                    </div>


                    <button
                        class="btn-excluir"
                        onclick="
                            excluirFuncionario(${f.id})
                        "
                        title="Excluir funcionário"
                    >
                        🗑
                    </button>

                </div>

            `;

        }
    );

}


function renderizarAtividades() {

    const lista =
        document.getElementById(
            "listaAtividades"
        );


    lista.innerHTML = "";


    atividades.forEach(
        function(a) {

            lista.innerHTML += `

                <div class="item">

                    <span
                        class="quadrado"
                        style="background:${a.cor}"
                    ></span>


                    <div class="item-info">

                        <strong>
                            ${a.nome}
                        </strong>

                    </div>


                    <button
                        class="btn-excluir"
                        onclick="
                            excluirAtividade(${a.id})
                        "
                        title="Excluir atividade"
                    >
                        🗑
                    </button>

                </div>

            `;

        }
    );

}


function excluirFuncionario(id) {

    const funcionario =
        funcionarios.find(
            function(f) {

                return f.id === id;

            }
        );


    if (!funcionario) {

        return;

    }


    const quantidade =
        agendamentos.filter(
            function(a) {

                return a.funcionarioId === id;

            }
        ).length;


    let mensagem =
        `Deseja excluir o funcionário "${funcionario.nome}"?`;


    if (quantidade > 0) {

        mensagem +=
            `\n\nEste funcionário possui ${quantidade} atividade(s) agendada(s). Elas também serão removidas.`;

    }


    if (!confirm(mensagem)) {

        return;

    }


    funcionarios =
        funcionarios.filter(
            function(f) {

                return f.id !== id;

            }
        );


    agendamentos =
        agendamentos.filter(
            function(a) {

                return a.funcionarioId !== id;

            }
        );


    salvarDados();

    atualizarTudo();

}


function excluirAtividade(id) {

    const atividade =
        atividades.find(
            function(a) {

                return a.id === id;

            }
        );


    if (!atividade) {

        return;

    }


    const quantidade =
        agendamentos.filter(
            function(a) {

                return a.atividadeId === id;

            }
        ).length;


    let mensagem =
        `Deseja excluir a atividade "${atividade.nome}"?`;


    if (quantidade > 0) {

        mensagem +=
            `\n\nEla está sendo utilizada em ${quantidade} agendamento(s). Esses agendamentos também serão removidos.`;

    }


    if (!confirm(mensagem)) {

        return;

    }


    atividades =
        atividades.filter(
            function(a) {

                return a.id !== id;

            }
        );


    agendamentos =
        agendamentos.filter(
            function(a) {

                return a.atividadeId !== id;

            }
        );


    salvarDados();

    atualizarTudo();

}


function atualizarCards() {

    document
        .getElementById(
            "totalFuncionarios"
        )
        .textContent =
        funcionarios.length;


    const ano =
        dataAtual.getFullYear();


    const mes =
        dataAtual.getMonth();


    const atividadesMes =
        agendamentos.filter(
            function(a) {

                const data =
                    new Date(
                        a.data +
                        "T00:00:00"
                    );


                return (

                    data.getFullYear() ===
                    ano &&

                    data.getMonth() ===
                    mes

                );

            }
        );


    document
        .getElementById(
            "totalMes"
        )
        .textContent =
        atividadesMes.length;


    const hoje =
        formatarDataInput(
            new Date()
        );


    document
        .getElementById(
            "totalHoje"
        )
        .textContent =
        agendamentos.filter(
            function(a) {

                return a.data ===
                    hoje;

            }
        ).length;

}


function mesAnterior() {

    dataAtual.setMonth(
        dataAtual.getMonth() - 1
    );


    atualizarTudo();

}


function mesProximo() {

    dataAtual.setMonth(
        dataAtual.getMonth() + 1
    );


    atualizarTudo();

}


function irHoje() {

    dataAtual =
        new Date();


    atualizarTudo();

}


function criarData(
    ano,
    mes,
    dia
) {

    return (

        ano +
        "-" +
        String(
            mes + 1
        ).padStart(2, "0") +
        "-" +
        String(
            dia
        ).padStart(2, "0")

    );

}


function formatarDataInput(data) {

    return (

        data.getFullYear() +
        "-" +
        String(
            data.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            data.getDate()
        ).padStart(2, "0")

    );

}

function limparFiltros() {

    document
        .getElementById(
            "filtroFuncionario"
        )
        .value = "";


    document
        .getElementById(
            "filtroAtividade"
        )
        .value = "";


    renderizarCalendario();

}

function abrirConfiguracoes() {

    document
        .getElementById(
            "tema"
        )
        .value =
        configuracoes.tema;


    document
        .getElementById(
            "corPrincipal"
        )
        .value =
        configuracoes.cor;


    document
        .getElementById(
            "modalConfiguracoes"
        )
        .classList.add("aberto");

}


function alterarTema() {

    configuracoes.tema =
        document
            .getElementById(
                "tema"
            )
            .value;


    salvarConfiguracoes();

    aplicarConfiguracoes();

}


function alterarCorPrincipal() {

    configuracoes.cor =
        document
            .getElementById(
                "corPrincipal"
            )
            .value;


    salvarConfiguracoes();

    aplicarConfiguracoes();

}


function salvarConfiguracoes() {

    localStorage.setItem(
        "configuracoes",
        JSON.stringify(
            configuracoes
        )
    );

}


function aplicarConfiguracoes() {

    if (
        configuracoes.tema ===
        "escuro"
    ) {

        document
            .body
            .classList
            .add("dark");

    }
    else {

        document
            .body
            .classList
            .remove("dark");

    }


    document
        .documentElement
        .style
        .setProperty(
            "--primary",
            configuracoes.cor
        );


    document
        .documentElement
        .style
        .setProperty(
            "--primary-hover",
            configuracoes.cor
        );

}


function fecharModais() {

    document
        .querySelectorAll(".modal")
        .forEach(
            function(modal) {

                modal.classList.remove(
                    "aberto"
                );

            }
        );

}


document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "aberto"
            );

        }

    }
);