class WinDOM extends window.HTMLElement {
  connectedCallback () {
    this.update()
    this.dragElement(document.getElementById("win"));
    this.addCloseOption();
  }

  update () {

    this.crossSize = 25;

    this.innerHTML = `

      <style>
      #win {
        color:#666;
        position: absolute;
        z-index: 9;
        border:1px solid white;
        background-color:white;
        width:${this.width || "400px"};
        height:${this.height || "auto"};
        left:${this.x || "calc(50vw - 200px)"};
        top:${this.y || "calc(50vh - 200px)"};
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
      }

      #winheader {
        color:black;
        padding:0;
        cursor: move;
        z-index: 10;
        background-color: ${this.color || "white"};
        border-bottom:1px dotted #ccc;
        display:flex;
        height:calc(${this.crossSize}px + 1px);
      }

      #winheaderleft {
        padding:5px;
        padding-left:10px;
        font-size:0.9em;
        text-align:left;
        width:calc( ${this.width || "400px"} - ${this.crossSize}px);
        opacity:0.2;
      }
      #winheaderleft:hover {
        opacity:0.4;
      }

      #winheaderright{
        padding:5px;
        width:${this.crossSize}px;
        opacity:0.2;
      }
      #winheaderright:hover{
        opacity:0.4;
      }


      #wincross{
        display:inline-block;
        width:100%;
        font-weight:bold;
        color:black;
      }

      h1{
        padding-bottom:8px;
      }

      #win #wincontent{
        text-align:left;
        padding:15px;
        margin-top:0px;
      }

      #wincontent p{
        margin-bottom:10px;
      }

      </style>

      <!-- Draggable DIV -->
     <div id="win">
       <!-- Include a header DIV with the same name as the draggable DIV, followed by "header" -->
       <div id="winheader">
        <div id="winheaderleft">
          <span style="font-size:0.7em;">∠</span>
           ${this.title || "unfoldable.org"}
        </div>
        <div id="winheaderright">
          <a href="#" id="wincross">&#10005;</a>
        </div>
       </div>
       <div id="wincontent">${this.content}</div>
     </div>
    `


  }

  ////////////////

  // hide on click

  addCloseOption(){

    document.getElementById("wincross").onclick = function() {
      var x = document.getElementById("win")
      if (x.style.display === "none") {
        x.style.display = "block"
      } else {
        x.style.display = "none"
      }
    }
  }



  ////////////////

  // Make the DIV element draggable:


  dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


  ////////////////

  // declare any attributes you want to listen for changes to
  static get observedAttributes () {
    return ['color', 'content', 'width', 'height', 'x', 'y', 'title']
  }

  attributeChangedCallback (attrName, oldVal, newVal) { // runs everytime any att is changed
    // when an attribute's value changes, update the corresponding property of the same name
    if (newVal !== oldVal) this[attrName] = newVal
    // if/when the color attribute changes, re-render the html template
    if (attrName === 'color') this.update()
    if (attrName === 'content') this.update()
    if (attrName === 'width') this.update()
    if (attrName === 'height') this.update()
    if (attrName === 'x') this.update()
    if (attrName === 'y') this.update()
    if (attrName === 'title') this.update()
  }
}
window.customElements.define('win-dow', WinDOM)
