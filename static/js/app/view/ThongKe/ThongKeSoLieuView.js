define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/ThongKe/solieutheotrungtam.html');
    //	schema 				= require('json!app/view/BaoCao/Schema.json');
    var NguoiView 		= require("app/view/ThongKe/NguoiView");
    var NguoiCKView 		= require("app/view/ThongKe/NguoiCKView");
    
    var PhuongTienView 		= require("app/view/ThongKe/PhuongTienView");
    var PhuongTienCKView 		= require("app/view/ThongKe/PhuongTienCKView");
    
    var HangHoaView 		= require("app/view/ThongKe/HangHoaView");
    var HangHoaCKView 		= require("app/view/ThongKe/HangHoaCKView");
    
    var ThiTheView 		= require("app/view/ThongKe/ThiTheView");
    var ThiTheCKView 		= require("app/view/ThongKe/ThiTheCKView");
    
    var VSSHView 		= require("app/view/ThongKe/VSSHView");
    var VSSHCKView 		= require("app/view/ThongKe/VSSHCKView");
    var FilterView 		= require("app/view/ThongKe/FilterView");
    
    return Gonrin.View.extend({
    	template : template,
      	render:function(){
      		var self = this;
      		//
      		var mode = this.viewData.mode;
      		if(mode === "donvi"){
      			self.$el.find("#view-header").html("Thống kê tổng hợp số liệu theo đơn vị");
      		}else{
      			self.$el.find("#view-header").html("Thống kê tổng hợp số liệu theo cửa khẩu");
      		}
      		var $filter = self.$el.find("#filter");
      		var filterView = new FilterView({el: $filter, viewData:{mode: mode}});
      		filterView.render();
      		//
      		
      		var $filterbut = self.$el.find("#filter-submit");
      		var $excelbut = self.$el.find("#excel-submit");
      		$filterbut.unbind("click").bind("click", function(){
      			self.$el.find("#bangnguoi").empty();
          		self.$el.find("#bangphuongtien").empty();
          		self.$el.find("#banghanghoa").empty();
          		self.$el.find("#bangthithe").empty();
          		self.$el.find("#bangvssh").empty();
          		
      			var filterObj = filterView.model.toJSON();
      			if (self.checkValidParams(filterObj)){
      				$.ajax({
         				url: (self.getApp().serviceURL || "") + "/api/v1/thongketheodonvi",
         				data: {"query": JSON.stringify(filterObj)},
         				dataType: "json",
         				contentType: "application/json",
         				success: function(data) {
         					self.$el.find("#content").show();
         					
         					var title = "Số liệu: ";
         					if(filterObj.loaikybaocao == 1){
         						title = title + "từ tuần " + filterObj.tutuan + " năm " + filterObj.tunam + " đến tuần " + filterObj.dentuan + " năm "+filterObj.dennam;
         						self.$el.find("#hanghoa").hide();
         						self.$el.find("#thithe").hide();
         						self.$el.find("#vssh").hide();
         					}else{
         						self.$el.find("#hanghoa").show();
         						self.$el.find("#thithe").show();
         						self.$el.find("#vssh").show();
         					}
         					
         					if(filterObj.loaikybaocao == 2){
         						title = title + "từ tháng " + filterObj.tuthang + " năm "+filterObj.tunam+ " đến tháng " + filterObj.denthang + " năm "+filterObj.dennam;
         					}
         					
         					if(filterObj.loaikybaocao == 3){
         						title = title + "từ 6 tháng " + filterObj.tu6thang + " năm "+filterObj.tunam+ " đến 6 tháng " + filterObj.den6thang + " năm "+filterObj.dennam;
         					}
         					
         					if(filterObj.loaikybaocao == 5){
         						title = title + "từ năm "+filterObj.tunam+ " đến năm "+filterObj.dennam;
         					}
         					
         					self.$el.find("#data-header").html(title);
         					if((!!data) && (!!data.data)){
         						self.renderThongKe(data.data);
         					}
         					
         				},
         				error:function(xhr,status,error){
         					self.getApp().notify("Get data Error");
        				},
        			});
      			}else{
      				self.getApp().notify("Xin chọn đầy đủ các tham số");
      			}
      			
      			//console.log(filterObj);
      		});
      		
      		$excelbut.unbind("click").bind("click", function(){
      			var filterObj = filterView.model.toJSON();
      			if (self.checkValidParams(filterObj)){
      				var url = self.getApp().serviceURL + "/api/v1/thongketheodonvi?query=" + JSON.stringify(filterObj) + "&export=true";
          			window.open(url);
      			}else{
      				self.getApp().notify("Xin chọn đầy đủ các tham số");
      			}
      			
      		});
      		
      		
      	//	console.log(this);
      	},
      	checkValidParams: function(model){
      		if (model.loaikybaocao === null){
      			return false;
      		}
      		if (model.loaikybaocao == 1){
      			if ((model.tutuan === null) || (model.dentuan === null)){
      				return false;
      			}
      		}
      		if (model.loaikybaocao == 2){
      			if ((model.tuthang === null) || (model.denthang === null)){
      				return false;
      			}
      		}
      		if (model.loaikybaocao == 3){
      			if ((model.tu6thang === null) || (model.den6thang === null)){
      				return false;
      			}
      		}
      		if ((model.tunam === null) || (model.dennam === null)){
      			return false;
      		}
      		if ((model.cuakhau === null) || (model.cuakhau.length == 0)){
      			return false;
      		}
      		if ((model.donvi === null) || (model.donvi.length == 0)){
      			return false;
      		}
      		
      		return true;
      	},
      	renderThongKe : function(data){
      		var self = this;
      		$.each(data, function(bang, bangdata){
      			var $bangEl = self.$el.find("#"+ bang);
      			self.processBang(bang, bangdata, $bangEl);
      		});
      	},
      	processBang: function(bang, bangdata, $bangEl){
      		
      		var DVView;
      		var CKView;
      		
      		if(bang === "bangnguoi"){
      			DVView = NguoiView;
      			CKView = NguoiCKView;
      		}
      		if(bang === "bangphuongtien"){
      			DVView = PhuongTienView;
      			CKView = PhuongTienCKView;
      		}
      		if(bang === "banghanghoa"){
      			DVView = HangHoaView;
      			CKView = HangHoaCKView;
      		}

      		if(bang === "bangthithe"){
      			DVView = ThiTheView;
      			CKView = ThiTheCKView;
      		}
      		if(bang === "bangvssh"){
      			DVView = VSSHView;
      			CKView = VSSHCKView;
      		}
      		
      		
			var sothutu = 0;
			$.each(bangdata, function(donvi_id, donvidata){
				sothutu = sothutu + 1;
				
				var view = new DVView({viewData:{donvi_id:donvi_id }});
				//donvidata.tendonvi = donvi;
				donvidata.sothutu = sothutu;
				view.model.set(donvidata);
				view.render();
				$bangEl.append(view.$el);
				
				//cuakhau
				var cksothutu = 0;
				$.each(donvidata.cuakhau, function(ck, ckdata){
					cksothutu = cksothutu + 1;
				
					var ckview = new CKView({viewData:{donvi_id:donvi_id }});
					ckdata.sothutu = cksothutu;
					ckview.model.set(ckdata);
					ckview.render();
					$bangEl.append(ckview.$el);
				});
			});
			//show hide
			var ckdata = $bangEl.find("div#ckdata");
			$.each(ckdata, function(idx, but){
				var $but = $(but);
				$but.bind("click", function(){
					var $seftbut = $(this);
					var $tr = $seftbut.closest('tr');
					var datastate = $seftbut.attr('data-state');
  					if($tr){
  						var dvid = $tr.attr("donvi_id");
  						if(datastate === "close"){
  							$seftbut.attr('data-state', "open");
  							$seftbut.find("span").removeClass("glyphicon-plus").addClass("glyphicon-minus");
  							var ckrow = $bangEl.find("tr[donvi_id=" + dvid+ "][rowtype='ck']");
  							ckrow.show();
  							
  						}else if(datastate === "open"){
  							$seftbut.attr('data-state', "close");
  							$seftbut.find("span").removeClass("glyphicon-minus").addClass("glyphicon-plus");
  							var ckrow = $bangEl.find("tr[donvi_id=" + dvid+ "][rowtype='ck']");
  							ckrow.hide();
  						}
  					}
				});
				
			});
      	}
    });
    
});