class MyTitle extends window.HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <style>
        .my-title {
          text-transform: uppercase;
          font-style: fantasy;
        }
      </style>

      <div class="my-title">
        Hello World
      </div>
    `
  }
}
window.customElements.define('my-title', MyTitle) // name of the tag , class

//////////////////

class MyTitle2 extends window.HTMLElement {
  connectedCallback () {
    this.update()
  }

  update () {
    this.innerHTML = `
      <style>
        .my-title2 {
          text-transform: uppercase;
          font-style: fantasy;
          color: ${this.color};
        }
      </style>

      <div class="my-title2">
        Hello World
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
window.customElements.define('my-title2', MyTitle2)

// shadow DOM to encapsulate the CSS
// slot, content between the tags (keyword)

// update the attribute of the element
// what it looks like depends

//////////////////
