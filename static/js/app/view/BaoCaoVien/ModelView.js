define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var schema 				= require('json!app/view/BaoCaoVien/Schema.json');
    var template 				= require('text!tpl/BaoCaoVien/model.html');
    
    var CanBoModelView = require("app/view/BaoCaoVien/CanBoModelView");
    var SuKienModelView = require("app/view/BaoCaoVien/SuKienModelView");
    var HoatDongChungModelView = require("app/view/BaoCaoVien/HoatDongChungModelView");
    var readonly = false;
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocaovien",
    	loaikybaocao: null,
    	uiControl:[
    				{
    				    field: "kybaocao",
    				    cssClass: false
    				},
    				{
    				    field: "nambaocao",
    				    cssClass: false
    				},
    				{
    				    field: "ma",
    				    cssClass: false
    				},
    				{
    					field: "bangviencanbo",
    					uicontrol: false,
    					itemView: CanBoModelView,
    					tools:[
    						{
    							   name: "create",
    							   type: "button",
    							   buttonClass: "btn-success btn-xs",
    							   label: "TRANSLATE:CREATE",
    							   command: "create"
    						},
    					],
    					toolEl: "#canbotool"
    				},
    				{
    					field: "bangviensukien",
    					uicontrol: false,
    					itemView: SuKienModelView,
    					tools:[
    						{
    							   name: "create",
    							   type: "button",
    							   buttonClass: "btn-success btn-xs",
    							   label: "TRANSLATE:CREATE",
    							   command: "create"
    						},
    					],
    					toolEl: "#sukientool"
    				},
    				{
    					field: "bangvienhoatdongchung",
    					uicontrol: false,
    					itemView: HoatDongChungModelView,
    					tools:[
    						{
    							   name: "create",
    							   type: "button",
    							   buttonClass: "btn-success btn-xs",
    							   label: "TRANSLATE:CREATE",
    							   command: "create"
    						},
    					],
    					toolEl: "#hoatdongchungtool"
    				},
    	],
    	tools : [
    				{
    					name: "back",
    					type: "button",
    					buttonClass: "btn-default btn-sm",
    					label: "TRANSLATE:BACK",
    					command: function(){
    						this.getApp().getRouter().navigate("baocaovien/collection");
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
    				                /*reload view to rebind itemView*/
    				                //Backbone.history.loadUrl(Backbone.history.fragment);
    				                self.getApp().getRouter().navigate("baocaovien/collection");
    				                
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
    						return (this.getApp().getRouter().getParam("id") !== null && readonly === false);
    					},
    					command: function(){
    						var self = this;
    						var url = "baocaovien/collection";
    				        self.model.destroy({
    				            success: function(model, response) {
    				                self.getApp().getRouter().navigate(url);
    				            },
    				            error: function (model, xhr, options) {
    				                self.getApp().notify('Delete error');
    				            }
    				        });
    					}
    				},
    	],
    	
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		var url = "/api/v1/getbaocaovien";
    		$.ajax({
				url: url,
				dataType: "json",
				data: {"id": id},
				contentType: "application/json",
				success: function(data) {
					if((!!data.baocao) && (!!data.baocao.donvi)){
						self.model.set(data.baocao);
						//self.viewData = {"congdon": data.congdon}
						self.applyBindings();
						self.$el.find("#chuquan").html(data.baocao.donvi.coquanchuquan);
						self.$el.find("#tendonvi").html(data.baocao.donvi.ten);
						//if(self.loaikybaocao == 5){
						//	self.renderCuaKhau(data.cuakhau);
						//}
					}
				},
			});
    		
    		
    		
    		/*if(id){
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
    			self.applyBindings();
    		}*/
		
    	},
    });
    
});