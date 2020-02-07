define(function (require) {
	"use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    return [
			/*{
				"text": "Index",
			    "type":"view",
			    "collectionName":"index",
			    "route":"index",
			    "$ref": "app/bases/IndexView",
			    "visible": false
			},*/
            
            {
        		"text":"Danh mục",
        		"icon":"/static/images/icons/task_120.png",
        		"type":"category",
        		"visible": function(){
			    	//console.log(this.checkHasRole("Admin"));
			    	return this.checkHasRole("Admin") ;
			    },
        		"entries":[
        			{
        			    "text":"Quốc gia",
        			    "type":"view",
        			    "collectionName":"quocgia",
        			    "route":"quocgia/collection",
        			    "$ref": "app/view/DanhMuc/QuocGia/CollectionView",
        			    "visible": function(){
        			    	//console.log(this.checkHasRole("Admin"));
        			    	return this.checkHasRole("Admin") ;
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"quocgia",
        			    "route":"quocgia/model(/:id)",
        			    "$ref": "app/view/DanhMuc/QuocGia/ModelView",
        			    "visible": false
        			},
        			{
        			    "text":"Tỉnh thành",
        			    "type":"view",
        			    "collectionName":"tinhthanh",
        			    "route":"tinhthanh/collection",
        			    "$ref": "app/view/DanhMuc/TinhThanh/CollectionView",
        			    "visible": function(){
        			    	return this.checkHasRole("Admin") ;
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"tinhthanh",
        			    "route":"tinhthanh/model(/:id)",
        			    "$ref": "app/view/DanhMuc/TinhThanh/ModelView2",
        			    "visible": false
        			},
        		]
            },
        ];

});


