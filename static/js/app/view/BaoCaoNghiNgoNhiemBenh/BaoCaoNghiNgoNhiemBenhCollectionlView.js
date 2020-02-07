define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!tpl/BaoCaoNghiNgoNhiemBenh/baocaonghingonhiembenhcollection.html'),
        schema = require('json!app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhSchema.json');
    
    
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaonghingonhiembenh",
        uiControl:{
            fields: [
                {
                    field: "id", label: "ID", width: 250, readonly: true,
                },

                { field: "ma", label: "Mã", width: 250 },
                { field: "ngaybaocao", label: "ngày báo cáo", width: 250 },
                { field: "noibaocao", label: "Nơi báo cáo", width: 250 },
                { field: "nambaocao", label: "Năm báo cáo", width: 250 },
                { field: "donvi_id", label: "ID đơn vị", width: 250 },
                { field: "donvi", label: "Tên đơn vị", width: 250, textField: "ten" },
                

                { field: "benh_nghingo", visible:false },
                { field: "cmtnd", visible:false },
                { field: "cuakhau_nhapquacanh", visible:false },
                { field: "diachi_lienlac", visible:false },
                { field: "dienthoai", visible:false },
                { field: "email", visible:false },
                { field: "gio_nhapquacanh", visible:false },
                { field: "gioitinh", visible:false },
                { field: "hoten", visible:false },
                { field: "namsinh", visible:false },
                { field: "ngay_nhapquacanh", visible:false },
                { field: "nhanxet_danhgia", visible:false },
                { field: "noio", visible:false },
                { field: "noitiepnhan_xutri", visible:false },
                { field: "phuongtien", visible:false },
                { field: "quoctich", visible:false },
                { field: "sohieu_phuongtien", visible:false },
                { field: "tiensu_chandoan", visible:false },
                { field: "tiensu_dichte", visible:false },
                { field: "tiensu_ngaykhoiphat", visible:false },
                { field: "tiensu_trieuchunglamsang", visible:false },
                { field: "tiensu_xutri", visible:false },
                { field: "tinhtrang", visible:false },
                
                { field: "baocaonghingonhiembenhquocgia", visible:false },
                { field: "baocaonghingonhiembenhxetnghiem", visible:false },
                { field: "baocaonghingonhiembenhvacxin", visible:false },
                { field: "baocaonghingonhiembenhnguoitiepxuc", visible:false },
            ],
            onRowClick: function (event) {
                if (event.rowId) {
                    var path =  this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            }
        },
        render: function () {
            this.applyBindings();   
            return this;
        },
        
    });

});