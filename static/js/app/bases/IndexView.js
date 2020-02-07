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
    var template = tpl;
    
    var baiviet_tpl = require('text!tpl/base/baiviet_index.html');
    var baiviet_item_tpl = require('text!tpl/base/baiviet_item_tpl.html');
    
    return Gonrin.View.extend({
    	template : template,
		render: function(){
			var self = this;
			self.$el.append(baiviet_tpl);
			self.fetchBaiViet();
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
		}
	});

});