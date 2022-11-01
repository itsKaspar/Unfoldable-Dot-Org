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
          width:70px;
          height:70px;
          border:2px dashed ${this.color};
        }
        .nav-block:hover{
          border:1px solid ${this.color};
        }
        .nav-block a{
          position:absolute;
          display:inline-block;
          top:0px;
          left:0px;
          width:100%;
          height:100%;
          z-index:1000;
        }
        .nav-block:hover .nav-gradient{
          display:block;
        }
        .nav-gradient{
          display:none;
          position:absolute;
          width:100%;
          height:100%;
          top:0;
          left:0px;
        }
      </style>


      <div class="nav-block">
        <iframe class="nav-gradient" width="70px" height="70px" src="${window.location.origin}/pages/gradient/gradient.html"></iframe>
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
