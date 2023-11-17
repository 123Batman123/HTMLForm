export default class ButtonControl {
  constructor(element) {
    if (typeof element === "string") {
      this.element = document.querySelector(element);
      console.log(this.element);
    }
    this.check = false;
    this.buttonClick = this.buttonClick.bind(this);

    this.button = this.element.querySelector(".button");
    this.main = this.element.querySelector(".main");

    this.button.addEventListener("click", this.buttonClick);
  }

  buttonClick() {
    if (this._timeout) {
      return;
    }
    const div = this.createPopover();

    this.main.appendChild(div);

    const { right, top } = this.button.getBoundingClientRect();
    div.style.top = top - this.button.offsetHeight * 2 + "px";

    console.log(right, top, this.button.offsetHeight);

    this._timeout = setTimeout(() => this.timeoutRemove(".popover"), 2000);
  }

  createPopover() {
    const div = document.createElement("div");
    div.classList.add("popover");

    const h3 = document.createElement("h3");
    h3.classList.add("title");
    h3.innerHTML = "Popover title";

    const p = document.createElement("p");
    p.classList.add("text");
    p.innerHTML =
      "And here's some amazing content. It's <br> very engaging. Right?";

    div.appendChild(h3);
    div.appendChild(p);

    return div;
  }

  timeoutRemove(selectorRemove) {
    if (this.main.querySelector(selectorRemove)) {
      this.main.removeChild(this.main.querySelector(selectorRemove));
      this._timeout = null;
    }
  }
}
