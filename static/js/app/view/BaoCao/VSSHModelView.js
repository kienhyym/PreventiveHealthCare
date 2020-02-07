define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/vsshmodel.html'),
    	schema 				= require('json!app/view/BaoCao/VSSHSchema.json');
    
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
    		cd_vssh_nc_sh_skt: function() {
    			return this.congdon("vssh_nc_sh_skt");
    	    },
    	    cd_vssh_nc_vs_sl: function() {
    			return this.congdon("vssh_nc_vs_sl");
    	    },
    	    cd_vssh_nc_mo_skt: function() {
    			return this.congdon("vssh_nc_mo_skt");
    	    },
    	    cd_vssh_nc_mo_sxl: function() {
    			return this.congdon("vssh_nc_mo_sxl");
    	    },
    	    cd_vssh_nc_sh_sl: function() {
    			return this.congdon("vssh_nc_sh_sl");
    	    },
    	    cd_vssh_nc_vs_sxl: function() {
    			return this.congdon("vssh_nc_vs_sxl");
    	    },
    	    cd_vssh_nc_vs_skt: function() {
    			return this.congdon("vssh_nc_vs_skt");
    	    },
    	    cd_vssh_nc_sh_sxl: function() {
    			return this.congdon("vssh_nc_sh_sxl");
    	    },
    	    cd_vssh_nc_mo_sl: function() {
    			return this.congdon("vssh_nc_mo_sl");
    	    },
    	    
    	    
    	    cd_vssh_xc_sh_skt: function() {
    			return this.congdon("vssh_xc_sh_skt");
    	    },
    	    cd_vssh_xc_vs_sl: function() {
    			return this.congdon("vssh_xc_vs_sl");
    	    },
    	    cd_vssh_xc_mo_skt: function() {
    			return this.congdon("vssh_xc_mo_skt");
    	    },
    	    cd_vssh_xc_mo_sxl: function() {
    			return this.congdon("vssh_xc_mo_sxl");
    	    },
    	    cd_vssh_xc_sh_sl: function() {
    			return this.congdon("vssh_xc_sh_sl");
    	    },
    	    cd_vssh_xc_vs_sxl: function() {
    			return this.congdon("vssh_xc_vs_sxl");
    	    },
    	    cd_vssh_xc_vs_skt: function() {
    			return this.congdon("vssh_xc_vs_skt");
    	    },
    	    cd_vssh_xc_sh_sxl: function() {
    			return this.congdon("vssh_xc_sh_sxl");
    	    },
    	    cd_vssh_xc_mo_sl: function() {
    			return this.congdon("vssh_xc_mo_sl");
    	    },
    	    
    	    cd_vssh_qc_sh_skt: function() {
    			return this.congdon("vssh_qc_sh_skt");
    	    },
    	    cd_vssh_qc_vs_sl: function() {
    			return this.congdon("vssh_qc_vs_sl");
    	    },
    	    cd_vssh_qc_mo_skt: function() {
    			return this.congdon("vssh_qc_mo_skt");
    	    },
    	    cd_vssh_qc_mo_sxl: function() {
    			return this.congdon("vssh_qc_mo_sxl");
    	    },
    	    cd_vssh_qc_sh_sl: function() {
    			return this.congdon("vssh_qc_sh_sl");
    	    },
    	    cd_vssh_qc_vs_sxl: function() {
    			return this.congdon("vssh_qc_vs_sxl");
    	    },
    	    cd_vssh_qc_vs_skt: function() {
    			return this.congdon("vssh_qc_vs_skt");
    	    },
    	    cd_vssh_qc_sh_sxl: function() {
    			return this.congdon("vssh_qc_sh_sxl");
    	    },
    	    cd_vssh_qc_mo_sl: function() {
    			return this.congdon("vssh_qc_mo_sl");
    	    },
    	},
    	urlRoot : "/api/v1/bangvssh"
    });
    
    return Gonrin.ItemView.extend({
    	template : template,
    	modelSchema	: schema,
    	modelClass: Model,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangvssh",
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