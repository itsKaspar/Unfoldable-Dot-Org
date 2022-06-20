
class BlogMenu extends window.HTMLElement {
  connectedCallback () {
    this.update()
  }

  update () {
    this.innerHTML = `
      <style>
        .blog-menu {
          text-transform: uppercase;
          font-style: fantasy;
          color: ${this.color};
        }
      </style>

      <div class="blog-menu">
        <ul class="blog-list-elements">
        </ul>
      </div>
    `
    let blogMenuDiv = this.querySelector('.blog-list-elements')

    const obj = JSON.parse(this.items);

    obj.forEach(function(item, i){
      const newDiv = document.createElement('li'); // create new div

      // make a link from an object of values
      // function encodeQueryData(data) {
      //    const ret = [];
      //    for (let d in data)
      //      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      //    return ret.join('&');
      // }
      // make a link end

      newDiv.innerHTML = `<a href="blog.html?path=${item.path}"> ${item.filename.slice(0, -5)}</a>`;

      blogMenuDiv.appendChild(newDiv);
    })

  }

  // declare any attributes you want to listen for changes to
  static get observedAttributes () {
    return ['items']
  }

  attributeChangedCallback (attrName, oldVal, newVal) { // runs everytime any att is changed
    // when an attribute's value changes, update the corresponding property of the same name
    if (newVal !== oldVal) this[attrName] = newVal
    // if/when the color attribute changes, re-render the html template
    if (attrName === 'items') this.update()
  }
}
window.customElements.define('blog-menu', BlogMenu)

// comma separated list of text
