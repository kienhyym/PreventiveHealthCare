define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/TruongHopCachLyTapTrung/model.html'),
		schema = require('json!app/view/TruongHopCachLyTapTrung/TruongHopCachLyTapTrungSchema.json');
	
	return Gonrin.ModelDialogView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "truonghopcachlytaptrung",
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
									// Backbone.history.history.back();
					                // // self.getApp().getRouter().navigate(self.collectionName + "/collection");
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
		    	    	]
		    	    },
		    	],
		uiControl: [
			{
				field:"gioitinh",
				uicontrol:"combobox",
				textField: "text",
				valueField: "value",
				cssClass:"form-control",
				dataSource: [
					{ value: "Nam", text: "Nam" },
					{ value: "Nu", text: "Nữ" },
				 ],
			},
			{
				field: "benh_nghingo",
				cssClass: false,

			},
			{field:"ngaybaocao", cssClass:true, textFormat :"DD/MM/YYYY", disabledComponentButton: false},
			// {field:"ngay_nhapquacanh", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true},
			{
				field: "cmtnd",
				cssClass: false,
			},
			{
				field: "cuakhau_nhapquacanh",
				cssClass: false,
			},
			{
				field: "diachi_lienlac",
				cssClass: false,
			},
			{
				field: "dienthoai",
				cssClass: false,
			},
			{
				field: "donvi",
				cssClass: false,
			},
			{
				field: "donvi_id",
				cssClass: false,
			},
			{
				field: "email",
				cssClass: false,
			},
			{
				field: "gio_nhapquacanh",
				cssClass: false,
			},
			{
				field: "gioitinh",
				cssClass: false,
			},
			{
				field: "hoten",
				cssClass: false,


			},
			{
				field: "id",
				cssClass: false,
			},
			{
				field: "ma",
				cssClass: false,
			},
			{
				field: "nambaocao",
				cssClass: false,

			},
			{
				field: "namsinh",
				cssClass: false,
			},
			{
				field: "ngay_nhapquacanh",
				cssClass: false,
			},
			
			{
				field: "nhanxet_danhgia",
				cssClass: false,
			},
			{
				field: "noibaocao",
				cssClass: false,
			},
			{
				field: "noio",
				cssClass: false,
			},
			{
				field: "noitiepnhan_xutri",
				cssClass: false,
			},
			{
				field: "phuongtien",
				cssClass: false,
			},
			{
				field: "quoctich",
				cssClass: false,
			},
			{
				field: "sohieu_phuongtien",
				cssClass: false,
			},
			{
				field: "tiensu_chandoan",
				cssClass: false,
			},
			{
				field: "tiensu_dichte",
				cssClass: false,
			},
			{
				field: "tiensu_ngaykhoiphat",
				cssClass: false,
			},
			{
				field: "tiensu_trieuchunglamsang",
				cssClass: false,
			},
			{
				field: "tiensu_xutri",
				cssClass: false,
			},
			{
				field: "tinhtrang",
				cssClass: false,
			},
		],
		// render: function () {
		// 	var self = this;
		// 	var user = self.getApp().currentUser;
		// 	if (user) {
		// 		// var donvi = user.info.donvi;
				
		// 		// self.model.set("donvi_id", donvi.id);

		// 		var info = user.info;
		// 		var cuakhau = info.cuakhau;
		// 		if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
		// 			self.model.set({"cuakhau_id":cuakhau.id,"tencuakhau":cuakhau.ten,"macuakhau":cuakhau.ma});
					
		// 		}
		// 		var donvi = info.donvi;
		// 		if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
		// 			self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten})
		// 		}

		// 		self.model.set("ngaybaocao", moment().startOf('day').format("YYYY-MM-DD"));
		// 		self.model.set("nambaocao", moment().year());
		// 		self.applyBindings();
		// 		self.registerEvent();
		// 	}
		// },



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
				// self.model.set("ngaybaocao", moment().startOf('day').format("YYYY-MM-DD"));
				// self.model.set("nambaocao", moment().year());
				// self.model.set("donvi_id", donvi_id);
				// self.model.set("cuakhau_id", cuakhau_id);
				var user = self.getApp().currentUser;
				if (user) {
					// var donvi = user.info.donvi;
					
					// self.model.set("donvi_id", donvi.id);
	
					var info = user.info;
					var cuakhau = info.cuakhau;
					if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
						self.model.set({"cuakhau_id":cuakhau.id,"tencuakhau":cuakhau.ten,"macuakhau":cuakhau.ma});
						
					}
					var donvi = info.donvi;
					if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
						self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten})
					}
	
					self.model.set("ngaybaocao", moment().startOf('day').format("YYYY-MM-DD"));
					self.model.set("nambaocao", moment().year());
					self.applyBindings();
					self.registerEvent();
				}

				self.applyBindings();
			}
			
		},
		
		registerEvent: function(){
			var self = this;
			self.model.on("change:ngaybaocao", function(){
				var ngaybaocao = self.model.get("ngaybaocao");
				var moobject = moment(ngaybaocao, "YYYY-MM-DDTHH:mm:ss");
				var nambaocao = moobject.year();
				self.model.set("nambaocao", nambaocao);
			})
		},
	});

});