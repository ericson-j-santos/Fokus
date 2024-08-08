// Encontrar o botão adicionar tarefa
const btnAdicionarTarefa = document.querySelector('.app__button--add-task') // Selecionar o botão para adicionar tarefas
const formAdicionarTarefa = document.querySelector('.app__form-add-task') // Selecionar o formulário para adicionar tarefas
const textArea = document.querySelector('.app__form-textarea') // Selecionar o textarea do formulário para adicionar tarefas
const ulTarefas = document.querySelector('.app__section-task-list')  // Selecionar a lista de tarefas (ul) para adicionar as tarefas
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description') // Selecionar o parágrafo para exibir a descrição da tarefa ativa
// Selecione o botão de Cancelar que adicionamos ao formulário
//const btnCancelar = document.querySelector('app__form-footer__button--cancel')

//O parse() é o inverso do stringify(): pega a string e se ela for um JSON formatado, ele vai conseguir transformar isso.Se houver uma string problemática ou algo fora do lugar, teremos erro no console indicando que com isso ele não sabe lidar.Mas nesse cenário, como fizemos um stringify() e estamos fazendo parse(), provavelmente, não precisamos nos preocupar. Então, o JSON.parse() vai transformar isso.Porém, imagine que foi a primeira vez que uma pessoa carregou o Fokus.Não tem nada no localStorage.Então, podemos fazer uma programação defensiva. Se, por algum motivo, o localStorage retornou nulo, o nulo não vai quebrar o JSON.parse(), mas não teremos um array para fazer push().Então, o que fazemos ? Se o retorno for algo que não é um array, ou seja, se for um undefined ou um null, vamos fazer um "ou"(||) e colocar um array vazio.
// const tarefas = []
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] // Recuperar as tarefas do localStorage ou criar um array vazio se não houver tarefas no localStorage 
let tarefaSelecionada = null // Inicializar a tarefa selecionada como nula (nenhuma tarefa selecionada) 

// Crie uma função para limpar o conteúdo do textarea e esconder o formulário
const limparFormulario = () => {
    textArea.value = ''; // Limpe o conteúdo do textarea
    formAdicionarTarefa.classList.add('hidden');  // Adicione a classe 'hidden' ao formulário para escondê-lo
}

// Associe a função limparFormulario ao evento de clique do botão Cancelar
//btnCancelar.addEventListener('click', limparFormulario)

// A função abaixo não está recebendo as tarefas como parametro, pois ela já tem acesso a variável tarefas, que é uma variável global: const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
// A função atualizarTarefas() é responsável por atualizar o localStorage com as tarefas que estão no array tarefas. Para isso, utilizamos o método setItem() do localStorage, que recebe dois argumentos: o nome da chave que queremos salvar e o valor que queremos salvar. No caso, a chave é 'tarefas' e o valor é o array tarefas, que foi transformado em uma string com o método JSON.stringify().
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

// Função para criar elemento de tarefa modificada para incluir botão de edição
// function criarElementoTarefa(tarefa) {
//     const li = document.createElement('li')
//     li.classList.add('app__section-task-list-item')

//     const svg = document.createElement('svg')
//     svg.innerHTML = `
//         <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
//             <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
//         </svg>
//     `
//     const botaoEditar = document.createElement('button')
//     botaoEditar.classList.add('app__button-edit')
//     botaoEditar.innerHTML = 'Editar'
//     botaoEditar.onclick = function () {
//         editarTarefa(tarefa, li)
//     }
//     li.append(botaoEditar)
//     return li
// }

// Função para editar tarefa
function editarTarefa(tarefa, elementoTarefa) {
    const descricaoEditada = prompt('Edite a tarefa', tarefa.descricao) // Simples implementação de edição
    if (descricaoEditada !== null && descricaoEditada.trim() !== '') {
        tarefa.descricao = descricaoEditada
        // Atualizar a interface do usuário aqui e o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
        // Atualizar a visualização da tarefa na lista
        elementoTarefa.querySelector('p').textContent = descricaoEditada
    }
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        //debugger
        //pegamos a nova descrição do prompt
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        //console.log('Nova descrição da tarefa: ', novaDescricao)
        if (novaDescricao) {
            // atualizamos o parágrafo que é a camada visual
            paragrafo.textContent = novaDescricao
            // atualizamos a referência da tarefa, ou seja, a camada de dados
            tarefa.descricao = novaDescricao
            // por fim, fizemos o update do localStorage
            atualizarTarefas()
        }
    }

    const imagemBotao = document.createElement('img') // Criar elemento de imagem para o botão de edição da tarefa
    imagemBotao.setAttribute('src', '/imagens/edit.png') // Definir o atributo src da imagem do botão de edição da tarefa como a imagem edit.png 

    // Agora que criamos todos os elementos, precisamos encaixá-los uns nos outros. A primeira coisa que faremos será chamar botao.append(imagemBotao).
    botao.append(imagemBotao) // Adicionar a imagem do botão de edição da tarefa ao botão de edição da tarefa
    // Por último, vamos chamar o li e adicionar cada elemento que criamos nas constantes.Dessa forma, teremos li.append(svg), li.append(p), e li.append(botao).
    li.append(svg) // Adicionar o svg ao elemento da tarefa
    li.append(paragrafo) // Adicionar o parágrafo ao elemento da tarefa
    li.append(botao) // Adicionar o botão de edição ao elemento da tarefa 

    li.onclick = () => { // Adicionar evento de clique ao elemento da tarefa
        document.querySelectorAll('.app__section-task-list-item-active') // Selecionar todos os elementos com a classe 'app__section-task-list-item-active'
            .forEach(elemento => { // Para cada elemento, executar a função
                elemento.classList.remove('app__section-task-list-item-active') // Remover a classe 'app__section-task-list-item-active' do elemento
            }) // Encerrar a execução da função
        if (tarefaSelecionada == tarefa) { // Se a tarefa selecionada for a mesma que a tarefa clicada
            paragrafoDescricaoTarefa.textContent = '' // Limpar a descrição da tarefa
            tarefaSelecionada = null // Deselecionar tarefa clicada
            return // Encerrar a execução da função para não selecionar a tarefa clicada

        }
        tarefaSelecionada = tarefa // Selecionar tarefa clicada
        paragrafoDescricaoTarefa.textContent = tarefa.descricao // Exibir descrição da tarefa clicada no parágrafo de descrição da tarefa ativa (paragrafoDescricaoTarefa)  

        li.classList.add('app__section-task-list-item-active') // Adicionar a classe 'app__section-task-list-item-active' ao elemento da tarefa clicada para destacá-la visualmente na lista de tarefas 
    }

    return li // Retornar o elemento da tarefa criado para ser adicionado à lista de tarefas (ulTarefas) 
}

// Adicionar um evento de click ao botão. O AddEventListener é uma função que recebe dois parâmetros: o evento que queremos ouvir 'CLICK' e a função '()' que será executada quando o evento ocorrer. Resumo: O que eu quero ouvir? O que eu quero executar?
// Recapitulando, procuramos dois elementos: o botão btnAdicionarTarefa e o formulário formAdicionarTarefa.Quando alguém clica no botão, fazemos a alternância da classe hidden no formulário.
btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    //localStorage.setItem('tarefas', JSON.stringify(tarefas))
    atualizarTarefas()
    textArea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

// Agora que já começamos e implementamos o JSON.parse(), vamos para o final do arquivo, e a última coisa que vamos fazer será percorrer a lista de tarefas assim que carregarmos a aplicação e para cada tarefa(forEach()), haverá uma função que dá acsesso à tarefa da vez, ou seja, ele vai iterar sobre todas as tarefas.
// No escopo queremos chamar a função criarElementoTarefa().Ela espera um argumento que é a tarefa em si.Então, passamos uma tarefa para a função que criamos.
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
})