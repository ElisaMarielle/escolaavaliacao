const modalTurmas = document.querySelector('.modal-turmas')
const formTurmas = document.getElementById('formTurmas')

function abrirModal(){
    modalTurmas.style.display = "flex"
}
function fecharModal(){
    modalTurmas.style.display = "none"
    formTurmas.reset()
}

//-----------------------------------------//

const urlT = 'http://localhost:3000/turma'
const turmas = []

if (document.getElementById("tbodyturmas")) {
    carregarTurmas();
}
function carregarTurmas(){
    fetch(urlT + '/listar')
    .then(response => response.json())
    .then(data =>{
        turmas.length = 0;
        turmas.push(...data);
        listarTurmas(turmas);
    })
    //.catch(e =>alert('Problemas com a conexão da API'));
}
//-------------------LISTAR----------------------//
function listarTurmas(turmas){
    const tabela = document.querySelector('#tbodyturmas');
    tabela.innerHTML = '';

    turmas.forEach((turma, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${turma.descricao}</td>
                <td>
                    <button class="table-button" onclick="visualizarTurma(${turma.id})">
                        Visualizar
                    </button>

                    <button class="table-buttonE" onclick="excluirTurma(${turma.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}
//-------------------CADASTRAR----------------------//
if(formTurmas){
    document.querySelector('#formTurmas').addEventListener('submit', function(e){
        e.preventDefault();
        const novaTurma = {
            nome: nome.value,
            descricao: descricao.value
        };
        

        fetch(urlT + '/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaTurma)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro na API');
            }
        })
        .then(() => {
            alert("Turma adicionada com sucesso.");
            carregarTurmas();
        })
        .catch(() => alert("Erro ao salvar turma"));
    })
}
//-------------------EXCLUIR----------------------//
function excluirTurma(id) {
    if (!confirm("Deseja excluir essa turma?")) {
        return;
    }
    fetch(`${urlT}/excluir/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao excluir turma");
        }
        alert("Turma excluída com sucesso!");
        carregarTurmas();
    })
    .catch(() => {
        alert("Erro ao excluir turma");
    });
}




//-------------------------------------------------------------------//
//-------------------------------------------------------------------//




const modalAulas = document.querySelector('.modal-aulas')
const formAulas = document.getElementById('formAulas')

function abrirModalA(){
    modalAulas.style.display = "flex"
}
function fecharModalA(){
    modalAulas.style.display = "none"
    formAulas.reset()
}

//-----------------------------------------//

const urlA = 'http://localhost:3000/aula'
const aulas = []
const params = new URLSearchParams(window.location.search);
const turmaId = params.get("turmaId");

function carregarAulas(){
    fetch(`${urlA}/listar/turmas/${turmaId}/aulas`)
    .then(response => response.json())
    .then(data =>{
        aulas.length = 0;
        aulas.push(...data);
        listarAulas(aulas);
    })
}
if (document.getElementById("tbodyaulas")) {
    carregarAulas();
    carregarNomeTurma();
}
function visualizarTurma(id) {
    window.location.href = `aulas.htm?turmaId=${id}`;
}
function carregarNomeTurma() {
    fetch(`${urlT}/buscar/${turmaId}`)
        .then(res => res.json())
        .then(turma => {
            document.getElementById("nomeTurmaAtual").textContent = 
                `Turma: ${turma.nome}`;
        })
        .catch(err => console.error(err));
}
//-------------------LISTAR----------------------//
function listarAulas(aulas) {
    const tabela = document.getElementById("tbodyaulas");
    tabela.innerHTML = "";

    aulas.forEach(aula => {
        tabela.innerHTML += `
            <tr>
                <td>${aula.titulo}</td>
                <td>${aula.conteudo}</td>
                <td>
                    <button class="table-buttonE" onclick="excluirAula(${aula.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}
//-------------------CADASTRAR----------------------//
if(formAulas){
    document.querySelector('#formAulas').addEventListener('submit', function(e){
        e.preventDefault();
        const novaAula = {
            titulo: titulo.value,
            conteudo: conteudo.value
        };

        fetch(`${urlA}/cadastrar/turmas/${turmaId}/aulas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaAula)
        })
        .then(() => {
            carregarAulas(aulas);
        });
    });
}
//-------------------EXCLUIR----------------------//
function excluirAula(id) {
    if (!confirm("Deseja excluir essa aula?")) {
        return;
    }
    fetch(`${urlA}/excluir/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao excluir aula");
        }
        alert("Aula excluída!");
        carregarAulas();
    })
    .catch(() => {
        alert("Erro ao excluir aula");
    });
}