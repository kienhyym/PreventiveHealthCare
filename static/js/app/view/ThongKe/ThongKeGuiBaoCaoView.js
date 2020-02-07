define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/ThongKe/thongkeguibaocao.html');
	//	schema 				= require('json!app/view/BaoCao/Schema.json');

	var row_tpl = '<tr><td> - {{ten}}</td><td>{{lienlac}}</td><td>{{thieutuan}}</td><td>{{thieuthang}}</td><td>{{thieu6thang}}</td><td>{{thieunam}}</td></tr>';

	return Gonrin.View.extend({
		template: template,
		render: function () {
			var self = this;
			var nambaocao = self.$el.find("#nambaocao").val();
			if (!nambaocao) {
				nambaocao = moment().year();
				self.$el.find("#nambaocao").val(nambaocao);
			};
			self.$el.find("#filterBtn").unbind("click").bind("click", function(){
				self.getThongKe();
			});
			self.getThongKe();
			//	console.log(this);
		},
		getThongKe: function(){
			var self = this;
			var nambaocao = self.$el.find("#nambaocao").val();
			if (!nambaocao) {
				nambaocao = moment().year();
				self.$el.find("#nambaocao").val(nambaocao);
			}

			var url = (self.getApp().serviceURL || "") + "/api/v1/thongkeguibaocao";
			if(!!nambaocao){
				url = url + "?nambaocao=" + nambaocao
			};
			$.ajax({
				url: url,
				data: { "type": "donvi" },
				dataType: "json",
				contentType: "application/json",
				success: function (data) {
					//console.log(data);
					var $thongke = self.$el.find("#thongke");
					$thongke.empty();
					$.each(data, function (idx, obj) {
						var str = "Đơn vị: " + obj.ten;
						var lienlac = "SĐT: " + (obj.sodienthoai || "") + "<br/> Email: " + (obj.email || "");
						console.log(lienlac);
						var thieutuanstr = "" + obj.thieu_tuan.join(", ");
						var thieuthangstr = "" + obj.thieu_thang.join(", ");
						var thieu6thangstr = "" + obj["thieu_6thang"].join(", ");
						var thieu9thangstr = "" + obj["thieu_9thang"].join(", ");
						var thieunamstr = "" + obj["thieu_nam"].join(", ");

						var objstr = {
							ten: obj.ten,
							lienlac: lienlac,
							thieutuan: thieutuanstr,
							thieuthang: thieuthangstr,
							thieu6thang: thieu6thangstr,
							//thieu9thang: thieu9thangstr,
							thieunam: thieunamstr
						}
						var rowtpl = gonrin.template(row_tpl)
						var rowstr = rowtpl(objstr);
						$thongke.append(rowstr);
					});
				},
				error: function (xhr, status, error) {
					self.getApp().notify("Get data Error");
				},
			});
		}

	});

});