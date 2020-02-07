define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/thithemodel.html'),
    	schema 				= require('json!app/view/BaoCao/ThiTheSchema.json');
    
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
    		cd_tt_nc_hc_sl: function() {
    			return this.congdon("tt_nc_hc_sl");
    	    },
    	    cd_tt_nc_tt_skt: function() {
    			return this.congdon("tt_nc_tt_skt");
    	    },
    	    cd_tt_nc_hc_skt: function() {
    			return this.congdon("tt_nc_hc_skt");
    	    },
    	    cd_tt_nc_hc_sxl: function() {
    			return this.congdon("tt_nc_hc_sxl");
    	    },
    	    cd_tt_nc_tt_sl: function() {
    			return this.congdon("tt_nc_tt_sl");
    	    },
    	    cd_tt_nc_tt_sxl: function() {
    			return this.congdon("tt_nc_tt_sxl");
    	    },
    	    cd_tt_nc_tc_sl: function() {
    			return this.congdon("tt_nc_tc_sl");
    	    },
    	    cd_tt_nc_tc_skt: function() {
    			return this.congdon("tt_nc_tc_skt");
    	    },
    	    cd_tt_nc_tc_sxl: function() {
    			return this.congdon("tt_nc_tc_sxl");
    	    },
    	    
    	    cd_tt_xc_tt_sl: function() {
    			return this.congdon("tt_xc_tt_sl");
    	    },
    	    cd_tt_xc_hc_sl: function() {
    			return this.congdon("tt_xc_hc_sl");
    	    },
    	    cd_tt_xc_tt_skt: function() {
    			return this.congdon("tt_xc_tt_skt");
    	    },
    	    cd_tt_xc_hc_skt: function() {
    			return this.congdon("tt_xc_hc_skt");
    	    },
    	    cd_tt_xc_hc_sxl: function() {
    			return this.congdon("tt_xc_hc_sxl");
    	    },
    	    cd_tt_xc_tt_sl: function() {
    			return this.congdon("tt_xc_tt_sl");
    	    },
    	    cd_tt_xc_tt_sxl: function() {
    			return this.congdon("tt_xc_tt_sxl");
    	    },
    	    cd_tt_xc_tc_sl: function() {
    			return this.congdon("tt_xc_tc_sl");
    	    },
    	    cd_tt_xc_tc_skt: function() {
    			return this.congdon("tt_xc_tc_skt");
    	    },
    	    cd_tt_xc_tc_sxl: function() {
    			return this.congdon("tt_xc_tc_sxl");
    	    },
    	    
    	    cd_tt_qc_tt_sl: function() {
    			return this.congdon("tt_qc_tt_sl");
    	    },
    	    cd_tt_qc_hc_sl: function() {
    			return this.congdon("tt_qc_hc_sl");
    	    },
    	    cd_tt_qc_tt_skt: function() {
    			return this.congdon("tt_qc_tt_skt");
    	    },
    	    cd_tt_qc_hc_skt: function() {
    			return this.congdon("tt_qc_hc_skt");
    	    },
    	    cd_tt_qc_hc_sxl: function() {
    			return this.congdon("tt_qc_hc_sxl");
    	    },
    	    cd_tt_qc_tt_sl: function() {
    			return this.congdon("tt_qc_tt_sl");
    	    },
    	    cd_tt_qc_tt_sxl: function() {
    			return this.congdon("tt_qc_tt_sxl");
    	    },
    	    cd_tt_qc_tc_sl: function() {
    			return this.congdon("tt_qc_tc_sl");
    	    },
    	    cd_tt_qc_tc_skt: function() {
    			return this.congdon("tt_qc_tc_skt");
    	    },
    	    cd_tt_qc_tc_sxl: function() {
    			return this.congdon("tt_qc_tc_sxl");
    	    },
    	},
    	urlRoot : "/api/v1/bangthithe"
    });
    
    return Gonrin.ItemView.extend({
    	template : template,
    	modelSchema	: schema,
    	modelClass: Model,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangthithe",
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