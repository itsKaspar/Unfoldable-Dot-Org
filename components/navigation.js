class NavDOM extends window.HTMLElement {
  connectedCallback () {
    this.update()
  }

  update () {
    this.innerHTML = `
      <style>
        .nav-block{
          position:absolute;
          top:25px;
          left:25px;
          z-index:10000;
          width:50px;
          height:50px;
          border:1px solid ${this.color};
          opacity:0.5;
        }
        .nav-block:hover{
          opacity:0.9;
        }
        .nav-block a{
          width:100%;
          height:100%;
          display:block;
          background:${this.color};
          opacity:0.1;
        }
      </style>
      <div class="nav-block">
        <a href="${window.location.origin}"></a>
      </div>
    `
  }

  // declare any attributes you want to listen for changes to
  static get observedAttributes () {
    return ['color']
  }

  attributeChangedCallback (attrName, oldVal, newVal) { // runs everytime any att is changed
    // when an attribute's value changes, update the corresponding property of the same name
    if (newVal !== oldVal) this[attrName] = newVal
    // if/when the color attribute changes, re-render the html template
    if (attrName === 'color') this.update()
  }
}
window.customElements.define('nav-block', NavDOM)
