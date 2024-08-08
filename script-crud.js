// Encontrar o botão adicionar tarefa
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')

//O parse() é o inverso do stringify(): pega a string e se ela for um JSON formatado, ele vai conseguir transformar isso.Se houver uma string problemática ou algo fora do lugar, teremos erro no console indicando que com isso ele não sabe lidar.Mas nesse cenário, como fizemos um stringify() e estamos fazendo parse(), provavelmente, não precisamos nos preocupar. Então, o JSON.parse() vai transformar isso.Porém, imagine que foi a primeira vez que uma pessoa carregou o Fokus.Não tem nada no localStorage.Então, podemos fazer uma programação defensiva. Se, por algum motivo, o localStorage retornou nulo, o nulo não vai quebrar o JSON.parse(), mas não teremos um array para fazer push().Então, o que fazemos ? Se o retorno for algo que não é um array, ou seja, se for um undefined ou um null, vamos fazer um "ou"(||) e colocar um array vazio.
// const tarefas = []
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
// A função abaixo não está recebendo as tarefas como parametro, pois ela já tem acesso a variável tarefas, que é uma variável global: const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
// A função atualizarTarefas() é responsável por atualizar o localStorage com as tarefas que estão no array tarefas. Para isso, utilizamos o método setItem() do localStorage, que recebe dois argumentos: o nome da chave que queremos salvar e o valor que queremos salvar. No caso, a chave é 'tarefas' e o valor é o array tarefas, que foi transformado em uma string com o método JSON.stringify().
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
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
        //pegamos a nova descrição do prompt
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        // atualizamos o parágrafo que é a camada visual
        paragrafo.textContent = novaDescricao
        // atualizamos a referência da tarefa, ou seja, a camada de dados
        tarefa.descricao = novaDescricao
        // por fim, fizemos o update do localStorage
        atualizarTarefas()


    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    // Agora que criamos todos os elementos, precisamos encaixá-los uns nos outros. A primeira coisa que faremos será chamar botao.append(imagemBotao).
    botao.append(imagemBotao)
    // Por último, vamos chamar o li e adicionar cada elemento que criamos nas constantes.Dessa forma, teremos li.append(svg), li.append(p), e li.append(botao).
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li
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