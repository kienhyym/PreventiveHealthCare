define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/BaoCaoTongHopNghiNgoNhiemBenh/collection.html'),
        schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenh/Schema.json');
    
    
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaotonghopnghingonhiembenh",
        uiControl:{
            fields: [
                { field: "ma", label: "Mã", width: 250 },
                { field: "ngaybaocao", label: "ngày báo cáo", width: 250 },
                { field: "noibaocao", label: "Nơi báo cáo", width: 250 },
                { field: "nambaocao", label: "Năm báo cáo", width: 250 },
                { field: "donvi_id", label: "ID đơn vị", width: 250 },
                { field: "donvi", label: "Tên đơn vị", width: 250, textField: "ten" },
                
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