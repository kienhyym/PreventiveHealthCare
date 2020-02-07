define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var itemTemplate = require('text!app/baocaonghingonhiembenh/tpl/vacxinitem.html'),
		itemSchema = require('json!schema/BaoCaoNghiNgoNhiemBenhVacxinSchema.json');


	return Gonrin.ItemView.extend({
		template: itemTemplate,
		bindings: 'data-vacxin-bind',
		modelSchema: itemSchema,
		urlPrefix: "/api/v1/",
		collectionName: "collectionName",
		foreignRemoteField: "id",
		foreignField: "baocao_id",

		uiControl: [
		            {field:"tenvacxin", cssClass:false},
		            {field:"solandung", cssClass:false},
		            {field:"ngaydunggannhat", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true},
		            {field:"ketqua", cssClass:false}
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