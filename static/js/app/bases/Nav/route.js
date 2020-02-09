define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		// {
		// 	"collectionName": "tokhaiyte",
		// 	"route": "tokhaiyte/collection",
		// 	"$ref": "app/view/tokhaiyte/js/CollectionView",
		// },
		// {
		// 	"collectionName": "tokhaiyte",
		// 	"route": "tokhaiyte/model(/:id)",
		// 	"$ref": "app/view/tokhaiyte/js/ModelView",
		// },
		{
			"collectionName":"tokhaiyte",
			"route":"tokhaiyte/collection",
			"$ref": "app/view/tokhaiyte/js/CollectionView",
		},
		{
			"collectionName":"tokhaiyte",
			"route":"tokhaiyte/model(/:id)",
			"$ref": "app/view/tokhaiyte/js/ModelView",
		},
		{
			"collectionName":"baocaonghingonhiembenh",
        	"route":"baocaonghingonhiembenh/collection",
        	//"href":"baocao/baocaonghingonhiembenhcollection",
        	"$ref": "app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhCollectionlView",
		},
		{
			"collectionName":"baocaonghingonhiembenh",
        	"route":"baocaonghingonhiembenh/model(/:id)",
        	//"href":"baocao/baocaonghingonhiembenhcollection",
        	"$ref": "app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhModelView",
		},
		{
			"collectionName": "quocgia",
			"route": "quocgia/model(/:id)",
			"$ref": "app/view/QuocGia/ModelView",
		},
		{
			"collectionName": "tinhthanh",
			"route": "tinhthanh/collection(/:id)",
			"$ref": "app/view/TinhThanh/CollectionView",
		},
		{
			"collectionName": "tinhthanh",
			"route": "tinhthanh/model(/:id)",
			"$ref": "app/view/TinhThanh/ModelView",
		},

		{
			"collectionName": "khachhang",
			"route": "khachhang/collection(/:id)",
			"$ref": "app/view/KhachHang/CollectionView",
		},
		{
			"collectionName": "khachhang",
			"route": "khachhang/model(/:id)",
			"$ref": "app/view/KhachHang/ModelView",
		},
		{
			"collectionName": "hanghoa",
			"route": "hanghoa/collection(/:id)",
			"$ref": "app/view/HangHoa/CollectionView",
		},
		{
			"collectionName": "hanghoa",
			"route": "hanghoa/model(/:id)",
			"$ref": "app/view/HangHoa/ModelView",
		},
		{
			"collectionName": "hoadon",
			"route": "hoadon/collection(/:id)",
			"$ref": "app/view/HoaDon/CollectionView",
		},
		{
			"collectionName": "hoadon",
			"route": "hoadon/model(/:id)",
			"$ref": "app/view/HoaDon/ModelView",
		},
		{
			"collectionName": "baocaotonghopnghingonhiembenhnhoma",
			"route": "baocaotonghopnghingonhiembenhnhoma/collection",
			"$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/CollectionView",
		},
		{
			"collectionName": "baocaotonghopnghingonhiembenhnhoma",
			"route": "baocaotonghopnghingonhiembenhnhoma/collectiondv",
			"$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomADonVi/CollectionView",
		},
		{
			"collectionName": "baocaotonghopnghingonhiembenhnhoma",
			"route": "baocaotonghopnghingonhiembenhnhoma/model(/:id)",
			"$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/ModelView",
		},
		{
			"collectionName": "baocaotonghopnghingonhiembenhnhoma",
			"route": "baocaotonghopnghingonhiembenhnhoma/modeldv(/:id)",
			"$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomADonVi/ModelView",
		},
		{
			"collectionName":"baocaotonghopnghingonhiembenhnhoma",
			"route":"baocaotonghopnghingonhiembenhnhoma/view(/:id)",
			"$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/View",
		},
		{
			"collectionName":"thongkenghingonhiembenhnhoma",
			"route":"thongkenghingonhiembenhnhoma",
			"$ref": "app/view/ThongKeNghiNgoNhiemBenhNhomA/ThongKeView",
		},
		
	];

});


