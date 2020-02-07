define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		

		{
			"collectionName": "tokhaiytedoivoinguoi",
			"route": "tokhaiytedoivoinguoi/collection",
			"$ref": "app/tokhaiytedoivoinguoi/js/CollectionView",
		},
		{
			"collectionName": "tokhaiytedoivoinguoi",
			"route": "tokhaiytedoivoinguoi/model(/:id)",
			"$ref": "app/tokhaiytedoivoinguoi/js/ModelView",
		},


		
	];

});


