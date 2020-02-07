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
        collectionName: "baocaotonghopnghingonhiembenhnhomA",
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
                    field: "id", label: "ID", width: 250, readonly: true,
                },
                { field: "ngaybaocao", label: "Ngày báo cáo",width: 250,
                template: (rowData) => {
                    return '<p>'+moment.unix(rowData.ngaybaocao).local().format("DD/MM/YYYY");+'</p>';
                }
                },
                { field: "tencuakhau", label: "Tên cửa khẩu", width: 250 },
                { field: "tendonvi", label: "Tên đơn vị", width: 250, textField: "ten" },
                { field: "sochuyenbay", label: "Số chuyến bay", width: 250 },
                { field: "songuoinhapcanh", label: "Số hành khách", width: 250 },
                { field: "donvi_id", visible:false },
                { field: "loaibaocao", visible:false },
                { field: "cuakhau_id", visible:false },
                { field: "macuakhau", visible:false },
                { field: "danhsachnghingonhiembenh", visible:false },
                { field: "sohanhkhachkhaibao", visible:false },
                { field: "songuoinguoinghingo", visible:false },
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