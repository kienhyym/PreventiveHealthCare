define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/DiaDiemCachLyTapTrung/collection.html'),
		schema = require('json!app/view/DiaDiemCachLyTapTrung/Schema.json');

	var ModelDialogView = require('app/view/DiaDiemCachLyTapTrung/DialogModelView');



	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		bindings: "data-dd-bind",
		collectionName: "diadiemcachlytaptrung",
		tools: [
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "create",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:CREATE",
						command: function () {
							var self = this;
							var id = self.viewData.id;
							
							var view = new ModelDialogView({
								viewData: {
									id: null,
									donvi_id : self.viewData.donvi_id,
									cuakhau_id : self.viewData.cuakhau_id
								}
							});
							view.dialog({ size: "large" });

							view.on("close", function (param) {
								self.getApp().getRouter().refresh();
								//self.applyBindings();
							});
						},
						visible:function(){
							var self = this;
							console.log(self.viewData.disable_create, self.viewData.disable_create || false);
							return !(self.viewData.disable_create || false);
							// return !((this.getApp().currentUser.hasRole("VienAdmin")) || (this.getApp().currentUser.hasRole("VienUser"))
						  	// 		|| (this.getApp().currentUser.hasRole("CuaKhauUser")));
						}
					},
					// {
					// 	name: "export",
					// 	type: "button",
					// 	buttonClass: "btn-warning btn-sm",
					// 	label: "Xuất excel",
					// 	command: function () {
					// 		var self = this;
					// 		// var donvi_id = self.getApp().data(seskey + "donvi_id") || null;
					// 		// var tinhthanh_id = self.getApp().data(seskey + "tinhthanh_id") || null;
					// 		// var ten = self.getApp().data(seskey + "ten") || null;
					// 		// var loaicuakhau = self.getApp().data(seskey + "loaicuakhau") || null;

					// 		// var donvi = self.getApp().data(seskey + "donvi") || null;

					// 		// var data = {
					// 		// 		donvi_id: null,
					// 		// 		tinhthanh_id: tinhthanh_id,
					// 		// 		ten: ten,
					// 		// 		loaicuakhau: loaicuakhau
					// 		// }

					// 		// if((donvi !== null) && (donvi.tuyendonvi ==2)){
					// 		// 	data.donvi_id = donvi.children;
					// 		// }else{
					// 		// 	data.donvi_id = [donvi_id];
					// 		// }
					// 		// var url = '/export/excel/cuakhau?filter=' + JSON.stringify(data);
					// 		// window.open(url, '_blank');
					// 	}
					// },

				]
			},
		],
		uiControl: {

			fields: [
				{
					field: "id", label: "ID"
				},
				{ field: "ten", label: "Tên" },
				{
					field: "donvi_id", visible: false
				},
				{
					field: "cuakhau_id", visible: false
				},
				{ field: "diachi", label: "Địa chỉ" },
				{ field: "sodienthoai", label: "Số điện thoại" },
				{ field: "email", label: "Email" },
				{ field: "nguoilienlac", label: "Người liên hệ" },
				{ field: "ghichu", visible: false },

			],
			pagination: {
				showRowsInfo: true,
				pageSize: 1000
			},
			 onRowClick: function(event){
				 var self = this;
				 if(event.rowId){
					var id = self.viewData.id;
					var view = new ModelDialogView({
						viewData: {
							id: event.rowId,
							donvi_id : self.viewData.donvi_id,
							cuakhau_id : self.viewData.cuakhau_id
						}
					});
					view.dialog({ size: "large" });

					view.on("close", function (param) {
						self.getApp().getRouter().refresh();
						//self.applyBindings();
					});
			    }
			 }
		},

		render: function () {
			var self = this;
			var id = self.viewData.id;
			var donvi_id = self.viewData.donvi_id;
			var cuakhau_id = self.viewData.cuakhau_id;
			console.log(self.viewData);

			if (!!donvi_id){
				self.uiControl.filters = {
					"donvi_id":{
						"$eq": donvi_id
					}
				}
				this.applyBindings();
			}
			

			return this;
		},

	});

});