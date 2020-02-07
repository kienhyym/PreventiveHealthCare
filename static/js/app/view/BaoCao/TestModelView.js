define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/BaoCao/test.html'),
    	schema 				= require('json!app/view/BaoCao/Schema.json');
    
    
    return Gonrin.View.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocao",
    	tools:null,
    	
	    render:function(){
			
            var self = this;
            
			var MODEL = Backbone.Model.extend({
                defaults:{
                    HoVaTen:'',
                    GioiTinh:'',
                    Tuoi:'',
                    diadiem:'',
                    NgayThangNam:'',
                }
            })
            var COLLECTION = Backbone.Collection.extend({
                model:MODEL
            })
            
            
	    	return this;
    	},
    	
    });

});