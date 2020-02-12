define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/TruongHopCachLyTapTrung/collection.html'),
		schema = require('json!app/view/TruongHopCachLyTapTrung/TruongHopCachLyTapTrungSchema.json');

	var ModelDialogView = require('app/view/TruongHopCachLyTapTrung/DialogModelView');



	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		bindings: "data-thcl-bind",
		collectionName: "truonghopcachlytaptrung",
		tools: [
			{
				name: "default",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "create",
						type: "button",
						buttonClass: "btn-warning btn-sm",
						label: "Thêm trường hợp cách ly tập trung",
						command: function () {
							var self = this;
							var id = self.viewData.id;
							
							var view = new ModelDialogView({
								viewData: {
									id: null,
									donvi_id : self.viewData.donvi_id,
									cuakhau_id : self.viewData.cuakhau_id || null
								}
							});
							view.dialog({ size: "large" });

							view.on("close", function (param) {
								self.getApp().getRouter().refresh();
							});
						},
						visible:function(){
							var self = this;
							console.log(self.viewData.disable_create, self.viewData.disable_create || false);
							return !(self.viewData.disable_create || false);
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
					field: "id", label: "ID", visible: false
				},
				{ field: "hoten", label: "Họ tên" },
				{
					field: "donvi_id", visible: false
				},
				{
					field: "cuakhau_id", visible: false
				},
                { field: "gioitinh", label: "Giới tính" },
                { field: "namsinh", label: "Năm sinh" },
				{ field: "sodienthoai", label: "Số điện thoại" },
				{ field: "email", label: "Email" },
                { field: "quoctich", label: "Quốc tịch" },
                
                { field: "tencuakhau", visible: false },
                { field: "tendonvi", visible: false },

                { field: "ghichu", visible: false },

                { field: "_created_at", visible: false },
                { field: "_updated_at", visible: false },
                { field: "_deleted", visible: false },
                { field: "_deleted_at", visible: false },
                { field: "ma", visible: false },
                { field: "matokhaiyte", visible: false },
                { field: "ngaybaocao", visible: false },

                { field: "noibaocao", visible: false },
                { field: "nambaocao", visible: false },
                { field: "madonvi", visible: false },
                { field: "macuakhau", visible: false },



                { field: "ma_quoctich", visible: false },

                { field: "cmtnd", visible: false },
                { field: "cuakhau_nhapquacanh", visible: false },
                { field: "gio_nhapquacanh", visible: false },
                { field: "ngay_nhapquacanh", visible: false },
                { field: "phuongtien", visible: false },
                { field: "sohieu_phuongtien", visible: false },

                { field: "noio", label: "Nơi ở tại Việt Nam (Nơi sẽ đến)" },
                { field: "noio_tinhthanh", visible: false },

                { field: "noio_matinhthanh", visible: false },
                { field: "diachi_lienlac", visible: false },
                { field: "dienthoai", visible: false },
                { field: "benh_nghingo", visible: false },
                { field: "noitiepnhan_xutri", visible: false },
                { field: "ngaygio_phathien", visible: false },

                { field: "tinhtrang_phathien", label: "Tình trạng phát hiện"},
                { field: "nhanxet_danhgia", visible: false },
                { field: "tiensu_xutri", visible: false },
                
                { field: "tinhtrang", visible: false },
                
                
                

                
                
                

			],
			pagination: {
				showRowsInfo: true,
				pageSize: 100
			},
			 onRowClick: function(event){
				 var self = this;
				 if(event.rowId){
					var id = self.viewData.id;
					var view = new ModelDialogView({
						viewData: {
							id: event.rowId,
							donvi_id : self.viewData.donvi_id,
							cuakhau_id : self.viewData.cuakhau_id || null
						}
					});
					view.dialog({ size: "large" });

					view.on("close", function (param) {
						self.getApp().getRouter().refresh();
					});
			    }
			 }
		},

		render: function () {
			var self = this;
			var id = self.viewData.id;
			var donvi_id = self.viewData.donvi_id;
			var cuakhau_id = self.viewData.cuakhau_id;
			console.log("THCach ly", donvi_id);
			if ( !!donvi_id){
                var filter = {
                    "donvi_id": {
                        "$eq": donvi_id
                    }
                }
                if (!!cuakhau_id){
                    filter = {
                        "$and":[
                            {"donvi_id": {"$eq": donvi_id}},
                            {"cuakhau_id": {"$eq": cuakhau_id}},
                        ]
                    }
                }
                this.uiControl.filters = filter;
                self.applyBindings();
            }
            
			return this;
		},

	});

});