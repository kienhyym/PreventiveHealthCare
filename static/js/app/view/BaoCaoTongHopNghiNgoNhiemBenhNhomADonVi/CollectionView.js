define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!tpl/BaoCaoTongHopNghiNgoNhiemBenhNhomADonVi/collection.html'),
        //schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenh/Schema.json');
        schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/Schema.json')
    
    
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaotonghopnghingonhiembenhnhoma",
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
                        command: function(){
                            var self = this;
                            var path = self.collectionName + '/modeldv';
                            self.getApp().getRouter().navigate(path);
                        }
                    },
                    
                ]
            },
         ],
        uiControl:{
            fields: [
                { field: "ma", label: "Mã", width: 250 },
                { field: "ngaybaocao", label: "ngày báo cáo", width: 250 },
                { field: "noibaocao", label: "Nơi báo cáo", width: 250 },
                { field: "nambaocao", label: "Năm báo cáo", width: 250 },
                { field: "donvi_id", label: "ID đơn vị", width: 250 },
                { field: "tendonvi", label: "Tên đơn vị", width: 250 },
                
            ],
            onRowClick: function (event) {
                if (event.rowId) {
                    var path =  this.collectionName + '/modeldv?id=' + event.rowId;
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