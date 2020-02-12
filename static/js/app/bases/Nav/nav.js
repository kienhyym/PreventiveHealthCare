define(function (require) {
	"use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    return [
			{
				"text": "Index",
			    "type":"view",
			    "collectionName":"index",
			    "route":"index",
			    "$ref": "app/bases/IndexView",
			    "visible": false
			},
            {
        		"text":"Hệ thống",
        		"icon": static_url + "/images/icons/task_120.png",
        		"type":"category",
        		"visible": function(){
			    	return this.checkHasRole("Admin") || this.checkHasRole("VienAdmin") || this.checkHasRole("DonViAdmin") ;
			    },
        		"entries":[
        			{
        			    "text":"Đơn vị thành viên",
        			    "type":"view",
        			    "collectionName":"donvi",
        			    "route":"donvi/collectiontree",
        			    "$ref": "app/view/HeThong/DonVi/CollectionTreeView",
        			    "icon":static_url + "/images/icons/groups_60.png",
        			    /*"visible": function(){
        			    	return this.checkUser();
        			    }*/
        			},
        			{
        			    "type":"view",
        			    "collectionName":"donvi",
        			    "route":"donvi/model(/:id)",
        			    "$ref": "app/view/HeThong/DonVi/ModelView",
        			    "visible":  false
        			},
        			{
        			    "text":"Cửa khẩu",
        			    "type":"view",
        			    "collectionName":"cuakhau",
        			    "route":"cuakhau/collection",
        			    "$ref": "app/view/HeThong/CuaKhau/CollectionView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			},
        			{
        			    "type":"view",
        			    "collectionName":"cuakhau",
        			    "route":"cuakhau/model(/:id)",
        			    "$ref": "app/view/HeThong/CuaKhau/ModelView",
        			    "visible": false
        			},
        			{
        			    "text":"Tài khoản người dùng",
        			    "type":"view",
        			    "collectionName":"user",
        			    "route":"user/collection",
        			    "$ref": "app/view/HeThong/User/CollectionView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    
        			},
        			{
        			    "type":"view",
        			    "collectionName":"user",
        			    "route":"user/model(/:id)",
        			    "$ref": "app/view/HeThong/User/ModelView",
        			    "visible": false
        			},
        			{
                        "type":"view",
                        "collectionName":"user",
                        "route":"user/changepwd",
                        "$ref": "app/view/HeThong/User/ChangePasswordView",
                        "visible":false
                   },
        			{
        			    "text":"Phân cấp vai trò",
        			    "type":"view",
        			    "collectionName":"role",
        			    "route":"role/collection",
        			    "$ref": "app/view/HeThong/Role/CollectionView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("Admin") ;
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"role",
        			    "route":"role/model(/:id)",
        			    "$ref": "app/view/HeThong/Role/ModelView",
        			    "visible": false
        			},
        			{
        			    "text":"Phân quyền",
        			    "type":"view",
        			    "collectionName":"permission",
        			    "route":"permission/collection",
        			    "$ref": "app/view/HeThong/Permission/CollectionView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	//return this.checkHasRole("Admin") ;
        			    	return false;
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"permission",
        			    "route":"permission/model(/:id)",
        			    "$ref": "app/view/HeThong/Permission/ModelView",
        			    "visible": false
        			}
        		]
            },
            {
        		"text":"Danh mục",
        		"icon":static_url + "/images/icons/task_120.png",
        		"type":"category",
        		"visible": function(){
			    	//console.log(this.checkHasRole("Admin"));
			    	return this.checkHasRole("Admin") ;
			    },
        		"entries":[
        			{
        			    "text":"Quốc gia",
        			    "type":"view",
        			    "collectionName":"quocgia",
        			    "route":"quocgia/collection",
        			    "$ref": "app/view/DanhMuc/QuocGia/CollectionView",
        			    "visible": function(){
        			    	//console.log(this.checkHasRole("Admin"));
        			    	return this.checkHasRole("Admin") ;
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"quocgia",
        			    "route":"quocgia/model(/:id)",
        			    "$ref": "app/view/DanhMuc/QuocGia/ModelView",
        			    "visible": false
        			},
        			{
        			    "text":"Tỉnh thành",
        			    "type":"view",
        			    "collectionName":"tinhthanh",
        			    "route":"tinhthanh/collection",
        			    "$ref": "app/view/DanhMuc/TinhThanh/CollectionView",
        			    "visible": function(){
        			    	return this.checkHasRole("Admin") ;
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"tinhthanh",
        			    "route":"tinhthanh/model(/:id)",
        			    "$ref": "app/view/DanhMuc/TinhThanh/ModelView",
        			    "visible": false
					},
					{
        			    "text":"Quận huyện",
        			    "type":"view",
        			    "collectionName":"quanhuyen",
        			    "route":"quanhuyen/collection",
        			    "$ref": "app/view/DanhMuc/QuanHuyen/CollectionView",
        			    "visible": function(){
        			    	return this.checkHasRole("Admin") ;
        			    }
        			},
        			{
        			    "type":"view",
        			    "collectionName":"quanhuyen",
        			    "route":"quanhuyen/model(/:id)",
        			    "$ref": "app/view/DanhMuc/QuanHuyen/ModelView",
        			    "visible": false
        			},
        		]
            },
            {
        		"text": "Tìm kiếm Báo cáo",
        		"icon":static_url + "/images/icons/task_120.png",
        		"type":"category",
        		"entries":[
					{
					    "text":"Báo cáo đơn vị",
					    "type":"view",
					    "collectionName":"baocao",
					    "route":"baocao/timkiem",
					    "$ref": "app/view/BaoCao/TimKiemBaoCaoView",
					    "icon":static_url + "/images/icons/task_120.png",
					    "visible": function(){
        			    	return this.checkHasRole("Admin") || this.checkHasRole("VienAdmin")|| this.checkHasRole("VienUser") ||
        			    	this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    },
					},
					{
					    "text":"Báo cáo Viện",
					    "type":"view",
					    "collectionName":"baocaovien",
					    "route":"baocaovien/collection",
					    "$ref": "app/view/BaoCaoVien/CollectionView",
					    "icon":static_url + "/images/icons/task_120.png",
					    "visible": function(){
        			    	return this.checkHasRole("Admin") || this.checkHasRole("VienAdmin")|| this.checkHasRole("VienUser");
        			    }
					},
					{
					    "text":"Báo cáo cửa khẩu",
					    "type":"view",
					    "collectionName":"baocao",
					    "route":"baocao/timkiemck",
					    "$ref": "app/view/BaoCao/TimKiemBaoCaoCKView",
					    "icon":static_url + "/images/icons/task_120.png",
					},
					
					// {
        			//     "text":"Báo cáo nghi ngờ nhiễm bệnh",
        			//     "type":"view",
        			//     "collectionName":"baocaonghingonhiembenh",
        			//     "route":"baocaonghingonhiembenh/collection",
        			//     //"href":"baocao/baocaonghingonhiembenhcollection",
        			//     // "$ref": "app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhCollectionlView",
        			//     "icon":static_url + "/images/icons/task_120.png",
        			//     // "visible": function(){
        			//     // 	return this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			//     // }
					// },	
					
					
					
        		]
            },
            
            {
        		"text":"Tạo báo cáo",
        		"icon":static_url + "/images/icons/task_120.png",
        		"type":"category",
        		"visible": function(){
			    	return (!this.checkHasRole("Admin") && !this.checkHasRole("DonViAdmin"));
        			//return (!this.checkHasRole("Admin"));
			    },
        		"entries":[
        			
        			{
        			    "text":"Danh sách báo cáo",
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/collection",
        			    "$ref": "app/view/BaoCao/CollectionView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": false
        			},
        			{
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/model(/:id)",
        			    "$ref": "app/view/BaoCao/ModelView",
        			    "visible": false
        			},
        			{
        			    "text":"BC Tuần đơn vị",
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/tuanmodel(/:id)",
        			    "href":"baocao/tuanmodel",
        			    "$ref": "app/view/BaoCao/TuanModelView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    }
        			},
        			{
        			    "text":"BC Tháng đơn vị",
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/thangmodel(/:id)",
        			    "href":"baocao/thangmodel",
        			    "$ref": "app/view/BaoCao/ThangModelView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    }
        			},
        			{
        			    "text":"BC 6 Tháng đơn vị",
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/6thangmodel(/:id)",
        			    "href":"baocao/6thangmodel",
        			    "$ref": "app/view/BaoCao/6ThangModelView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    }
        			},
        			/*{
        			    "text":"BC 9 Tháng đơn vị",
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/9thangmodel(/:id)",
        			    "href":"baocao/9thangmodel",
        			    "$ref": "app/view/BaoCao/9ThangModelView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    }
        			},*/
        			{
        			    "text":"BC Năm đơn vị",
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/nammodel(/:id)",
        			    "href":"baocao/nammodel",
        			    "$ref": "app/view/BaoCao/NamModelView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    }
					},
					
        			{
        			    "text":"BC Tuần cửa khẩu",
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/tuanmodel(/:id)",
        			    "href":"baocao/tuanmodel",
        			    "$ref": "app/view/BaoCao/TuanModelView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("CuaKhauUser");
        			    }
        			},
        			{
        			    "text":"BC Tháng cửa khẩu",
        			    "type":"view",
        			    "collectionName":"baocao",
        			    "route":"baocao/thangmodel(/:id)",
        			    "href":"baocao/thangmodel",
        			    "$ref": "app/view/BaoCao/ThangModelView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("CuaKhauUser");
        			    }
        			},
        			{
        			    "text":"BC Viện",
        			    "type":"view",
        			    "collectionName":"baocaovien",
        			    "route":"baocaovien/model(/:id)",
        			    "href":"baocaovien/model",
        			    "$ref": "app/view/BaoCaoVien/ModelView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    "visible": function(){
        			    	return this.checkHasRole("VienAdmin") || this.checkHasRole("VienUser");
        			    }
					},
					
					
        		]
			},
			{
        		"text":"Báo cáo nCoV",
        		"icon":static_url + "/images/icons/task_120.png",
        		"type":"category",
        		// "visible": function(){
			    // 	return (!this.checkHasRole("Admin") && !this.checkHasRole("DonViAdmin"));
        		// 	//return (!this.checkHasRole("Admin"));
			    // },
        		"entries":[
					{
        			    "text":"Tờ khai y tế",
        			    "type":"view",
        			    "collectionName":"tokhaiyte",
        			    "route":"tokhaiyte/collection",
        			    //"$ref": "app/view/tokhaiyte/js/CollectionView",
						"icon":static_url + "/images/icons/task_120.png",
						"visible": false
        			},
					{
        			    "text":"Báo cáo nghi ngờ nhiễm bệnh",
        			    "type":"view",
        			    "collectionName":"baocaonghingonhiembenh",
        			    "route":"baocaonghingonhiembenh/collection",
        			    //"href":"baocao/baocaonghingonhiembenhcollection",
        			    //"$ref": "app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhCollectionlView",
        			    "icon":static_url + "/images/icons/task_120.png",
        			    // "visible": function(){
        			    // 	return this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    // }
					},
					{
        			    "text":" Báo cáo nCoV cửa khẩu",
        			    "type":"view",
        			    "collectionName":"baocaotonghopnghingonhiembenhnhoma",
        			    "route":"baocaotonghopnghingonhiembenhnhoma/model",
        			    "icon":static_url + "/images/icons/task_120.png",
						"visible": function(){
        			    	return this.checkHasRole("CuaKhauUser") || this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    }
					},
					{
        			    "text":" Báo cáo nCoV đơn vị",
        			    "type":"view",
        			    "collectionName":"baocaotonghopnghingonhiembenhnhoma",
        			    "route":"baocaotonghopnghingonhiembenhnhoma/view",
        			    "icon":static_url + "/images/icons/task_120.png",
						"visible": function(){
        			    	return this.checkHasRole("Admin") ||  this.checkHasRole("VienAdmin") ||  this.checkHasRole("VienUser") || this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    }
					},
					{
        			    "text":"Thống kê số liệu nCoV",
        			    "type":"view",
        			    "collectionName":"baocaotonghopnghingonhiembenhnhoma",
        			    "route":"thongkenghingonhiembenhnhoma",
        			    // "$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/CollectionView",
						"icon":static_url + "/images/icons/task_120.png",
						"visible": function(){
        			    	return this.checkHasRole("Admin") || this.checkHasRole("VienAdmin")|| this.checkHasRole("VienUser") ||
        			    	this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    },
					},
					{
        			    "text":"Thống kê số liệu nCoV - TW",
        			    "type":"view",
        			    "collectionName":"baocaotonghopnghingonhiembenhnhoma",
        			    "route":"thongkenghingonhiembenhnhomatw",
        			    // "$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/CollectionView",
						"icon":static_url + "/images/icons/task_120.png",
						"visible": function(){
        			    	return this.checkHasRole("Admin") || this.checkHasRole("VienAdmin")|| this.checkHasRole("VienUser") ||
        			    	this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
        			    },
					},
				]
			},
			{
        		"text":"Thống kê tổng hợp",
        		"icon":static_url + "/images/icons/task_120.png",
        		"type":"category",
        		"visible": function(){
			    	//console.log(this.checkHasRole("Admin"));
			    	//return this.checkHasRole("Admin") || this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser") 
			    	//|| this.checkHasRole("VienAdmin")|| this.checkHasRole("VienUser");
        			return true;
			    },
        		"entries":[
					{
					    "text":"Số liệu theo loại trung tâm",
					    "type":"view",
					    "collectionName":"thongkesolieutrungtam",
					    "route":"thongkesolieutrungtam",
					    "$ref": "app/view/ThongKe/ThongKeSoLieuView",
					    "icon":static_url + "/images/icons/task_120.png",
					    "viewData":{
					    	mode: "donvi",
					    },
					    "visible": function(){
					    	return this.checkHasRole("Admin") || this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser") 
					    	|| this.checkHasRole("VienAdmin")|| this.checkHasRole("VienUser");
					    },
					},
					{
					    "text":"Số liệu theo loại cửa khẩu",
					    "type":"view",
					    "collectionName":"thongkesolieucuakhau",
					    "route":"thongkesolieucuakhau",
					    "$ref": "app/view/ThongKe/ThongKeSoLieuView",
					    "icon":static_url + "/images/icons/task_120.png",
					    "viewData":{
					    	mode: "cuakhau",
					    },
					    "visible": function(){
					    	return !this.checkHasRole("CuaKhauUser");
					    },
					},

					

        		 ]
			},
			{
        		"text":"Tình hình gửi báo cáo",
        		"icon":static_url + "/images/icons/task_120.png",
        		"type":"category",
        		"visible": function(){
			    	//console.log(this.checkHasRole("Admin"));
			    	return this.checkHasRole("Admin") || this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser") 
			    	|| this.checkHasRole("VienAdmin")|| this.checkHasRole("VienUser");
			    },
        		"entries":[
					{
					    "text":"Đơn vị",
					    "type":"view",
					    "collectionName":"thongkeguibaocao",
					    "route":"thongkeguibaocao",
					    "$ref": "app/view/ThongKe/ThongKeGuiBaoCaoView",
					    "icon":static_url + "/images/icons/task_120.png",
					    "visible": function(){
					    	return !this.checkHasRole("CuaKhauUser") ;
					    },
					},
					{
					    "text":"Cửa khẩu",
					    "type":"view",
					    "collectionName":"thongkeguibaocaock",
					    "route":"thongkeguibaocaock",
					    "$ref": "app/view/ThongKe/ThongKeGuiBaoCaoCuaKhauView",
					    "icon":static_url + "/images/icons/task_120.png",
					    "visible": function(){
					    	return this.checkHasRole("CuaKhauUser") || this.checkHasRole("DonViUser") || this.checkHasRole("DonViAdmin");
					    },
					},
				]
        	},
        	
        	{
        		"text":"Trợ giúp",
        		"icon":static_url + "/images/icons/task_120.png",
        		"type":"category",
        		"entries":[
					{
					    "text":"Câu hỏi thường gặp",
					    "type":"view",
					    "collectionName":"faq",
					    "route":"faq/collection",
					    "$ref": "app/view/FAQ/CollectionView",
					    "icon":static_url + "/images/icons/task_120.png",
					    "visible": true,
					},
					{
					    "type":"view",
					    "collectionName":"faq",
					    "route":"faq/model(/:id)",
					    "$ref": "app/view/FAQ/ModelView",
					    "visible": false
					}, 
					{
					    "text":"Hướng dẫn sử dụng",
					    "type":"link",
					    "href":static_url + "/resources/HDSD_KDYT_2019.docx",
					    "icon":static_url + "/images/icons/task_120.png",
					    "visible": true,
					},
					{
					    "text":"Quản lý bài viết",
					    "type":"view",
					    "collectionName":"baiviet",
					    "route":"baiviet/collection",
					    "$ref": "app/view/BaiViet/CollectionView",
					    "icon":static_url + "/images/icons/task_120.png",
					    "visible": function(){
					    	//console.log(this.checkHasRole("Admin"));
					    	return this.checkHasRole("Admin") ;
					    },
					},
					{
					    "type":"view",
					    "collectionName":"baiviet",
					    "route":"baiviet/model(/:id)",
					    "$ref": "app/view/BaiViet/ModelView",
					    "visible": false
					}, 
					{
					    "type":"view",
					    "collectionName":"baiviet",
					    "route":"baiviet/readmodel(/:id)",
					    "$ref": "app/view/BaiViet/ReadModelView",
					    "visible": false
					}, 
					  
        		]
        	},
        	
			
        ];

});


