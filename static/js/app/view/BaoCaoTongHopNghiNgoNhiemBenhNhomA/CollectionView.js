define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/tpl/collection.html'),
		schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/Schema.json');

    
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaotonghopnghingonhiembenhnhoma",
        tools : [
            {
                name: "create",
                type: "button",
                buttonClass: "btn-success btn-sm",
                label: "Tạo mới",
                command: function() {
                    var self=this;
                    self.getApp().getRouter().navigate("baocaotonghopnghingonhiembenhnhoma/model");
                },
            },
        ],
        uiControl:{
            fields: [
                {
                    field: "id", label: "ID", width: 250, readonly: true,visible: false
                },
                { field: "ngaybaocao", label: "Ngày báo cáo",
                    // template: (rowData) => {
                    // return '<p>'+moment.unix(rowData.ngaybaocao).local().format("DD/MM/YYYY");+'</p>';
                    // }
                },
                { field: "tencuakhau", label: "Tên cửa khẩu"},
                { field: "tendonvi", label: "Tên đơn vị" },
                { field: "sochuyenbay", label: "Số chuyến bay" },
                { field: "songuoinhapcanh", label: "Số hành khách"},
                { field: "donvi_id", visible:false },
                { field: "loaibaocao", visible:false },
                { field: "cuakhau_id", visible:false },
                { field: "macuakhau", visible:false },
                { field: "danhsachnghingonhiembenh", visible:false },
                { field: "sohanhkhachkhaibao", label: "Số khai báo" },
                { field: "songuoinghingo", label: "Số nghi ngờ" },
                { field: "songuoidangcachlytaptrung", visible:false },
                { field: "songuoidangcachlytaptrung_cotrieuchung", visible:false },
                { field: "diadiemcachlytaptrung", visible:false },
                { field: "songuoihetcachly", visible:false }
            ],
            onRowClick: function (event) {
                if (event.rowId) {
                    var path =  'baocaotonghopnghingonhiembenhnhoma/model?id=' + event.rowId;
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