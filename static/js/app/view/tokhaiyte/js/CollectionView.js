define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/view/tokhaiyte/tpl/collection.html'),
        schema = require('json!app/view/tokhaiyte/ToKhaiYTeSchema.json');


    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "tokhaiyte",
        uiControl: {
            fields: [
                { field: "stt", label: "stt"},
                { field: "id", visible: false },
                { field: "hoten", label: "Họ tên"},
                // { field: "matokhaiyte", label: "Mã tờ khai" },
                { field: "ngaykekhai", label: "Ngày kê khai" },
                { field: "donvi_id", visible: false },
                { field: "tendonvi", visible: false },
                { field: "madonvi", visible: false },
                { field: "cuakhau_id", visible: false },
                { field: "tencuakhau", visible: false },
                { field: "macuakhau", visible: false },
                { field: "canbo_id", visible: false },
                { field: "tencanbo", visible: false },
                { field: "emailcanbo", visible: false },
                { field: "namsinh", visible: false },
                { field: "gioitinh", visible: false },
                { field: "quoctich", visible: false },
                { field: "sohochieu", visible: false },
                { field: "thongtindilai_taubay", visible: false },
                { field: "thongtindilai_tauthuyen", visible: false },
                { field: "thongtindilai_oto", visible: false },
                { field: "thongtindilai_khac", visible: false },
                { field: "thongtindilai_chitiet", visible: false },
                { field: "sohieu_phuongtien", visible: false },
                { field: "soghe_phuongtien", visible: false },
                { field: "ngay_khoihanh", visible: false },

                { field: "ngay_nhapcanh", visible: false },
                { field: "noi_khoihanh", visible: false },
                { field: "noiden", visible: false },
                { field: "quocgiadiqua", visible: false },
                { field: "diachi_taivietnam", visible: false },
                { field: "sodienthoai", visible: false },
                { field: "email", visible: false },
                { field: "dauhieubenh_sot", visible: false },

                { field: "dauhieubenh_ho", visible: false },
                { field: "dauhieubenh_khotho", visible: false },
                { field: "dauhieubenh_dauhong", visible: false },
                { field: "dauhieubenh_buonnon", visible: false },
                { field: "dauhieubenh_tieuchay", visible: false },
                { field: "dauhieubenh_xuathuyetngoaida", visible: false },
                { field: "dauhieubenh_phatban", visible: false },


                { field: "vacxin_dasudung", visible: false },
                { field: "tiepxuc_dongvat", visible: false },
                { field: "chamsocnguoibenhtruyennhiem", visible: false },
                { field: "ngaygio_phathien", visible: false },
                { field: "tinhtrang", visible: false },
                { field: "huongxutri", visible: false },
                { field: "cachlytaptrung", visible: false },
                { field: "trangthai", label: "Trạng thái" },

                { field: "note", visible: false },
                { field: "extra_data", visible: false },



            ],
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            }
        },
        render: function () {
            this.applyBindings();
            console.log(this.collection)
            return this;
        },

    });

});