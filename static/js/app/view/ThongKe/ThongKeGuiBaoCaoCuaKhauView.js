define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/ThongKe/thongkeguibaocaocuakhau.html');
    //	schema 				= require('json!app/view/BaoCao/Schema.json');
    
    var row_tpl = '<tr><td> - {{ten}}</td><td>{{lienlac}}</td><td>{{thieutuan}}</td><td>{{thieuthang}}</td></tr>';
    
    return Gonrin.View.extend({
    	template : template,
      	render:function(){
      		var self = this;
      		$.ajax({
 				url: (self.getApp().serviceURL || "") + "/api/v1/thongkeguibaocaocuakhau",
 				data: {"type": "cuakhau"},
 				dataType: "json",
 				contentType: "application/json",
 				success: function(data) {
 					var $thongke = self.$el.find("#thongke");
 					$.each(data, function(idx, obj){
 						var str = "Đơn vị: " + obj.ten;
 						var lienlac = "SĐT: " + (obj.sodienthoai || "")  + "<br/> Email: " + (obj.email || "");
 						var thieutuanstr = "" + obj.thieu_tuan.join(", ");
 						var thieuthangstr = "" + obj.thieu_thang.join(", ");
 						
 						var objstr = {
 								ten: obj.ten,
 								lienlac: lienlac,
 								thieutuan: thieutuanstr,
 								thieuthang: thieuthangstr
 						}
 						var rowtpl = gonrin.template(row_tpl)
 						var rowstr = rowtpl(objstr);
 						$thongke.append(rowstr);
 					});
 				},
 				error:function(xhr,status,error){
 					self.getApp().notify("Get data Error");
				},
			});
      	//	console.log(this);
      	}
    });
    
});