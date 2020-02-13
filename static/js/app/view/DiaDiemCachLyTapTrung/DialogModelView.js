define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/DiaDiemCachLyTapTrung/model.html'),
    	schema 				= require('json!app/view/DiaDiemCachLyTapTrung/Schema.json');
    
    return Gonrin.ModelDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "diadiemcachlytaptrung",
		tools : [
			{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "back",
						type: "button",
						buttonClass: "btn-default btn-sm",
						label: "TRANSLATE:BACK",
						command: function(){
							var self = this;
							self.close();
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:SAVE",
						command: function(){
							var self = this;
							self.model.save(null,{
								success: function (model, respose, options) {
									self.getApp().notify("Save successfully");
									self.trigger("close", {refresh:true});
									self.close();
								},
								error: function (model, xhr, options) {
									self.getApp().notify('Save error');
								}
							});
						}
					},
					{
						name: "delete",
		    	    	type: "button",
		    	    	buttonClass: "btn-danger btn-sm",
						label: "TRANSLATE:DELETE",
						visible: function(){
							var self = this;
							var id = self.viewData.id;
		    	    		return id !== null;
		    	    	},
		    	    	command: function(){
		    	    		var self = this;
		                    self.model.destroy({
		                        success: function(model, response) {
		                            self.trigger("close", {refresh:true});
									self.close();
		                        },
		                        error: function (model, xhr, options) {
		                            //self.alertMessage("Something went wrong while processing the model", false);
		                            self.getApp().notify('Delete error');
		                        }
		                    });
		    	    	}
					},
				]
			},
		],
    	render:function(){
    		var self = this;
			var id = self.viewData.id;
			var donvi_id = self.viewData.donvi_id;
			var cuakhau_id = self.viewData.cuakhau_id;
			console.log(self.viewData);
    		if(id){
    			//progresbar quay quay
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        			},
        			error:function(){
    					self.getApp().notify("Get data Eror");
    				},
        		});
    		}else{
				self.model.set("donvi_id", donvi_id);
				// self.model.set("cuakhau_id", cuakhau_id);
    			self.applyBindings();
    		}
    		
    	},
    });

});