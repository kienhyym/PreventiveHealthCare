define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/9thangmodel.html');
    
    var BaoCaoModelView 	= require('app/view/BaoCao/6ThangModelView');
    var readonly = false;
    
    return BaoCaoModelView.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocao",
    	loaikybaocao: 4,
    });
    
});