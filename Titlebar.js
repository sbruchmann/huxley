"use strict";
class Titlebar {
	constructor(title) {
		this.element = document.createElement("div");
		this.element.classList.add("titlebar");
		this.setTitle(title);
	}

	getElement() {
		return this.element;
	}

	setTitle(value) {
		this.getElement().textContent = value;
		return this;
	}
}

module.exports = Titlebar;
