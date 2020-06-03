class Credits extends HTMLElement {
  connectedCallback() {
    const formatNumber = require('../lib/interface').formatNumber
    if (!isNaN(this.innerText)) {
      this.innerHTML = `${formatNumber(this.innerHTML)} cr`
    }
    else { this.innerHTML = `nan`;}
  }
}
customElements.define('ed-credits', Credits);