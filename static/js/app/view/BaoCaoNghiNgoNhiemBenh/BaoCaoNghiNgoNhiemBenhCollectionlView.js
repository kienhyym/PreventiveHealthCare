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
                    field: "id", label: "ID"
                },

                { field: "ma", label: "Mã"},
                { field: "ngaybaocao", label: "Ngày báo cáo" },
                { field: "noibaocao", label: "Nơi báo cáo"},
                { field: "nambaocao", label: "Năm báo cáo"},
                { field: "donvi_id", label: "ID đơn vị",visible:false},
                { field: "madonvi", label: "ID đơn vị",visible:false},
                { field: "tendonvi", label: "Tên đơn vị"},
                { field: "cuakhau_id", label: "ID đơn vị",visible:false},
                { field: "macuakhau", label: "ID đơn vị",visible:false},
                { field: "tencuakhau", label: "Tên cửa khẩu"},

                { field: "huongxutri", visible:false},
                { field: "ngaygio_phathien", visible:false},
                

                { field: "donvi", label: "Tên đơn vị", width: 250, textField: "ten",visible:false },
                
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
            var self = this;
            var user = self.getApp().currentUser;
            // var donvi = user.info.donvi;
            // self.model.set("donvi_id", donvi.id);

            var donvi_id = null;
            var cuakhau_id = null;

            var cuakhau = user.info.cuakhau;
            if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
                cuakhau_id = cuakhau.id;
                
            }
            var donvi = user.info.donvi;
            if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
                donvi_id = donvi.id;
            }


            if((user.hasRole("CuaKhauUser")) || (user.hasRole("DonViUser")) || (user.hasRole("DonViAdmin"))){
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
                    
                }
            }
            
            this.applyBindings();   
            return this;
        },
        
    });

});