define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/ThongKeNghiNgoNhiemBenhNhomA/view.html'),
		//schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenh/Schema.json');
		schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/Schema.json');
	
	// var DonViSelectView = require("app/view/HeThong/DonVi/TreeNoChildrenSelectView");
	var DonViSelectView = require('app/view/HeThong/DonVi/TreeSelectView');

	return Gonrin.View.extend({
		template: template,
		// modelSchema: schema,
		urlPrefix: "/api/v1/",
		// collectionName: "baocaotonghopnghingonhiembenhnhoma",
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
					                self.getApp().getRouter().navigate("index");
								}
							},
		    	    	]
		    	    },
		    	],
		// uiControl: [
		// 	{
		// 		field:"donvi",
		// 		uicontrol: "ref",
		// 		textField: "ten",
		// 		//valueField: "value",
		// 		foreignRemoteField: "id",
		// 		foreignField: "donvi_id",
		// 		dataSource: DonViSelectView,
		//   },
		// ],
		render: function () {
			var self = this;
			var user = self.getApp().currentUser;
			var donvi = user.info.donvi;
			// self.model.set("donvi_id", donvi.id);
			self.$el.find("#chuquan").html(donvi.coquanchuquan);
			self.$el.find("#tendonvi").html(donvi.ten);
			self.$el.find("#select-donvi-container").hide();
			self.$el.find("#btn-add").show();
			
			var ret = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole("Admin"): false;
			if (ret === true) {
				self.$el.find("#btn-add").hide();
				self.$el.find("#select-donvi-container").show();
				self.$el.find("#button-container").removeClass("col-md-6").addClass("col-md-3");
			}else{
				self.$el.find('#donvi-input').val(user.info.donvi.id);
			}
			// self.applyBindings();
			self.$el.find('#tungay-input').val(moment().startOf('month').format("YYYY-MM-DD"));
			self.$el.find('#denngay-input').val(moment().add(1,'days').format("YYYY-MM-DD"));
			self.registerEvent();
			
			self.$el.find("#btn-view-report").trigger("click")
		},
		registerEvent: function(){
			var self = this;
			self.$el.find('#tungay-input').datetimepicker({
				textFormat:'DD/MM/YYYY',
				extraFormats:['DDMMYYYY'],
				format:"YYYY-MM-DD",
				widgetPositioning: {"vertical":"bottom"},
			});
			self.$el.find('#denngay-input').datetimepicker({
				textFormat:'DD/MM/YYYY',
				extraFormats:['DDMMYYYY'],
				format:"YYYY-MM-DD",
				widgetPositioning: {"vertical":"bottom"},
			});

			self.$el.find('#donvi-input').ref({
				textField: "ten",
				valueField: "id",
				dataSource: DonViSelectView,
			});

			self.$el.find("#btn-add").unbind("click").bind('click',function(){
				self.getApp().getRouter().navigate("baocaotonghopnghingonhiembenhnhoma/view");
			});

			self.$el.find("#btn-export-report").unbind("click").bind('click',function(){
				// var id = this.model.get("id"); 
				// var url = "/export/excel/baocaotonghopnghingonhiembenhnhoma/" + id;
				
				var donvi_id = self.$el.find('#donvi-input').val();
				var tungay = self.$el.find("#tungay-input").val();
				var denngay = self.$el.find("#denngay-input").val();

				if(tungay == "" || denngay == ""){
					self.getApp().notify("Vui lòng chọn thời gian từ ngày --> đến ngày");
					return false;
				}
				var params = {
					donvi_id: donvi_id,
					// nambaocao: nambaocao,
					tungay:tungay,
					denngay:denngay
				};
				var url = self.getApp().serviceURL + '/api/v1/thongketonghopnghingonhiembenhnhoma';
				url = url + "?tungay=" + tungay + "&denngay=" + denngay + "&donvi_id=" + donvi_id + "&export=1"
				window.open(url, "_blank");
			});
			
			self.$el.find("#btn-view-report").unbind("click").bind('click',function(){
				
				
				
				// var user = self.getApp().currentUser;
				// if(user === null || user === undefined){
				// 	self.getApp().getRouter().navigate("login");
				// 	return false;
				// }

				// var donvi_id;
				// var ret = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole("Admin"): false;
				
				// if (ret === true) {
				// 	donvi_id = self.$el.find('#donvi-input').val();
				// } else {
				// 	var donvi_id = user.info.donvi.id;
				// }
				
				// var nambaocao = self.$el.find("#nambaocao-input").val();
				var donvi_id = self.$el.find('#donvi-input').val();
				var tungay = self.$el.find("#tungay-input").val();
				var denngay = self.$el.find("#denngay-input").val();

				if(donvi_id == ""){
					self.getApp().notify("Vui lòng chọn đơn vị");
					return false;
				}

				if(tungay == "" || denngay == ""){
					self.getApp().notify("Vui lòng chọn thời gian từ ngày --> đến ngày");
					return false;
				}
				var params = {
					donvi_id: donvi_id,
					// nambaocao: nambaocao,
					tungay:tungay,
					denngay:denngay
				};
				$.ajax({
					url: self.getApp().serviceURL + '/api/v1/thongketonghopnghingonhiembenhnhoma',
					dataType: "json",
					type: "GET",
					data: params,
					contentType: "application/json",
					headers: {
						'content-type': 'application/json'
					},
					success: function (data) {
						console.log("data.ten===",data.ten);
						self.processBaocao(data);
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						self.getApp().notify("Có lỗi xảy ra, vui lòng thử lại sau");

					}
				});

			});
		},
		processBaocao: function(data){
			var self = this;
			var chitieus = [
				{"name":"hanhkhach", "text": "Số lượt khách khai báo y tế"},
				{"name":"chuyenbay", "text": "Số lượng chuyến bay nhập"},
				{"name":"nguoinghingo", "text": "Trường hợp nghi ngờ mắc bệnh truyền nhiễm"}
			];


			self.$el.find("#tr-tencuakhau").html("");
			self.$el.find("#body-data").html("");
			if(!data  || !data.ten || !data.days){
				return;
			}
			self.$el.find("#th-cuakhau").attr({"colspan":data.ten.length})
			for (var i = 0; i < data.ten.length; i++) {
				self.$el.find("#tr-tencuakhau").append(`<th>`+data.ten[i]+`</th>`)
			}

			$.each(chitieus, function(idx, chitieu){
				self.processChiTieu(chitieu,idx, data);
			});
			
		},
		processChiTieu: function(chitieu, idx,  data){
			var self = this;
			var len_day = data.days.length;
			var tr = $('<tr>');
			tr.append('<td rowspan="'+(len_day+2)+'" class="text-center">' + (idx + 1) + '</td>');
			tr.append('<td rowspan="'+(len_day+1)+'">' + chitieu.text +  '</td>');
			self.$el.find("#body-data").append(tr);


			for (var i = 0; i < len_day; i++) {
				var tr_row = $('<tr>');
				tr_row.append('<td class="text-center">' + data.days[i] + '</td>');
				
				//for tung cuu khau
				var tongso = 0;
				for(var j=0; j<data.data.length; j++) {
					var data_khaibao = data.data[j].data_khaibao;
					var value = "";
					if (data_khaibao[i]["value_" + chitieu.name] > 0){
						value = data_khaibao[i]["value_" + chitieu.name];
						tongso = tongso + value;
						
						// tongdoc = tongdoc + value;
					}
					tr_row.append('<td class="text-center">' + value + '</td>');
				}

				tr_row.append('<td class="text-center">' + tongso + '</td>');
				//tongso column here
				self.$el.find("#body-data").append(tr_row);
			}


			//tong
			var tr_tong = $('<tr style="font-style: bold" id="tong_' + chitieu.name +'">');
			tr_tong.append('<td colspan="2" class="text-center"><b>Cộng dồn</b></td>');
			var tong_tongso = 0;
			for(var j=0; j<data.data.length; j++) {
				var data_khaibao = data.data[j].data_khaibao;
				var tongdoc = 0;
				for (var i = 0; i < len_day; i++) {
					
					var value = 0;
					if (data_khaibao[i]["value_" + chitieu.name] > 0){
						value = data_khaibao[i]["value_" + chitieu.name];
						tongdoc = tongdoc + value;
						tong_tongso = tong_tongso + value;
					}
				}
				tr_tong.append('<td class="text-center"><b>' + tongdoc + '</b></td>');
			}
			tr_tong.append('<td class="text-center"><b>' + tong_tongso + '</b></td>');
			self.$el.find("#body-data").append(tr_tong);

		},

		// processBaocao1: function(data){
		// 	var self = this;
		// 	self.$el.find("#tr-tencuakhau").html("");
		// 	self.$el.find("#body-data").html("");

		// 	if(data !==null  && data.ten !==undefined){

		// 		self.$el.find("#th-cuakhau").attr({"colspan":data.ten.length})
		// 		for (var i = 0; i < data.ten.length; i++) {
		// 			self.$el.find("#tr-tencuakhau").append(`<th>`+data.ten[i]+`</th>`)
		// 		}
				
		// 		//ok
		// 		var number_row = data.data[0].data_khaibao.length;
		// 		var tr_first = $('<tr>');
		// 		tr_first.append('<td rowspan="'+(number_row+2)+'">' + 1 + '</td>');
		// 		tr_first.append('<td rowspan="'+(number_row+1)+'">Số lượt khách khai báo y tế</td>');
				
		// 		var tr_second = $('<tr>');
		// 		tr_second.append('<td rowspan="'+(number_row+2)+'">' + 2 + '</td>');
		// 		tr_second.append('<td rowspan="'+(number_row+1)+'">Số chuyến bay nhập</td>');
		// 		self.$el.find("#body-data").append(tr_first);

		// 		var tr_third = $('<tr>');
		// 		tr_third.append('<td rowspan="'+(number_row+2)+'">' + 3 + '</td>');
		// 		tr_third.append('<td rowspan="'+(number_row+1)+'">Trường hợp nghi ngờ mắc bệnh truyền nhiễm</td>');

		// 		var tr_tong_hanhkhach = $('<tr style="font-style: bold" id="tong_hanhkhach">');
		// 		var tr_tong_chuyenbay = $('<tr style="font-style: bold" id="tong_chuyenbay">');
		// 		var tr_tong_nguoinghingo = $('<tr style="font-style: bold" id="tong_nguoinghingo">')

		// 		tr_tong_hanhkhach.append('<td colspan="2" class="text-center"><b>Cộng dồn</b></td>');
		// 		tr_tong_chuyenbay.append('<td colspan="2" class="text-center"><b>Cộng dồn</b></td>');
		// 		tr_tong_nguoinghingo.append('<td colspan="2" class="text-center"><b>Cộng dồn</b></td>');


		// 		//ok
		// 		var el_chuyenbay = $("<div>");
		// 		el_chuyenbay.append(tr_second);
		// 		var el_songuoi_nghingo = $("<div>");
		// 		el_songuoi_nghingo.append(tr_third);

		// 		//var value_tonghanhkhach = [0,0,0,0];

		// 		for (var i = 0; i < data.data[0].data_khaibao.length; i++) {
		// 			var tr = $('<tr>');
		// 			var tr_chuyenbay = $('<tr>');
		// 			var tr_nguoinghingo = $('<tr>');
		// 			//for tung cuu khau
		// 			for(var j=0; j<data.data.length; j++) {
						
		// 				var item_data_col = data.data[j].data_khaibao;
		// 				var value_hanhkhach = item_data_col[i].value_hanhkhach >0? item_data_col[i].value_hanhkhach : "";
		// 				var value_chuyenbay = item_data_col[i].value_chuyenbay >0? item_data_col[i].value_chuyenbay : "";
		// 				var value_nghingo = item_data_col[i].value_nguoinghingo >0? item_data_col[i].value_nguoinghingo : "";
		// 				if(i==0) {
		// 					if (j==0) {
		// 						tr_first.append('<td class="text-center">' + item_data_col[i].text_day + '</td>');
		// 						tr_second.append('<td class="text-center">' + item_data_col[i].text_day + '</td>');
		// 						tr_third.append('<td  class="text-center">' + self.validate_null(value_nghingo) + '</td>');
		// 					}
		// 					tr_first.append('<td  class="text-center">' + self.validate_null(item_data_col[i].value_hanhkhach) + '</td>');
		// 					tr_second.append('<td  class="text-center">' + self.validate_null(value_chuyenbay) + '</td>');
		// 					tr_third.append('<td  class="text-center">' + self.validate_null(value_nghingo) + '</td>');
		// 					tr_tong_hanhkhach.append('<td  class="text-center" id="td_tong_hanhkhach'+j+'"><b>' + item_data_col[i].value_hanhkhach + '</b></td>');
		// 					tr_tong_chuyenbay.append('<td  class="text-center" id="td_tong_chuyenbay_'+j+'"><b>' + item_data_col[i].value_chuyenbay + '</b></td>');
		// 					tr_tong_nguoinghingo.append('<td  class="text-center" id="td_tong_nguoinghingo_'+j+'"><b>' + item_data_col[i].value_nguoinghingo + '</b></td>')
							
		// 				} else {
		// 					if (j==0){
		// 						tr.append('<td  class="text-center">' + item_data_col[i].text_day + '</td>');
		// 						tr_chuyenbay.append('<td  class="text-center">' + item_data_col[i].text_day + '</td>');
		// 						tr_nguoinghingo.append('<td  class="text-center">' + item_data_col[i].text_day + '</td>');
		// 					}
		// 					tr.append('<td  class="text-center">' + self.validate_null(item_data_col[i].value_hanhkhach) + '</td>');
		// 					tr_chuyenbay.append('<td  class="text-center">' + self.validate_null(value_chuyenbay) + '</td>');
		// 					tr_nguoinghingo.append('<td  class="text-center">' + self.validate_null(value_nghingo) + '</td>');
							

		// 					var tong_element = self.$el.find("#body-data td#td_tong_"+j);

		// 					var value_tong = parseInt(tong_element.text()) + parseInt(item_data_col[i].value_hanhkhach);
		// 					tong_element.html(value_tong);
							
		// 				}
		// 			}
					
		// 			self.$el.find("#body-data").append(tr);

		// 			el_songuoi_nghingo.append(tr_nguoinghingo);

		// 			el_chuyenbay.append(tr_chuyenbay);

		// 		}
				
		// 		self.$el.find("#body-data").append(tr_tong_hanhkhach);
		// 		self.$el.find("#body-data").append(el_chuyenbay.html());
		// 		self.$el.find("#body-data").append(tr_tong_chuyenbay);
		// 		self.$el.find("#body-data").append(el_songuoi_nghingo.html());
		// 		self.$el.find("#body-data").append(tr_tong_nguoinghingo);


				
		// 		for (var i = 0;i < data.data.length;i++) {
		// 			//for tung cua khau
		// 			var hanhkhach_cuakhau = 0,
		// 				chuyenbay_cuakhau = 0,
		// 				tong_nghingo = 0;
		// 			var data_khaibao = data.data[i].data_khaibao;
		// 			for (var j = 0;j < data_khaibao.length ;j++) {
		// 				//for tung ngay
		// 				hanhkhach_cuakhau = hanhkhach_cuakhau + data_khaibao[j].value_hanhkhach;
		// 				hanhkhach_cuakhau = self.validate_null(hanhkhach_cuakhau);

		// 				chuyenbay_cuakhau = chuyenbay_cuakhau + data_khaibao[j].value_chuyenbay;
		// 				chuyenbay_cuakhau = self.validate_null(chuyenbay_cuakhau);
						
		// 				tong_nghingo = tong_nghingo + data_khaibao[j].value_nguoinghingo;
		// 				tong_nghingo = self.validate_null(tong_nghingo);
		// 			}
		// 			self.$el.find("#body-data td#td_tong_hanhkhach"+i).text(hanhkhach_cuakhau);
		// 			self.$el.find("#body-data td#td_tong_nguoinghingo_"+i).text(chuyenbay_cuakhau);
		// 			self.$el.find("#body-data td#td_tong_nguoinghingo_"+i).text(tong_nghingo);
		// 		}
		// 	}
		// },
		// validate_null: function(data = null) {
		// 	if (data == null) {
		// 		return 0;
		// 	}
		// 	return data;
		// },
		// datetimeFormat: function(datetime, formatString, align = null) {
		// 	var format = (formatString != null) ? formatString : "DD-MM-YYYY HH:mm:ss";
		// 	if (align == null) {
		// 		return moment(datetime, ["MM-DD-YYYY", "YYYY-MM-DD"]).isValid() ? moment(datetime, ["MM-DD-YYYY", "YYYY-MM-DD"]).format(format) : "";
		// 	}
		// 	return moment(datetime).isValid() ? `<div style="text-align: ${align}">${moment(datetime).format(format)}</div>` : "";
			
		// },
		// timestampFormat: function(utcTime, format = "YYYY-MM-DD HH:mm:ss") {
        //     return moment(utcTime).local().format(format);
		// },
		// parseDate: function (val) {
		// 	var result = null;
		// 	if (val === null || val === undefined || val === "" || val === 0) {
		// 		//				return moment.utc();
		// 		result = null;
		// 	} else {
		// 		var date = null;
		// 		if ($.isNumeric(val) && parseInt(val) > 0) {
		// 			date = new Date(val * 1000);
		// 		} else if (typeof val === "string") {
		// 			date = new Date(val);
		// 		} else {
		// 			result = moment.utc();
		// 		}
		// 		if (date != null && date instanceof Date) {
		// 			result = moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]);
		// 		}
		// 		return result;
		// 	}
		// },
	});

});