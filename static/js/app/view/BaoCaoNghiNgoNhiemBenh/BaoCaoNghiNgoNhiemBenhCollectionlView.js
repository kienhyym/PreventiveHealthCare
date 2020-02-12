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
        tools: [
            {
              name: "default",
              type: "group",
              groupClass: "toolbar-group",
              buttons: [
                {
                  name: "create-nghingo-item",
                  type: "button",
                  buttonClass: "btn-danger btn-sm",
                  label: "Thêm trường hợp nghi ngờ",
                  command: function () {
                    var self = this;
                    var path =  'baocaonghingonhiembenh/model';
					gonrinApp().getRouter().navigate(path);
                  },
                  visible: function () {
                    var self = this;
                    // console.log(self.viewData.disable_create, self.viewData.disable_create || false);
                    return !(self.viewData.disable_create || false);
                  }
                },
                {
                    name: "export-nghingo-excel",
                    type: "button",
                    buttonClass: "btn-primary btn-sm",
                    label: "Xuất Excel danh sách",
                    command: function () {
                        var self = this;
                        // var donvi_id = self.viewData.donvi_id || null;
                        // var cuakhau_id = self.viewData.cuakhau_id || null;
                        // var ngaybaocao = self.viewData.ngaybaocao || null;
        
                        // if(!donvi_id){
                        // return;
                        // }
                        // var url = "/export/excel/baocaonghingonhiembenh?donvi_id=" + donvi_id;
                        // if(!!cuakhau_id){
                        // url = url + "&cuakhau_id=" + cuakhau_id
                        // }
                        // if(!!ngaybaocao){
                        // url = url + "&ngaybaocao=" + ngaybaocao
                        // }
        
                        // window.open(url, '_blank');
                    },
                    visible: false
                },
      
              ]
            },
          ],
        uiControl:{
            fields: [
                {
                    field: "id", label: "ID"
                },
                { field: "hoten", label: "Họ tên" },
                { field: "namsinh", label: "Năm sinh" },
                { field: "gioitinh", label: "Giới tính" },
                { field: "quoctich", label: "Quốc tịch" },
                { field: "ma", visible:false, },
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

                { field: "ma_quoctich", visible:false},
                { field: "noio_tinhthanh", visible:false},
                { field: "noio_matinhthanh", visible:false},
                { field: "dauhieubenh_sot", visible:false},
                { field: "dauhieubenh_ho", visible:false},

                { field: "dauhieubenh_khotho", visible:false},
                { field: "dauhieubenh_dauhong", visible:false},
                { field: "dauhieubenh_buonnon", visible:false},
                { field: "dauhieubenh_tieuchay", visible:false},
                { field: "dauhieubenh_xuathuyetngoaida", visible:false},
                { field: "dauhieubenh_phatban", visible:false},
                
                

                { field: "donvi", label: "Tên đơn vị", width: 250, textField: "ten",visible:false },
                
                { field: "benh_nghingo", visible:false },
                { field: "cmtnd", visible:false },
                { field: "cuakhau_nhapquacanh", visible:false },
                { field: "diachi_lienlac", visible:false },
                { field: "dienthoai", visible:false },
                { field: "email", visible:false },
                { field: "gio_nhapquacanh", visible:false },
                
                { field: "ngay_nhapquacanh", visible:false },
                { field: "nhanxet_danhgia", visible:false },
                { field: "noio", visible:false },
                { field: "noitiepnhan_xutri", visible:false },
                { field: "phuongtien", visible:false },
                
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
            },
            pagination: {
                showRowsInfo: true,
                // pageSize: 100
              },
        },
        render: function () {
            var self = this;
            var user = self.getApp().currentUser;
            // var donvi = user.info.donvi;
            // self.model.set("donvi_id", donvi.id);

            var viewType = (self.viewData || {}).type || null;
            var donvi_id = (self.viewData || {}).donvi_id || null;
            var cuakhau_id = (self.viewData || {}).cuakhau_id || null;

            var ngaybaocao = (self.viewData || {}).ngaybaocao || null; 

            if (!!viewType){
                self.uiControl.pagination.pageSize = 100;
            }

            if (!cuakhau_id){
                var cuakhau = user.info.cuakhau;
                if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
                    cuakhau_id = cuakhau.id;
                    
                }
            }
            if(!donvi_id){
                var donvi = user.info.donvi;
                if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
                    donvi_id = donvi.id;
                }
            }
            


            if((!!viewType) || ((user.hasRole("CuaKhauUser")) || (user.hasRole("DonViUser")) || (user.hasRole("DonViAdmin")))){
                if ( !!donvi_id){
                    var filter = {
                        "$and": [
                          { "donvi_id": { "$eq": donvi_id } },
                          { "ngaybaocao": { "$eq": ngaybaocao } },
                        ]
                      }
                      if (!!cuakhau_id) {
                        filter = {
                          "$and": [
                            { "donvi_id": { "$eq": donvi_id } },
                            { "ngaybaocao": { "$eq": ngaybaocao } },
                            { "cuakhau_id": { "$eq": cuakhau_id } },
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