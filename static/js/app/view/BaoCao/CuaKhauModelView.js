define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/cuakhaumodel.html'),
    	schema 				= require('json!app/view/HeThong/CuaKhau/Schema.json');
    
    var Model = Gonrin.Model.extend({
    	//defaults: Gonrin.getDefaultModel(schema),
    	getcheck: function(attr){
			var val = "";
			try{
				val = this.get(attr) ? "(x)" : "";
			} catch (error) {
				//console.log(error);
			}
			return  val;
    	},
    	getfalsecheck: function(attr){
			var val = "";
			try{
				val = this.get(attr) ? "" : "(x)";
			} catch (error) {
				//console.log(error);
			}
			return  val;
    	},
    	computeds: {
    		lbl_duongboquocte: function() {
    			return this.getcheck("duongboquocte");
    	    },
    	    lbl_duongbochinh: function() {
    			return this.getcheck("duongbochinh");
    	    },
    	    lbl_duongbophu: function() {
    			return this.getcheck("duongbophu");
    	    },
    	    lbl_duongsat: function() {
    			return this.getcheck("duongsat");
    	    },
    	    
    	    lbl_duonghangkhong: function() {
    			return this.getcheck("duonghangkhong");
    	    },
    	    lbl_duongthuyloai1: function() {
    			return this.getcheck("duongthuyloai1");
    	    },
    	    lbl_duongthuyloai2: function() {
    			return this.getcheck("duongthuyloai2");
    	    },
    	    lbl_phongcachly: function() {
    			return this.getcheck("phongcachly");
    	    },
    	    lbl_kiemdichyte: function() {
    			return this.getcheck("kiemdichyte");
    	    },
    	    lbl_not_phongcachly: function() {
    			return this.getfalsecheck("phongcachly");
    	    },
    	    lbl_not_kiemdichyte: function() {
    			return this.getfalsecheck("kiemdichyte");
    	    },
    	},
    	urlRoot : "/api/v1/bangnguoi"
    });
    
    return Gonrin.ModelView.extend({
    	template : template,
    	tagName: 'tr',
    	modelSchema	: schema,
    	modelClass: Model,
    	urlPrefix: "/api/v1/",
    	collectionName: "cuakhau",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
      	],
    	render:function(){
    		this.applyBindings();
    	},
    });
    
});