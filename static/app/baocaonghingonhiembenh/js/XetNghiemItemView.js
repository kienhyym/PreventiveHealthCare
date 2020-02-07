define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var itemTemplate = require('text!app/baocaonghingonhiembenh/tpl/xetnghiemitem.html'),
		itemSchema = require('json!schema/BaoCaoNghiNgoNhiemBenhXetNghiemSchema.json');


	return Gonrin.ItemView.extend({
		template: itemTemplate,
		bindings: 'data-xetnghiem-bind',
		modelSchema: itemSchema,
		urlPrefix: "/api/v1/",
		collectionName: "collectionName",
		foreignRemoteField: "id",
		foreignField: "baocao_id",

		uiControl: [
		            {field:"loaimauxetnghiem", cssClass:false},
		            {field:"ketqua", cssClass:false},
		            {field:"ngaylay", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true}
		            ],
		render: function () {
			var self = this;
			this.applyBindings();
			self.registerEvent();
			
			console.log("ABC");
			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
				//self.trigger("onRemove", self.model.toJSON());
			});
		},

		

		registerEvent: function () {
			var self = this;
//			var image = self.model.get("item_image") ? self.model.get("item_image") : "static/images/default-dist.jpeg"
//			// self.$el.find("#image-space").css({ "background-image": "url(" + image + ")" });
//			self.$el.find("#image_item").attr("src", image);
//
//			if (self.model.get("item_type") == "is_material") {
//				self.$el.find("#item_type").html(`Nguyên liệu`);
//			} else if (self.model.get("item_type") == "is_raw_material") {
//				self.$el.find("#item_type").html(`Nguyên liệu thô`);
//			} else if (self.model.get("item_type") == "is_package") {
//				self.$el.find("#item_type").html(`Combo`);
//			} else if (self.model.get("item_type") == "is_service") {
//				self.$el.find("#item_type").html(`Dịch vụ`);
//			}
		}
	});

});