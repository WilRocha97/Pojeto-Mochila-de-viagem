const form = document.getElementById("novoItem")
// captura a lista
const lista = document.getElementById("lista")
// caso existe alguma coisa no localStorage captura a string e transforma em JS para poder ser usado
const itens = JSON.parse(localStorage.getItem("itens")) || []

//para cada item na lista encontrada no localStorage
itens.forEach( (elemento) => {
    console.log(elemento)
})

//captura o evento de click na tag <form> quando o botão de adicionar for clicado para capturar as informações digitadas nos campos
form.addEventListener("submit", (evento) => {
    // previne a ação padrão do botão
    evento.preventDefault()

    // captura e manda os textos inseridos nos campos de nome e quantidade
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]

    // chama a função de criar item e manda os textos inseridos nos campos de nome e quantidade como parametro
    criaElemento(nome.value, quantidade.value)

    // limpa os campos de nome e quantidade
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(nome, quantidade) {
    console.log(nome, quantidade)
    // <li class="item"><strong>1</strong>Calça</li>
    // cria uma tag <li>
    const novoItem = document.createElement('li')
    // adiciona class="item" na tag <li>
    novoItem.classList.add("item")

    // cria uma tag <strong>
    const numeroItem = document.createElement('strong')
    // adiciona a quantidade na tag <strong>
    numeroItem.innerHTML = quantidade

    // adiciona a tag <strong> como tag filha da tag <li>
    novoItem.appendChild(numeroItem)
    // adiciona o nome na tag <li>
    novoItem.innerHTML += nome
     
    //adiciona o novo item na lista
    lista.appendChild(novoItem)


    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(itemAtual)

    //adiciona o item no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
}