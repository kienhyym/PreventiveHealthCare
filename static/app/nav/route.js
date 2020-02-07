define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		

		{
			"collectionName": "tokhaiyte",
			"route": "tokhaiyte/collection",
			"$ref": "app/tokhaiyte/js/CollectionView",
		},
		{
			"collectionName": "tokhaiyte",
			"route": "tokhaiyte/model(/:id)",
			"$ref": "app/tokhaiyte/js/ModelView",
		},


		
	];

});


