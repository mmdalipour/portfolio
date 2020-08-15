class Notification {
  constructor(elementId, options) {
    this.element = document.querySelector(`#${elementId}`);
    this.options = { ...options };
  }

  show() {
    this.element.classList.remove("hide");
    this.element.classList.add("show");
    clearTimeout(this.animation);
    this.animation = setTimeout(() => {
      this.hide();
    }, this.options.duration | 1000);
  }

  hide() {
    this.element.classList.remove("show");
    this.element.classList.add("hide");
  }

  setText(text) {
    this.element.innerText = text;
  }

  setVariant(variant) {
    switch (variant) {
      case "success":
        this.element.classList.add("success");
        break;
      case "error":
        this.element.classList.add("error");
        break;
      default:
        break;
    }
  }
}
