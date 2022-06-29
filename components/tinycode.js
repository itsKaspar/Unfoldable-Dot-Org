class TinyCodeDOM extends window.HTMLElement {
  constructor(){
    super();
  }
  connectedCallback() {
    this.update();
  }

  createDivs(){
    //create divs
    this.editor = document.createElement("div")
    this.editor.id = "editor";
    // this.editor.style = "position:relative;left:0;width:50%;top:0;"
    this.output = document.createElement("div")
    this.output.id = "output"
    // this.output.style = "position:relative;left:50%;width:50%;top:0;"

    this.appendChild(this.editor)
    this.appendChild(this.output)
  }

  update() {
    let code;
    let ne;
    setTimeout(() => code = this.textContent );
    setTimeout(() => this.innerHTML = '' );
    setTimeout(() => this.createDivs() )
    setTimeout(() => ne = new Netitor({
          ele: '#editor',
          render: '#output',
          code: code,
          library: "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js",
          theme: 'light',
          background: true,
          wrap: false,
          language: 'javascript',
          lint: true,
          hint: true,
          readOnly: false,
          displayTitle: false,
          autoUpdate: true,
          updateDelay: 500,
          friendlyErr: true,
          renderWithErrors: true
        })  );
  }
}
window.customElements.define('tiny-code', TinyCodeDOM)
