"use strict";
const STORAGE_KEY = "document";

const get = () => {
	return localStorage.getItem(STORAGE_KEY) || "";
};

const set = (document) => {
	return localStorage.setItem(STORAGE_KEY, document);
};

module.exports = {
	get,
	set
};
