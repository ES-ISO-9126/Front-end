class List extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  listElements = []
  listAux = []
  start = 0
  end = 39
  constructor() {
    super();

    this.shadow.appendChild(this.createHTML());
    this.createStyles(
      "src/components/listOfArticles/list.css",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
    );
    this.fetchAndDisplayData();
    this.addInfiniteScrollListener()
  }

  createHTML() {
    const template = `
        <div class="container mt-4">
          <header class="text-center mb-4">
            <img
              src="fig/image_logo.png"
              alt="Logomarca"
              class="img-fluid mb-3"
              style="max-width: 250px; height: 100px; max-width: 200px"
            />
            <h1 class="h5">Sistema de Gestão de Acervo Acadêmico</h1>
          </header>
  
          <div class="search-bar mb-4">
            <input
              type="text"
              id="search"
              class="form-control"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
  
          <div id="list" class="list-container">
            <!-- Items will be dynamically added here -->
          </div>
        </div>
      `;

    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "list-component");
    componentRoot.innerHTML = template;
    return componentRoot;
  }

  createStyles(...linksUser) {
    linksUser.forEach((e) => {
      const link = this.createLink(e);
      this.shadow.appendChild(link);
    });
  }

  createLink(linkStyle) {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", linkStyle);
    return link;
  }

  fetchAndDisplayData() {
    if(this.listElements.length !== 0){
      return
    }
    const listContainer = this.shadow.querySelector("#list");
    const searchInput = this.shadow.querySelector("#search");

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.listElements = data
        for(let i = this.start ; i <= this.end ; i++){
            this.listAux.push(this.listElements[i])
        }
        this.start = this.end + 1
        this.end = this.end + 40

        const filtered = this.filterDatas(this.listAux)
        this.displayItems(filtered, listContainer);

      //   searchInput.addEventListener("input", () => {
      //     const filtered = this.filterDatas(this.listAux)
      //     console.log("filtered ", filtered)
      //    this.displayItems(filtered, listContainer);
      //   });
       });

  }

  filterDatas(data){
    const filtered = data.map(
      (item) => {
         item.email = item.email
         item.name = String(item.name).charAt(0).toUpperCase() + String(item.name).toLowerCase().slice(1)
         item.body = String(item.body).charAt(0).toUpperCase() + String(item.body).toLowerCase().slice(1)
        return item
      }
        // arcos => Marcos
       
    );
    return filtered
  }

  displayItems(items, container) {
    container.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const email = document.createElement("h6");
      email.className = "card-subtitle mb-2 text-muted";
      email.textContent = `E-mail: ${item.email}`;

      const name = document.createElement("h5");
      name.className = "card-title";
      name.textContent = item.name;

      const body = document.createElement("p");
      body.className = "card-text";
      body.textContent = item.body;

      cardBody.appendChild(email);
      cardBody.appendChild(name);
      cardBody.appendChild(body);
      card.appendChild(cardBody);
      container.appendChild(card);
    });
  }

  addInfiniteScrollListener() {

    const wrap = this.shadow.querySelector("#list");
    wrap.addEventListener("scroll", () => {
      if (
        wrap.scrollTop + wrap.clientHeight >=
        wrap.scrollHeight - 10
      ) {
        if(this.listAux.length > 500){
          return
        }
        for(let i = this.start ; i <= this.end ; i++){
          this.listAux.push(this.listElements[i])
        }
        this.start = this.end + 1
        this.end = this.end + 40
        
        const listContainer = this.shadow.querySelector("#list");
        const filtered = this.filterDatas(this.listAux)
        this.displayItems(filtered, listContainer);

      }
    });

    
  }
}

customElements.define("list-component", List);
