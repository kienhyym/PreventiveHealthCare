define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    var currentUser = gonrinApp().currentUser;
    var isAdmin = currentUser != null ? currentUser.hasRole('Admin'): false;
    var isVienAdmin = currentUser != null ? currentUser.hasRole('VienAdmin'): false;
    var isVienUser = currentUser != null ? currentUser.hasRole('VienUser'): false;
    var isDonViAdmin = currentUser != null ? currentUser.hasRole('DonViAdmin'): false;
    var isDonViUser = currentUser != null ? currentUser.hasRole('DonViUser'): false;
    var isCuaKhauUser = currentUser != null ? currentUser.hasRole('CuaKhauUser'): false;
    
    var tpl = require('text!tpl/base/index.html');
    if(isAdmin){
    	tpl = require('text!tpl/base/admin_index.html');
    }
    else if(isDonViAdmin){
    	tpl = require('text!tpl/base/donviadmin_index.html');
    }
    else if(isDonViUser){
    	tpl = require('text!tpl/base/donviuser_index.html');
    }
    else if(isCuaKhauUser){
    	tpl = require('text!tpl/base/cuakhauuser_index.html');
    }
    else if(isVienAdmin || isVienUser){
    	tpl = require('text!tpl/base/vienuser_index.html');
    }
    
    //var template = _.template(tpl);
    var template = gonrin.template(tpl)({});;
    
    var baiviet_tpl = require('text!tpl/base/baiviet_index.html');
    var baiviet_item_tpl = require('text!tpl/base/baiviet_item_tpl.html');
    
    return Gonrin.View.extend({
    	template : template,
		render: function(){
			var self = this;
			self.$el.append(baiviet_tpl);
			self.fetchBaiViet();
			if(isDonViAdmin || isDonViUser || isCuaKhauUser){
				self.renderCuaKhau();
			}
			return this;
		},
		fetchBaiViet: function(){
			var self = this;
			self.$el.find("#baiviet_container").empty();
			
			var order_by = [{"field": "ngaytao", "direction": "desc"}]
			//ajax
			$.ajax({
				url: "/api/v1/baiviet",
				data: {"q": JSON.stringify({"order_by": order_by})},
				method: "GET",
				contentType: "application/json",
				success: function (data) {
					
					self.renderBaiViet(data.objects);
				},
				error: function (xhr, status, error) {

				},
			});
		},
		renderBaiViet: function(data){
			var self = this;
			$.each(data, function(idx, obj){
				if(obj.phamvi === "thongtin"){
					var tpl = gonrin.template(baiviet_item_tpl)(obj);
		            self.$el.find("#thongtin").append(tpl);
				}
				if(obj.phamvi === "vanbanchidao"){
					var tpl = gonrin.template(baiviet_item_tpl)(obj);
		            self.$el.find("#vanbanchidao").append(tpl);
				}
				if(obj.phamvi === "quyphamphapluat"){
					var tpl = gonrin.template(baiviet_item_tpl)(obj);
		            self.$el.find("#quyphamphapluat").append(tpl);
				}
				
			})
		},
		renderCuaKhau: function(){
			var self = this;
			var user = self.getApp().currentUser;
            if (user) {

                var donvi_id = null, tendonvi = null, cuakhau_id = null, tencuakhau = null;
                var info = user.info;
                

                var cuakhau = info.cuakhau;
                if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
                    cuakhau_id = cuakhau.id;
                    tencuakhau = cuakhau.ten;
                    // self.model.set({"cuakhau_id":cuakhau_id,"tencuakhau":cuakhau.ten});
                    
                }
                var donvi = info.donvi;
                if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
                    // self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten})
                    donvi_id = donvi.id;
                    tendonvi = donvi.ten;
                }

                var defaultFilter = {"$and": []};

                if((user.hasRole("CuaKhauUser")) || (user.hasRole("DonViUser")) || (user.hasRole("DonViAdmin"))){
                	if (!!donvi_id) {
                        defaultFilter["$and"].push({ "donvi_id": { "$eq": donvi_id } });
                        
                        if (!!cuakhau_id) {
                            defaultFilter["$and"].push({ "id": { "$eq": cuakhau_id } });
                        }
                        
                    }
				}

				var param = {"filters": defaultFilter};

				$.ajax({
					url: "/api/v1/cuakhau",
					data: {"q": JSON.stringify(param)},
					method: "GET",
					contentType: "application/json",
					success: function (data) {
						self.$el.find("#cuakhau-container").empty();
						self.$el.find("#cuakhau-container").grid({
							// showSortingIndicator: true,
							orderByMode: "client",
							
							fields: [
								{ field: "id", label: "ID", visible: true, width: "250px", sortable: { order: "asc" } },
								{
									field: "ten",
									label: 'Tên cửa khẩu',
									//  template: '<a href="http://abc.com/{{ id }}"><img src="http://img.abc.com/{{ id }}"><span>{{ name }}</span></a></span>',

								},
								{
									field: "command",
									label: " ",
									width: "50px",
									command: [
										{
											"label": "Lấy QR",
											"action": function (params, args) {
												console.log(params);
												
												var size = 300;
												if (params.rowData.id){
													var $qr = $("<div>").addClass("text-center").attr("align", "center");
													var url = "http://baocaokdyt.com/medicalform/qr/" + params.rowData.id;
												
													var $code = $("<div>").addClass("text-center").attr("align", "center").css({"width": size + "px", "margin-top":"20px", "display": "inline flow-root list-item"});
													var $link = $("<div>").addClass("text-center").attr("align", "center").css("margin-top", "20px").html("Link: " + url);
													var $name = $("<div>").addClass("text-center").attr("align", "center").css("margin-top", "20px").html("Cửa khẩu: " + '<b>'+params.rowData.ten + '</b');

													$qr.empty();
													$qr.append($code);
													$qr.append($link);
													$qr.append($name);

													var qrcode = new QRCode($code.get( 0 ), {
														text: url,
														width: size,
														height: size,
														colorDark : "#000000",
														colorLight : "#ffffff",
														correctLevel : QRCode.CorrectLevel.H
													});
													
													gonrin.dialog.dialog({
														message: $qr
													});
												}
												//    $("#grid").data('gonrin').deleteRow(params.el);
											},
											"class": "btn-warning btn-xs"
										},
									],
								},
							],

							dataSource: data.objects,
							primaryField: "id",
							selectionMode: false,
							pagination: null
							//  pagination: {
							// 	 page: 1,
							// 	 pageSize: 1000
							//  },
						})
					},
					error: function (xhr, status, error) {
	
					},
				});
				
			}
			
		}
	});

});