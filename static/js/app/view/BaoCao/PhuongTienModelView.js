define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/phuongtienmodel.html'),
    	schema 				= require('json!app/view/BaoCao/PhuongTienSchema.json');
    
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
    		cd_pt_nc_hk_sl: function() {
    			return this.congdon("pt_nc_hk_sl");
    	    },
    	    cd_pt_nc_hk_skt: function() {
    			return this.congdon("pt_nc_hk_skt");
    	    },
    	    cd_pt_nc_hk_sxl: function() {
    			return this.congdon("pt_nc_hk_sxl");
    	    },
    	    cd_pt_nc_db_sl: function() {
    			return this.congdon("pt_nc_db_sl");
    	    },
    	    
    	    cd_pt_nc_db_skt: function() {
    			return this.congdon("pt_nc_db_skt");
    	    },
    	    cd_pt_nc_db_sxl: function() {
    			return this.congdon("pt_nc_db_sxl");
    	    },
    	    cd_pt_nc_dt_sl: function() {
    			return this.congdon("pt_nc_dt_sl");
    	    },
    	    cd_pt_nc_dt_skt: function() {
    			return this.congdon("pt_nc_dt_skt");
    	    },
    	    
    	    cd_pt_nc_dt_sxl: function() {
    			return this.congdon("pt_nc_dt_sxl");
    	    },
    	    cd_pt_nc_ds_sl: function() {
    			return this.congdon("pt_nc_ds_sl");
    	    },
    	    cd_pt_nc_ds_skt: function() {
    			return this.congdon("pt_nc_ds_skt");
    	    },
    	    cd_pt_nc_ds_sxl: function() {
    			return this.congdon("pt_nc_ds_sxl");
    	    },
    	    
    	    cd_pt_xc_hk_sl: function() {
    			return this.congdon("pt_xc_hk_sl");
    	    },
    	    cd_pt_xc_hk_skt: function() {
    			return this.congdon("pt_xc_hk_skt");
    	    },
    	    cd_pt_xc_hk_sxl: function() {
    			return this.congdon("pt_xc_hk_sxl");
    	    },
    	    cd_pt_xc_db_sl: function() {
    			return this.congdon("pt_xc_db_sl");
    	    },
    	    
    	    cd_pt_xc_db_skt: function() {
    			return this.congdon("pt_xc_db_skt");
    	    },
    	    cd_pt_xc_db_sxl: function() {
    			return this.congdon("pt_xc_db_sxl");
    	    },
    	    cd_pt_xc_dt_sl: function() {
    			return this.congdon("pt_xc_dt_sl");
    	    },
    	    cd_pt_xc_dt_skt: function() {
    			return this.congdon("pt_xc_dt_skt");
    	    },
    	    
    	    cd_pt_xc_dt_sxl: function() {
    			return this.congdon("pt_xc_dt_sxl");
    	    },
    	    cd_pt_xc_ds_sl: function() {
    			return this.congdon("pt_xc_ds_sl");
    	    },
    	    cd_pt_xc_ds_skt: function() {
    			return this.congdon("pt_xc_ds_skt");
    	    },
    	    cd_pt_xc_ds_sxl: function() {
    			return this.congdon("pt_xc_ds_sxl");
    	    },
    	    
    	    cd_pt_qc_hk_sl: function() {
    			return this.congdon("pt_qc_hk_sl");
    	    },
    	    cd_pt_qc_hk_skt: function() {
    			return this.congdon("pt_qc_hk_skt");
    	    },
    	    cd_pt_qc_hk_sxl: function() {
    			return this.congdon("pt_qc_hk_sxl");
    	    },
    	    cd_pt_qc_db_sl: function() {
    			return this.congdon("pt_qc_db_sl");
    	    },
    	    
    	    cd_pt_qc_db_skt: function() {
    			return this.congdon("pt_qc_db_skt");
    	    },
    	    cd_pt_qc_db_sxl: function() {
    			return this.congdon("pt_qc_db_sxl");
    	    },
    	    cd_pt_qc_dt_sl: function() {
    			return this.congdon("pt_qc_dt_sl");
    	    },
    	    cd_pt_qc_dt_skt: function() {
    			return this.congdon("pt_qc_dt_skt");
    	    },
    	    
    	    cd_pt_qc_dt_sxl: function() {
    			return this.congdon("pt_qc_dt_sxl");
    	    },
    	    cd_pt_qc_ds_sl: function() {
    			return this.congdon("pt_qc_ds_sl");
    	    },
    	    cd_pt_qc_ds_skt: function() {
    			return this.congdon("pt_qc_ds_skt");
    	    },
    	    cd_pt_qc_ds_sxl: function() {
    			return this.congdon("pt_qc_ds_sxl");
    	    },
    	},
    	urlRoot : "/api/v1/bangphuongtien"
    });
    
    return Gonrin.ItemView.extend({
    	template : template,
    	modelSchema	: schema,
    	modelClass: Model,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangphuongtien",
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