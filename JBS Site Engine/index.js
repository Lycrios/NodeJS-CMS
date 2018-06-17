/*
 * @Author: Matthew Auld 
 * @Date: 2018-06-16 23:44:38 
 * @Last Modified by: Matthew Auld
 * @Last Modified time: 2018-06-17 02:51:12
 * @File: index.js
 * Copyright 2018 JumpButton North - All rights reserved. 
 */

'use strict';

const utils = require("./utils");
const exphbs = require("express-handlebars");

class Site {
	/**
	 * JumpButton Studio Website Engine
	 * @param {Express} app
	 * @param {object} options
	 * @param {string} options.website_name The websites name
	 */
	constructor(app, options = {}) {
		this.variables = {
			website_name: options.hasOwnProperty("website_name") ? options.website_name : "JumpButton CMS",
			showLoginInNav: options.hasOwnProperty("showLoginInNav") ? options.showLoginInNav : false,
			showNav: true
		};
		this.defaultTitle = options.hasOwnProperty("website_name") ? options.website_name : "JumpButton CMS";
		this.nav = [];
		this.app = app;
		this.app.engine('hbs', exphbs({
			defaultLayout: 'main',
			extname: ".hbs",
			helpers: {
				equals: (a, b, c) => {
					return a == b ? c : "";
				}
			}
		}));
		this.app.set('view engine', 'hbs');

		this.app.get("/login/", (req, res) => {
			res.render("defaults/login", {
				title: "Login | " + this.variables.website_name,
				showNav: false,
				pageCSS: this.generateCSS(["/css/login.css"]),
			});
		});
	}

	/**
	 * Create a custom page for the CMS.
	 * @param {string} path 
	 * @param {string} file 
	 * @param {object} options
	 * @param {boolean} [options.showInNavigation] Default is `false`
	 * @param {string} [options.navName] Default is `blank`
	 * @param {boolean} [options.showBreadCrumb] Default is `false`\
	 * @param {string} [options.pageTitle] Default is `website_name`
	 */
	createPage(path, file, options) {
		if (options.hasOwnProperty("showInNavigation") && options.showInNavigation) {
			this.nav.push({
				text: options.hasOwnProperty("navName") && options.navName != undefined ? options.navName : file,
				link: path
			});
			this.updateNavigation();
		}

		this.app.get(path, (req, res) => {
			let breadCrumb;
			if (options.hasOwnProperty("showBreadCrumb") && options.showBreadCrumb)
				breadCrumb = this.generateBreadCrumb(req.route.path);
			res.render(file, utils.merge_options({
				current_path: req.route.path,
				title: options.hasOwnProperty("pageTitle") && options.pageTitle != undefined ? options.pageTitle : this.defaultTitle,
				showBreadCrumb: options.hasOwnProperty("showBreadCrumb") && options.showBreadCrumb,
				breadCrumbSteps: breadCrumb
			}, this.variables));
		});
	}

	generateCSS(links) {
		let temp = "";
		for (var i = 0; i < links.length; i++) {
			temp += "<link href=\"" + links[i] + "\" rel=\"stylesheet\">";
		}
		return temp;
	}

	/**
	 * Generate an array of bread crumb link trails.
	 * @param {string} path Url Path
	 * @returns {array}
	 */
	generateBreadCrumb(path) {
		let breadCrumb = [];
		let steps = path.split(/\//);
		if (steps[steps.length - 1] === "")
			steps.pop();
		for (var i = 0; i < steps.length; i++) {
			let crumb = {
				name: utils.ucwords(steps[i].split("-").join(" ")),
				active: false
			};
			if (i === steps.length - 1)
				crumb.active = true;
			if (steps[i].length !== 0)
				breadCrumb.push(crumb);
			if (i === 0) {
				breadCrumb.push({
					name: "Home",
					link: "/"
				});
			}
		}

		return breadCrumb;
	}

	updateNavigation() {
		this.variables.nav = this.nav;
	}

	/**
	 * Get the set default website name.
	 * @returns {string}
	 */
	getWebsiteName() {
		return this.variables.website_name;
	}
}

module.exports = Site;