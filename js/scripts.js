const inputNovaTarefa = document.querySelector('#inputNovaTarefa');
const btnAdicionarTarefa = document.querySelector('.adicionarTarefa');
const tarefas = document.querySelector('#tarefas');

function criaTarefa(tarefa) {

    //Cria a div e adiciona a class body task
    const bodyTask = document.createElement('div');
    bodyTask.classList.add('body-task');

    //Cria a div task
    const taskDiv = document.createElement('div');
    taskDiv.id = 'task';
    taskDiv.classList.add('d-flex', 'align-items-center');

    //Botão check
    const btnCheck = document.createElement('button');
    btnCheck.classList.add('botoes-acao');
    btnCheck.id = 'btnCheck';
    const iconCheck = document.createElement('i');
    iconCheck.classList.add('fa-regular', 'fa-circle', 'btnCheck');
    btnCheck.appendChild(iconCheck);

    //texto tarefa
    const textoTarefa = document.createElement('h6');
    textoTarefa.classList.add('flex-grow-1', 'mt-2', 'task-text');
    textoTarefa.id = 'textoTarefa';
    textoTarefa.textContent = tarefa;

    //div botões
    const botoes = document.createElement('div');
    botoes.classList.add('d-inline');
    botoes.id = 'botoes';

    // Botão prioridade (estrela)
    const btnStar = document.createElement('button');
    btnStar.classList.add('botoes-acao');
    const iconStar = document.createElement('i');
    iconStar.classList.add('fa-regular', 'fa-star', 'btnPrioridade');
    iconStar.style.fontSize = '20px';
    btnStar.appendChild(iconStar);

    // Botão editar
     const btnEdit = document.createElement('button');
     btnEdit.classList.add('botoes-acao');
     const iconEdit = document.createElement('i');
     iconEdit.classList.add('fa-regular', 'fa-pen-to-square', 'btnEditar');
     iconEdit.style.color = 'blue';
     iconEdit.style.fontSize = '20px';
     btnEdit.appendChild(iconEdit);

    // Botão remover
    const btnRemove = document.createElement('button');
    btnRemove.classList.add('botoes-acao');
    const iconRemove = document.createElement('i');
    iconRemove.classList.add('fa-regular', 'fa-rectangle-xmark', 'btnRemover');
    iconRemove.style.color = 'red';
    iconRemove.style.fontSize = '20px';
    btnRemove.appendChild(iconRemove);

    // Adiciona os botões na div espacamentoBotoes
    botoes.appendChild(btnStar);
    botoes.appendChild(btnEdit);
    botoes.appendChild(btnRemove)

    // Adiciona os elementos na div taskDiv
    taskDiv.appendChild(btnCheck);
    taskDiv.appendChild(textoTarefa);
    taskDiv.appendChild(botoes);

    // Adiciona taskDiv à bodyTasks
    bodyTask.appendChild(taskDiv);

    tarefas.appendChild(bodyTask);
}

//Botão check
function marcarDesmarcarCheck() {

}

//Adicionar nova tarefa btn plus
btnAdicionarTarefa.addEventListener('click', function() {
    if(!inputNovaTarefa.value) return;
    criaTarefa(inputNovaTarefa.value);
    inputNovaTarefa.value = '';
});

//Adicionar nova tarefa Enter
inputNovaTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!inputNovaTarefa.value) return;
        criaTarefa(inputNovaTarefa.value);
        inputNovaTarefa.value = '';
    }
});

//Botões de ação
tarefas.addEventListener('click', function(e) {

    //Botão check
    if(e.target.classList.contains('btnCheck')) {
        if(e.target.classList.contains('fa-regular') && e.target.classList.contains('fa-circle')) {
            e.target.classList.remove('fa-regular', 'fa-circle');
            e.target.classList.add('fa-solid', 'fa-circle-check');
            document.getElementById('textoTarefa').classList.add('checked');
        } else if (e.target.classList.contains('fa-solid') && e.target.classList.contains('fa-circle-check')) {
            e.target.classList.remove('fa-solid', 'fa-circle-check');
            document.getElementById('textoTarefa').classList.remove('checked');
            e.target.classList.add('fa-regular', 'fa-circle');
        }
    }

    if(e.target.classList.contains('btnEditar')) {
        const divParent = e.target.closest('.body-task');
        const elementoTarefa = divParent.querySelector('.task-text');
        const textoTarefa = elementoTarefa.innerText;
        const divBotoes = document.getElementById('botoes');
        divBotoes.classList.add('d-none');
        const edicao = inputEdicaoTarefa(textoTarefa, elementoTarefa);        
    }

    if(e.target.classList.contains('btnPrioridade')) {
        const tarefa = e.target.closest('.body-task');

        if(e.target.classList.contains('fa-regular')) {
            tarefa.remove();
            tarefas.prepend(tarefa);
            e.target.classList.remove('fa-regular');
            e.target.classList.add('fa-solid', 'star-active');
        } else if(e.target.classList.contains('fa-solid')) {
            e.target.classList.remove('fa-solid', 'star-active');
            e.target.classList.add('fa-regular');
        }

    }

    if(e.target.classList.contains('btnRemover')) {
        let resultado = confirm('Você realmente deseja excluir essa tarefa?')
        if(resultado) {
            e.target.closest('.body-task').remove();
        }
    }
})

//Cria o input de edição da tarefa
function inputEdicaoTarefa(text, elementoTarefa) {
    const divInput = document.createElement('div');
    divInput.classList.add('input-group', 'mb-3');
    const inputEdicao = document.createElement('input');
    inputEdicao.setAttribute('type', 'text');
    inputEdicao.setAttribute('class', 'form-control');
    inputEdicao.setAttribute('value', text);
    const divBotao = document.createElement('div');
    divBotao.classList.add('input-group-prepend');
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-outline-success');
    btn.setAttribute('type', 'button');
    btn.setAttribute('id', 'btnSalvar');
    btn.innerHTML = 'Salvar';

    // Anexa o input e o botão na div
    divInput.append(inputEdicao);
    divBotao.append(btn);
    divInput.append(divBotao);

    // Substitui a tarefa original pelo input de edição
    elementoTarefa.replaceWith(divInput);

    // Ação do botão "Salvar"
    btn.addEventListener('click', () => {
        // Recupera o valor do input
        const novoTexto = inputEdicao.value;

        // Cria novamente o elemento com o texto da tarefa
        const h6Tarefa = document.createElement('h6');
        h6Tarefa.classList.add('flex-grow-1', 'mt-2', 'task-text');
        h6Tarefa.setAttribute('id', 'textoTarefa');
        h6Tarefa.textContent = novoTexto;

        // Substitui o input de edição pelo texto atualizado
        divInput.replaceWith(h6Tarefa);

        //Habilita visualização dos botões
        const divBotoes = document.getElementById('botoes');
        divBotoes.classList.remove('d-none');
    });
}

//Setar prioridade
function setPrioridade() {
    
}