define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [

		// {
		// 	"text": "Lịch kiểm tra",
		// 	"icon": "fa fa-calendar",
		// 	"type": "view",
		// 	"collectionName": "thietbiduockiemtra",
		// 	"route": "lichthanhtra/collection",
		// 	"$ref": "app/lichthanhtra/view/ModelView",
		// 	"visible": function () {
		// 		return true

		// 	}
		// },
		{
			"text": "Tờ khai y tế đối với người",
			"icon": "fa fa-book",
			"type": "view",
			"collectionName": "tokhaiytedoivoinguoi",
			"route": "tokhaiytedoivoinguoi/collection",
			"$ref": "app/tokhaiytedoivoinguoi/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"type": "view",
			"collectionName": "tokhaiytedoivoinguoi",
			"route": "tokhaiytedoivoinguoi/model(/:id)",
			"$ref": "app/tokhaiytedoivoinguoi/js/ModelView",
			"visible": function () {
				return false;
			}
		},

		// {
		// 	"text": "Hệ thống",
		// 	"icon": "fa fa-home",
		// 	"type": "category",
		// 	"visible": function () {
		// 		return this.checkVaitro([1,2]);

		// 	},
		// 	"entries": [
		// 		{
		// 			"text": "Nhân viên",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "user",
		// 			"route": "user/collection",
		// 			"$ref": "app/hethong/user/js/CollectionView",
		// 			"visible": function () {
		// 				return true

		// 			}
		// 		},
		// 		{

		// 			"type": "view",
		// 			"collectionName": "user",
		// 			"route": "user/model",
		// 			"$ref": "app/hethong/user/js/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},

		// 		{
		// 			"text": "Khoa",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "khoa",
		// 			"route": "khoa/collection",
		// 			"$ref": "app/hethong/khoa/view/CollectionView",
		// 			"visible": function () {
		// 				return true

		// 			}
		// 		},
		// 		{

		// 			"type": "view",
		// 			"collectionName": "khoa",
		// 			"route": "khoa/model",
		// 			"$ref": "app/hethong/khoa/view/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},

		// 		{
		// 			"text": "Phòng",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "phong",
		// 			"route": "phong/collection",
		// 			"$ref": "app/hethong/phong/view/CollectionView",
		// 			"visible": function () {
		// 				return true

		// 			}
		// 		},
		// 		{

		// 			"type": "view",
		// 			"collectionName": "phong",
		// 			"route": "phong/model",
		// 			"$ref": "app/hethong/phong/view/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},

			
		// 	]
		// },

		// {
		// 	"text": "Danh mục",
		// 	"icon": "fa fa-list-ul",
		// 	"type": "category",
		// 	"visible": function () {
		// 		return this.checkVaitro([1,2]);

		// 	},
		// 	"entries": [
		// 		{
		// 			"text": "Nơi sản xuất",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "quocgia",
		// 			"route": "quocgia/collection",
		// 			"$ref": "app/danhmuc/QuocGia/view/CollectionView",
		// 			"visible": function(){
		// 				return true ;
		// 			}
		// 		},
		// 		{
		// 			"type": "view",
		// 			"icon": "far fa-clipboard",
		// 			"collectionName": "quocgia",
		// 			"route": "quocgia/model(/:id)",
		// 			"$ref": "app/danhmuc/QuocGia/view/ModelView",
		// 			"visible": false
		// 		},
		// 		{
		// 			"text": "Hãng sản xuất",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "hangsanxuat",
		// 			"route": "hangsanxuat/collection",
		// 			"$ref": "app/danhmuc/hangsanxuat/view/CollectionView",
		// 			"visible": function(){
		// 				return true ;
		// 			}
		// 		},
		// 		{
		// 			"type": "view",
		// 			"icon": "far fa-clipboard",
		// 			"collectionName": "hangsanxuat",
		// 			"route": "hangsanxuat/model(/:id)",
		// 			"$ref": "app/danhmuc/hangsanxuat/view/ModelView",
		// 			"visible": false
		// 		},
		// 		{
		// 			"text": "Nhà cung cấp thiết bị",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "donvi",
		// 			"route": "donvi/collection",
		// 			"$ref": "app/danhmuc/donvi/js/CollectionView",
		// 			"visible": function () {
		// 				return true

		// 			}
		// 		},
		// 		{
		// 			"text": "Đơn vị",
		// 			"icon": "fa fa-home",
		// 			"type": "view",
		// 			"collectionName": "donvi",
		// 			"route": "donvi/model(/:id)",
		// 			"$ref": "app/danhmuc/donvi/js/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},

		// 		{
		// 			"text": " Danh sách thiết bị",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "thietbi",
		// 			"route": "thietbi/collection",
		// 			"$ref": "app/danhmuc/thietbi/js/CollectionView",
		// 			"visible": function () {
		// 				return true

		// 			}
		// 		},
		// 		{
		// 			"type": "view",
		// 			"collectionName": "thietbi",
		// 			"route": "thietbi/model(/:id)",
		// 			"$ref": "app/danhmuc/thietbi/js/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},

		// 	]
		// },



		

		// {
		// 	"text": "Báo cáo thống kê",
		// 	"icon": "fa fa-file-text-o",
		// 	"type": "category",
		// 	"entries": [
				
				
		// 		{
		// 			"text": "Kiểm tra thiết bị",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "bangkiemtrathietbi",
		// 			"route": "bangkiemtrathietbi/collection",
		// 			"$ref": "app/chungtu/bangkiemtrathietbi/js/CollectionView",
		// 			"visible": function () {
		// 				return true
		
		// 			}
		// 		},
		// 		{
		// 			"type": "view",
		// 			"collectionName": "bangkiemtrathietbi",
		// 			"route": "bangkiemtrathietbi/model(/:id)",
		// 			"$ref": "app/chungtu/bangkiemtrathietbi/js/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},
		// 		{
		// 			"text": "Yêu cầu sửa chữa",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "phieuyeucausuachua",
		// 			"route": "phieuyeucausuachua/collection",
		// 			"$ref": "app/chungtu/phieuyeucausuachua/js/CollectionView",
		// 			"visible": function () {
		// 				return true

		// 			}
		// 		},
		// 		{
		// 			"type": "view",
		// 			"collectionName": "phieuyeucausuachua",
		// 			"route": "phieuyeucausuachua/model(/:id)",
		// 			"$ref": "app/chungtu/phieuyeucausuachua/js/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},
		// 		{
		// 			"text": "Biên bản kiểm tra",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "bienbanxacnhantinhtrangthietbi",
		// 			"route": "bienbanxacnhantinhtrangthietbi/collection",
		// 			"$ref": "app/chungtu/bienbanxacnhantinhtrangthietbi/js/CollectionView",
		// 			"visible": function () {
		// 				return true

		// 			}
		// 		},
		// 		{
		// 			"type": "view",
		// 			"collectionName": "bienbanxacnhantinhtrangthietbi",
		// 			"route": "bienbanxacnhantinhtrangthietbi/model(/:id)",
		// 			"$ref": "app/chungtu/bienbanxacnhantinhtrangthietbi/js/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},
		// 		{
		// 			"text": "Lịch sử kiểm định",
		// 			"icon": "fa fa-angle-double-right",
		// 			"type": "view",
		// 			"collectionName": "bangkiemdinh",
		// 			"route": "bangkiemdinh/collection",
		// 			"$ref": "app/chungtu/bangkiemdinh/js/CollectionView",
		// 			"visible": function () {
		// 				return true
		// 			}
		// 		},
		// 		{
		// 			"type": "view",
		// 			"collectionName": "bangkiemdinh",
		// 			"route": "bangkiemdinh/model(/:id)",
		// 			"$ref": "app/chungtu/bangkiemdinh/js/ModelView",
		// 			"visible": function () {
		// 				return false;
		// 			}
		// 		},
				
		// 	]
		// },





	];

});


