define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var schema 				= require('json!app/view/BaoCao/Schema.json');
    var readonly = false;
    
    return Gonrin.ModelView.extend({
    	template : null,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocao",
    	loaikybaocao: null,
    	tools: null,
    	extratools : [
    				{
    					name: "back",
    					type: "button",
    					buttonClass: "btn-default btn-sm",
    					label: "TRANSLATE:BACK",
    					command: function(){
    						var self = this;
    						var url = "";
    						if(self.model.get("loaibaocao") == 1){
    							url = "baocao/timkiem";
			                }else{
			                	url = "baocao/timkiemck";
			                }
    				        self.getApp().getRouter().navigate(url);
    					}
    				},
    				{
    					name: "save",
    					type: "button",
    					buttonClass: "btn-success btn-sm",
    					label: "TRANSLATE:SAVE",
    					visible: function(){
    						var tinhtrang = this.model.get("tinhtrang");
				    		return (tinhtrang < 2) && ((!!this.getApp().currentUser.hasRole("DonViUser"))
    						|| (!!this.getApp().currentUser.hasRole("CuaKhauUser")));
    					},
    					command: function(){
    						var self = this;
    				        self.model.save(null,{
    				            success: function (model, respose, options) {
    				                self.getApp().notify("Save successfully");
    				                /*reload view to rebind itemView*/
    				                //Backbone.history.loadUrl(Backbone.history.fragment);
    				                if(self.model.get("loaibaocao") == 1){
    				                	self.getApp().getRouter().navigate("baocao/timkiem");
    				                }else{
    				                	self.getApp().getRouter().navigate("baocao/timkiemck");
    				                }
    				                
    				            },
    				            error: function (model, xhr, options) {
    				                self.getApp().notify('Save error');
    				            }
    				        });
    					}
    				},
    				{
						name : "extragr2",
						type : "group",
						groupClass : "toolbar-group",
						buttons : [ {
							name : "activate",
							type : "button",
							buttonClass : "btn-default btn-sm btn-warning",
							label : "Duyệt",
							command : function() {
								var self = this;
								self.model.set("tinhtrang", 2);
								self.model.save(null,{
			                        success: function (model, respose, options) {
			                            self.getApp().notify("Save successfully");
			                            if(self.model.get("loaibaocao") == 1){
	    				                	self.getApp().getRouter().navigate("baocao/timkiem");
	    				                }else{
	    				                	self.getApp().getRouter().navigate("baocao/timkiemck");
	    				                }
			                        },
			                        error: function (model, xhr, options) {
			                            //self.alertMessage("Something went wrong while processing the model", false);
			                            self.getApp().notify('Save error');
			                            
			                        }
			                    });
								// self.getApp().getRouter().navigate(self.collectionName + "/collection");
							},
							visible: function(){
								var tinhtrang = this.model.get("tinhtrang");
								var id =  this.model.get("id");
								return (id !== null)&&(!!this.getApp().currentUser) 
									&& (!!this.getApp().currentUser.hasRole("DonViAdmin"))
									&& (tinhtrang < 2);
							}
						},
						{
							name : "deactivate",
							type : "button",
							buttonClass : "btn-default btn-sm btn-warning",
							label : "Bỏ duyệt",
							command : function() {
								var self = this;
								self.model.set("tinhtrang", 1);
								self.model.save(null,{
			                        success: function (model, respose, options) {
			                            self.getApp().notify("Save successfully");if(self.model.get("loaibaocao") == 1){
	    				                self.getApp().getRouter().navigate("baocao/timkiem");
	    				                }else{
	    				                	self.getApp().getRouter().navigate("baocao/timkiemck");
	    				                }
			                        },
			                        error: function (model, xhr, options) {
			                            //self.alertMessage("Something went wrong while processing the model", false);
			                            self.getApp().notify('Save error');
			                            
			                        }
			                    });
								// self.getApp().getRouter().navigate(self.collectionName + "/collection");
							},
							visible: function(){
								var tinhtrang = this.model.get("tinhtrang");
								var id =  this.getApp().getRouter().getParam("id");
								var tinhtrang = this.model.get("tinhtrang");
								var id =  this.model.get("id");
								return (id !== null)&&(!!this.getApp().currentUser) 
									&& (!!this.getApp().currentUser.hasRole("DonViAdmin"))
									&& (tinhtrang == 2);
							}
						}]
					},
    				
    				
    				{
						name : "extragr",
						type : "group",
						groupClass : "toolbar-group",
						buttons : [ {
							name : "lock",
							type : "button",
							buttonClass : "btn-default btn-sm btn-warning",
							label : "Khoá",
							command : function() {
								var self = this;
								self.model.set("tinhtrang", 3);
								self.model.save(null,{
			                        success: function (model, respose, options) {
			                            self.getApp().notify("Save successfully");
			                            if(self.model.get("loaibaocao") == 1){
	    				                	self.getApp().getRouter().navigate("baocao/timkiem");
	    				                }else{
	    				                	self.getApp().getRouter().navigate("baocao/timkiemck");
	    				                }
			                        },
			                        error: function (model, xhr, options) {
			                            //self.alertMessage("Something went wrong while processing the model", false);
			                            self.getApp().notify('Save error');
			                            
			                        }
			                    });
								// self.getApp().getRouter().navigate(self.collectionName + "/collection");
							},
							visible: function(){
								var tinhtrang = this.model.get("tinhtrang");
								var id =  this.model.get("id");
								return (id !== null)&&(!!this.getApp().currentUser) 
									&& (!!this.getApp().currentUser.hasRole("Admin"))
									&& (tinhtrang !== 3);
							}
						},
						{
							name : "unlock",
							type : "button",
							buttonClass : "btn-default btn-sm btn-warning",
							label : "Mở khoá",
							command : function() {
								var self = this;
								self.model.set("tinhtrang", 1);
								self.model.save(null,{
			                        success: function (model, respose, options) {
			                            self.getApp().notify("Save successfully");if(self.model.get("loaibaocao") == 1){
	    				                self.getApp().getRouter().navigate("baocao/timkiem");
	    				                }else{
	    				                	self.getApp().getRouter().navigate("baocao/timkiemck");
	    				                }
			                        },
			                        error: function (model, xhr, options) {
			                            //self.alertMessage("Something went wrong while processing the model", false);
			                            self.getApp().notify('Save error');
			                            
			                        }
			                    });
								// self.getApp().getRouter().navigate(self.collectionName + "/collection");
							},
							visible: function(){
								var tinhtrang = this.model.get("tinhtrang");
								var id =  this.getApp().getRouter().getParam("id");
								var tinhtrang = this.model.get("tinhtrang");
								var id =  this.model.get("id");
								return (id !== null)&&(!!this.getApp().currentUser) 
									&& (!!this.getApp().currentUser.hasRole("Admin"))
									&& (tinhtrang == 3);
							}
						}]
					},
					{
						name : "exportgr",
						type : "group",
						groupClass : "toolbar-group",
						buttons : [ {
							name : "excel",
							type : "button",
							buttonClass : "btn-default btn-sm btn-primary",
							label : "Xuất Excel",
							command : function() {
								var id = this.model.get("id"); 
								var url = "/export/excel/baocao/" + id;
								 window.open(url, "_blank");
								// self.getApp().getRouter().navigate(self.collectionName + "/collection");
							},
							visible: function(){
								var id =  this.model.get("id");
								return (id !== null);
							}
						}]
					},
    	],
    	extendToolbar: function(tools){
			var self = this;
			tools = tools || this.extratools;
			if(this.toolbar){
				_.each(tools, function(tool, index) {
					if((tool.type === "group") && self._toolIsVisible(tool)){
						var $group = $("<div/>").addClass("btn-group").appendTo(self.toolbar);
						if(tool.groupClass){
							$group.addClass(tool.groupClass);
						}
						if(tool.buttons){
							_.each(tool.buttons, function(button, _i) {
								var label = self.getApp().translate(button.label) || button.name;
								if((button.type === "button") && self._toolIsVisible(button)){
									var $tool = $("<button/>").attr({"type":"button", "btn-name":button.name}).addClass("btn").html(label);
									$tool.addClass(button.buttonClass || "btn-default");
									$group.append($tool);
									if(button.command){
										$tool.bind("click", $.proxy(button.command, self));
									}
								}
							});
						}
					}
					if((tool.type === "button")&& self._toolIsVisible(tool)){
						var label = self.getApp().translate(tool.label) || tool.name;
						var $tool = $("<button/>").attr({"type":"button", "btn-name":tool.name}).addClass("btn").html(label);
						$tool.addClass(tool.buttonClass || "btn-default");
						self.toolbar.append($tool);
						if(tool.command){
							$tool.bind("click", $.proxy(tool.command, self));
						}
					}
				});
			}
			return this;
		},
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		var url = "/api/v1/getbaocao";
    		$.ajax({
				url: url,
				dataType: "json",
				data: {"loaikybaocao": self.loaikybaocao, "id": id},
				contentType: "application/json",
				success: function(data) {
					if((!!data.baocao) && (!!data.baocao.donvi)){
						self.model.set(data.baocao);
						self.viewData = {"congdon": data.congdon}
						self.applyBindings();
						if(self.model.get("loaibaocao") == 1){
							self.$el.find("#chuquan").html(data.baocao.donvi.coquanchuquan);
							self.$el.find("#tendonvi").html(data.baocao.donvi.ten);
						}else{
							self.$el.find("#chuquan").html(data.baocao.donvi.ten);
							self.$el.find("#tendonvi").html(data.baocao.cuakhau.ten);
						}
						
						if(self.loaikybaocao == 5){
							self.renderCuaKhau(data.cuakhau);
						}
						
						self.extendToolbar(self.extratools);
						
						
						if(data.candelete && ((!!self.getApp().currentUser.hasRole("DonViUser")) || (!!self.getApp().currentUser.hasRole("CuaKhauUser"))) ){
							var deletetool = [
		            				{
		            					name: "delete",
		            					type: "button",
		            					buttonClass: "btn-danger btn-sm",
		            					label: "TRANSLATE:DELETE",
		            					command: function(){
		            						var self = this;
		            						var url = "";
		            						if(self.model.get("loaibaocao") == 1){
		            							url = "baocao/timkiem";
		        			                }else{
		        			                	url = "baocao/timkiemck";
		        			                }
		            				        self.model.destroy({
		            				            success: function(model, response) {
		            				                self.getApp().getRouter().navigate(url);
		            				            },
		            				            error: function (model, xhr, options) {
		            				                self.getApp().notify('Delete error');
		            				            }
		            				        });
		            					}
		            				}
		            		];
							self.extendToolbar(deletetool);
						}
						
						
						//console.log();
						if(self.model.get("tinhtrang") == 1){
							self.$el.find("#tinhtrang").html("Tạo mới");
						};
						if(self.model.get("tinhtrang") == 2){
							self.$el.find("#tinhtrang").html("Đã duyệt");
						};
						if(self.model.get("tinhtrang") == 3){
							self.$el.find("#tinhtrang").html("Đã khoá");
						};
						
						
						
						
					}
				},
			});
		
    	},
    	renderCuaKhau : function(cuakhaus){}
    });
    
});