/*
 * @Author: Matthew Auld 
 * @Date: 2018-06-16 23:41:27 
 * @Last Modified by: Matthew Auld
 * @Last Modified time: 2018-06-17 04:02:57
 * @File: server.js
 * Copyright 2018 JumpButton North - All rights reserved. 
 */

const logger = require("jbs-simple-console-logger");
const PORT = 8080;
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public/"));

const Engine = require("./JBS Site Engine/index");
const site = new Engine(app, {
	showLoginInNav: true
});

site.createPage("/", "home", {
	navName: "Home",
	showInNavigation: true,
	showBreadCrumb: false
});

site.createPage("/contact-us/", "contact", {
	showInNavigation: true,
	showBreadCrumb: true,
	navName: "Contact Us",
	pageTitle: "Contact Us | " + site.getWebsiteName()
});

app.listen(PORT, () => {
	logger.info("Server", "Ready. Now Listening for Viewers.");
});