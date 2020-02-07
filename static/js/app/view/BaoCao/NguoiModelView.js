define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/nguoimodel.html'),
    	schema 				= require('json!app/view/BaoCao/NguoiSchema.json');
    
    var Model = Gonrin.Model.extend({
    	//defaults: Gonrin.getDefaultModel(schema),
    	congdon: function(attr){
    		var self = this;
			var val = 0;
			try{
				val = this.modelData[this.get("tencuakhau")][attr];
				//console.log(val + " abc");
			} catch (error) {
				console.log("error CK", self.toJSON());
				console.log("error", self.get("tencuakhau"));
				console.log("error", self.modelData, self.modelData[self.get("tencuakhau")]);
				console.log(error);
			}
			console.log(this.get(attr) != null ? this.get(attr) + val : val);
			return  this.get(attr) != null ? this.get(attr) + val : val;
    	},
    	computeds: {
    		cd_ng_nc_ts1: function() {
    			return this.congdon("ng_nc_ts1");
    	    },
    	    cd_ng_nc_ts2: function() {
    			return this.congdon("ng_nc_ts2");
    	    },
    	    cd_ng_nc_sl1: function() {
    			return this.congdon("ng_nc_sl1");
    	    },
    	    cd_ng_nc_sl2: function() {
    			return this.congdon("ng_nc_sl2");
    	    },
    	    
    	    cd_ng_xc_ts1: function() {
    			return this.congdon("ng_xc_ts1");
    	    },
    	    cd_ng_xc_ts2: function() {
    			return this.congdon("ng_xc_ts2");
    	    },
    	    cd_ng_xc_sl1: function() {
    			return this.congdon("ng_xc_sl1");
    	    },
    	    cd_ng_xc_sl2: function() {
    			return this.congdon("ng_xc_sl2");
    	    },
    	    
    	    cd_ng_qc_ts1: function() {
    			return this.congdon("ng_qc_ts1");
    	    },
    	    cd_ng_qc_ts2: function() {
    			return this.congdon("ng_qc_ts2");
    	    },
    	    cd_ng_qc_sl1: function() {
    			return this.congdon("ng_qc_sl1");
    	    },
    	    cd_ng_qc_sl2: function() {
    			return this.congdon("ng_qc_sl2");
    	    },
    	},
    	urlRoot : "/api/v1/bangnguoi"
    });
    
    return Gonrin.ItemView.extend({
    	template : template,
    	modelSchema	: schema,
    	modelClass: Model,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangnguoi",
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