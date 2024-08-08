// Encontrar o botão adicionar tarefa
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')

const tarefas = []

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElementNS('svg')
    svg.innerHTML = `
     <svg>
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    // Agora que criamos todos os elementos, precisamos encaixá-los uns nos outros. A primeira coisa que faremos será chamar botao.append(imagemBotao).
    botao.append(imagemBotao)
    // Por último, vamos chamar o li e adicionar cada elemento que criamos nas constantes.Dessa forma, teremos li.append(svg), li.append(p), e li.append(botao).
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)
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
    let tarefas = []
    tarefas.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
})