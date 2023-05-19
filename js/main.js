const form = document.getElementById("novoItem")
// captura a lista
const lista = document.getElementById("lista")
// caso existe alguma coisa no localStorage captura a string e transforma em JS para poder ser usado
const itens = JSON.parse(localStorage.getItem("itens")) || []

//para cada item na lista encontrada no localStorage
itens.forEach( (elemento) => {
    criaElemento(elemento)
})

//captura o evento de click na tag <form> quando o botão de adicionar for clicado para capturar as informações digitadas nos campos
form.addEventListener("submit", (evento) => {
    // previne a ação padrão do botão
    evento.preventDefault()

    // captura e manda os textos inseridos nos campos de nome e quantidade
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]
    const existe = itens.find( elemento => elemento.nome === nome.value)
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //se existe o mesmo item na lista pega a id do iten existente e atualiza se não cria um iten novo
    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        //atualiza o localStorage buscando o elemento pela id
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }
    else {
        //usa a posição do iten na lista para criar a id única
        //verifica se existe um elemento, se sim adiciona 1 na id se não, adiciona id 0 ao item
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        // chama a função de criar item e manda os textos inseridos nos campos de nome e quantidade como parametro
        criaElemento(itemAtual)
        //adiciona um novo dicionario de iten na lista de itens
        itens.push(itemAtual)
    }

    //adiciona a lista atualizada no localStorage convertendo-a em string
    localStorage.setItem("itens", JSON.stringify(itens))

    // limpa os campos de nome e quantidade
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    // <li class="item"><strong>1</strong>Calça</li>
    // cria uma tag <li>
    const novoItem = document.createElement('li')
    // adiciona class="item" na tag <li>
    novoItem.classList.add("item")

    // cria uma tag <strong>
    const numeroItem = document.createElement('strong')
    // adiciona a quantidade na tag <strong>
    numeroItem.innerHTML = item.quantidade

    //cria uma id ára p item
    numeroItem.dataset.id = item.id

    // adiciona a tag <strong> como tag filha da tag <li>
    novoItem.appendChild(numeroItem)
    // adiciona o nome na tag <li>
    novoItem.innerHTML += item.nome
    
    //adiciona um botão para deletar o item
    novoItem.appendChild(botaoDeleta(item.id))

    //adiciona o novo item na lista
    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    //captura o item existente pela id unica e atualiza a quantidade
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    //cria um elemento botão que pode ser adiciona como tag child 
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"
    elementoBotao.classList.add("deleta_iten")

    //quando esse botão for clicado ele deleta o item
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id == id), 1)

    //adiciona a lista atualizada no localStorage convertendo-a em string
    localStorage.setItem("itens", JSON.stringify(itens))
}
