class NameComponent extends HTMLElement {

    shadow = this.attachShadow({ mode: "open" }); // Cria uma virtual DOM e define que pode receber alterações de fora(atributos como href,src e dentre outros)

    constructor() {
        super()

        this.shadow.appendChild(this.createHTML())// adiciona um nó(HTML) na árvore
        /*
           DICA ⚠️

           QUANDO FOR ATRIBUIR O LINK DO CSS em styles() CRIE UM LINK DE CSS EM index.html do arquivo 
           que deseja adicionar E COPIE O CAMINHO ABSOLUTO

           DICA ⚠️

        */
        this.createStyles("src/components/exampleComponent/example.css")


    }

    createHTML() {

        const template =
            `
        <h1>Teste 1</h1>
        <p>Teste de texto</p>

        <div>
            <h2>Teste 2</h2>
            <p>Teste</p>
            <a href="#">Clique aqui</a>
        </div>

        `

        const componentRoot = document.createElement("div");//Cria um nó
        componentRoot.setAttribute("class", "name-div");
        componentRoot.innerHTML = template;//insere um dado no nó
        return componentRoot // retorna o nó

    }

    createStyles(...linksUser) {

        linksUser.forEach(e => {
            const link = this.createLink(e)
            this.shadow.appendChild(link)
        })

    }
    createLink(linkStyle) {
        const link = document.createElement("link");// cria uma tag link
        link.setAttribute("rel", "stylesheet");//define css
        link.setAttribute("href", linkStyle); //especifica o caminho do css
        return link
    }
}

customElements.define("name-component", NameComponent);// Cria um componente com o nome card-news