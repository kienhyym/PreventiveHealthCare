define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/hanghoamodel.html'),
    	schema 				= require('json!app/view/BaoCao/HangHoaSchema.json');
    
    var Model = Gonrin.Model.extend({
    	congdon: function(attr){
			var val = 0;
			try{
				val = this.modelData[this.get("tencuakhau")][attr];
			} catch (error) {
				//console.log(error);
			}
			return  this.get(attr) != null ? this.get(attr) + val : val;
    	},
    	computeds: {
    		cd_hh_nc_bpbk_sl: function() {
    			return this.congdon("hh_nc_bpbk_sl");
    	    },
    	    cd_hh_nc_hhk_sxl: function() {
    			return this.congdon("hh_nc_hhk_sxl");
    	    },
    	    cd_hh_nc_bpbk_sxl: function() {
    			return this.congdon("hh_nc_bpbk_sxl");
    	    },
    	    cd_hh_nc_hhk_tl: function() {
    			return this.congdon("hh_nc_hhk_tl");
    	    },
    	    
    	    cd_hh_nc_bpbk_skt: function() {
    			return this.congdon("hh_nc_bpbk_skt");
    	    },
    	    cd_hh_nc_hhk_skt: function() {
    			return this.congdon("hh_nc_hhk_skt");
    	    },
    	    
    	    
    	    cd_hh_xc_bpbk_sl: function() {
    			return this.congdon("hh_xc_bpbk_sl");
    	    },
    	    cd_hh_xc_hhk_sxl: function() {
    			return this.congdon("hh_xc_hhk_sxl");
    	    },
    	    cd_hh_xc_bpbk_sxl: function() {
    			return this.congdon("hh_xc_bpbk_sxl");
    	    },
    	    cd_hh_xc_hhk_tl: function() {
    			return this.congdon("hh_xc_hhk_tl");
    	    },
    	    
    	    cd_hh_xc_bpbk_skt: function() {
    			return this.congdon("hh_xc_bpbk_skt");
    	    },
    	    cd_hh_xc_hhk_skt: function() {
    			return this.congdon("hh_xc_hhk_skt");
    	    },
    	    
    	    cd_hh_qc_bpbk_sl: function() {
    			return this.congdon("hh_qc_bpbk_sl");
    	    },
    	    cd_hh_qc_hhk_sxl: function() {
    			return this.congdon("hh_qc_hhk_sxl");
    	    },
    	    cd_hh_qc_bpbk_sxl: function() {
    			return this.congdon("hh_qc_bpbk_sxl");
    	    },
    	    cd_hh_qc_hhk_tl: function() {
    			return this.congdon("hh_qc_hhk_tl");
    	    },
    	    
    	    cd_hh_qc_bpbk_skt: function() {
    			return this.congdon("hh_qc_bpbk_skt");
    	    },
    	    cd_hh_qc_hhk_skt: function() {
    			return this.congdon("hh_qc_hhk_skt");
    	    },
    	},
    	urlRoot : "/api/v1/banghanghoa"
    });
    
    return Gonrin.ItemView.extend({
    	template : template,
    	modelSchema	: schema,
    	modelClass: Model,
    	urlPrefix: "/api/v1/",
    	collectionName: "banghanghoa",
    	foreignRemoteField: "id",
    	foreignField: "baocao_id",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
      	],
    	render:function(){
    		this.setElement(this.el.innerHTML);
    		this.applyBindings();
    	},
    });
    
});