define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/tpl/model.html'),
		schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/Schema.json');


    var NguoiNghiNhiemView = require('app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/DanhSachNghiNgoCollection');
	
	
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaotonghopnghingonhiembenhnhomA",
		tools : [
		    	    {
		    	    	name: "defaultgr",
		    	    	type: "group",
		    	    	groupClass: "toolbar-group",
		    	    	buttons: [
							{
								name: "back",
								type: "button",
								buttonClass: "btn-default btn-sm",
								label: "TRANSLATE:BACK",
								command: function(){
									var self = this;
									//Backbone.history.history.back();
					                self.getApp().getRouter().navigate("baocaotonghopnghingonhiembenhnhoma/collection");
								}
							},
							{
				    	    	name: "save",
				    	    	type: "button",
				    	    	buttonClass: "btn-success btn-sm",
				    	    	label: "TRANSLATE:SAVE",
				    	    	command: function(){
                                    var self = this;
                                    // var ngaybaocao = self.$el.find("#ngaybaocao").val();
				                    // ngaybaocao = parseInt(ngaybaocao) ? parseInt(ngaybaocao) : 0;
                                    // self.model.set("ngaybaocao",ngaybaocao);
                                   
				    	    		// if(!self.validate()){
				    	    		// 	return;
				    	    		// }
				                    self.model.save(null,{
				                        success: function (model, respose, options) {
				                            self.getApp().notify("Save successfully");
				                            self.getApp().getRouter().navigate("baocaotonghopnghingonhiembenhnhoma/collection");
				                        },
				                        error: function (model, xhr, options) {
				                            //self.alertMessage("Something went wrong while processing the model", false);
				                            self.getApp().notify('Save error');
				                        }
				                    });
				    	    	}
							}
		    	    	]
					},
					{
						name : "exportgr",
						type : "group",
						groupClass : "toolbar-group",
						buttons : [ {
							name : "excel",
							type : "button",
							buttonClass : "btn-default btn-sm btn-primary",
							label : "Xuất Excel",
							command : function() {
								var id = this.model.get("id"); 
								var url = "/export/excel/baocaotonghopnghingonhiembenhnhoma/" + id;
								 window.open(url, "_blank");
								// self.getApp().getRouter().navigate(self.collectionName + "/collection");
							},
							visible: function(){
								var id =  this.getApp().getRouter().getParam("id");
								console.log(id, id !== null, "visible");
								return (id !== null);
								// return true;
							}
						}]
					},
		    	],
		uiControl: [
			{field:"ngaybaocao",  textFormat :"DD/MM/YYYY", disabledComponentButton: false},
			{
				field:"loaibaocao",
				uicontrol:"combobox",
				textField: "text",
				valueField: "value",
				cssClass:"form-control",
				dataSource: [
					{ value: 1, text: "Đơn vị" },
					{ value: 2, text: "Cửa khẩu" },
				 ],
			},
		],
		render: function () {
            var self = this;
            var user = self.getApp().currentUser;
            self.$el.find(".duonghangkhong").hide();
			self.$el.find(".loaibaocao").hide();
            if (user) {
                var id = this.getApp().getRouter().getParam("id");
                if (id) {
                    //progresbar quay quay
                    this.model.set('id', id);
                    this.model.fetch({
                        success: function (data) {
                            // self.$el.find("#ngaybaocao").val(self.model.get("ngaybaocao"));
                            var info = user.info;
                            var cuakhau = info.cuakhau;
                            if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
                                if (cuakhau.duonghangkhong == true) {
                                    self.$el.find(".duonghangkhong").show();
                                }
							}
                            self.applyBindings();
                            self.registerEvent();
                        },
                        error: function () {
                            self.getApp().notify("Get data Eror");
                        },
                    });
                } else {
					self.model.set("ngaybaocao", moment().startOf('day').unix());
                    self.applyBindings();
					self.registerEvent();
					var info = user.info;
                    var cuakhau = info.cuakhau;
                    if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
                        self.model.set({"cuakhau_id":cuakhau.id,"tencuakhau":cuakhau.ten,"macuakhau":cuakhau.ma});
                        if (cuakhau.duonghangkhong == true) {
                            self.$el.find(".duonghangkhong").show();
                        }
                    }
                    var donvi = info.donvi;
                    if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
                        self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten})
                    }
                }
            }
		},
		checkRole: function(role) {
			var ret = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole(role): false;
			return ret;
		},
		registerEvent: function(){
			var self = this;
			if (self.checkRole("Admin")) {
				self.model.set("loaibaocao",2);
				self.$el.find(".user_donvi").hide();
				self.$el.find(".user_cuakhau").show();
				self.$el.find(".loaibaocao").show();
			}
			else if (self.checkRole("CuaKhauUser")) {
				self.model.set("loaibaocao",2);
				self.$el.find(".user_donvi").hide();
				self.$el.find(".user_cuakhau").show();
			} else if(self.checkRole("DonViUser") || self.checkRole("DonViAdmin")) {
				console.log("234");
				self.model.set("loaibaocao",1);
				self.$el.find(".user_donvi").show();
				self.$el.find(".user_cuakhau").hide();
			}
			self.model.on("change:loaibaocao", function() {
				var loaibaocao = self.model.get("loaibaocao");
				if (loaibaocao == 1) {
					self.$el.find(".user_donvi").show();
					self.$el.find(".user_cuakhau").hide();
				} else {
					self.$el.find(".user_donvi").hide();
					self.$el.find(".user_cuakhau").show();
				}
			});
			var danhsach = new NguoiNghiNhiemView();
			// var thongtincon = new NguoiNghiNhiemView({ "viewData": { "id": con.id, "con": con, "me": me, "bo": bo } });
				self.$el.find("#add-nghingonhiembenh-item").empty();
				danhsach.render();
				self.$el.find("#content").append(danhsach.el);
			

		},
		validate: function() {
			var self = this;
			var ngaybaocao = self.model.get("ngaybaocao");
			if(!ngaybaocao) {
				self.getApp().notify('Vui lòng điền ngày báo cáo');
				return false;
			}
			return true;
			
		}
	});

});