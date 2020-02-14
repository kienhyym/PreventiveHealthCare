define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/ThongKeNghiNgoNhiemBenhNhomA/tw.html'),
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
				var url = self.getApp().serviceURL + '/api/v1/thongketonghopnghingonhiembenhnhoma/tw';
				url = url + "?tungay=" + tungay + "&denngay=" + denngay + "&donvi_id=" + donvi_id + "&export=1"
				window.open(url, "_blank");
			});
			
			self.$el.find("#btn-view-report").unbind("click").bind('click',function(){
				
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
					url: self.getApp().serviceURL + '/api/v1/thongketonghopnghingonhiembenhnhoma/tw',
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
			var chitieus = data.chitieu;


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
					var data_value = data.data[j].data_value;
					var value = "";
					if (data_value[i][chitieu.name] !== null){
						value = data_value[i][chitieu.name];
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
				var data_value = data.data[j].data_value;
				var tongdoc = 0;
				for (var i = 0; i < len_day; i++) {
					
					var value = 0;
					if (data_value[i][chitieu.name] > 0){
						value = data_value[i][chitieu.name];
						tongdoc = tongdoc + value;
						tong_tongso = tong_tongso + value;
					}
				}
				tr_tong.append('<td class="text-center"><b>' + tongdoc + '</b></td>');
			}
			tr_tong.append('<td class="text-center"><b>' + tong_tongso + '</b></td>');
			self.$el.find("#body-data").append(tr_tong);

		},

	});

});