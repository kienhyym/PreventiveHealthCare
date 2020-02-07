define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var itemTemplate = require('text!app/baocaonghingonhiembenh/tpl/nguoitiepxucitem.html'),
		itemSchema = require('json!schema/BaoCaoNghiNgoNhiemBenhNguoiTiepXucSchema.json');


	return Gonrin.ItemView.extend({
		template: itemTemplate,
		bindings: 'data-nguoitiepxuc-bind',
		tagName: 'tr',
		modelSchema: itemSchema,
		urlPrefix: "/api/v1/",
		collectionName: "collectionName",
		foreignRemoteField: "id",
		foreignField: "baocao_id",

		uiControl: [
		            {field:"hoten", cssClass:false},
		            {field:"quoctich", cssClass:false},
		            {field:"cmtnd", cssClass:false},
		            {field:"dienthoai", cssClass:false},
		            {field:"email", cssClass:false},
		            ],
		render: function () {
			var self = this;
			this.applyBindings();
			
			self.$el.find("#itemRemove").unbind("click").bind("click", function () {
				self.remove(true);
				//self.trigger("onRemove", self.model.toJSON());
			});
		},

	});

});