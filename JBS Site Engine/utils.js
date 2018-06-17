/*
 * @Author: Matthew Auld 
 * @Date: 2018-06-17 01:01:47 
 * @Last Modified by: Matthew Auld
 * @Last Modified time: 2018-06-17 02:07:49
 * @File: utils.js
 * Copyright 2018 JumpButton North - All rights reserved. 
 */

'use strict';

class Utils {
	/**
	 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
	 * @param obj1
	 * @param obj2
	 * @returns obj3 a new object based on obj1 and obj2
	 */
	merge_options(obj1, obj2) {
		var obj3 = {};
		for (var attrname in obj1) {
			obj3[attrname] = obj1[attrname];
		}
		for (var attrname in obj2) {
			obj3[attrname] = obj2[attrname];
		}
		return obj3;
	}

	ucwords(str) {
		return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();
		});
	}
};

module.exports = new Utils;