define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var itemTemplate = require('text!app/baocaonghingonhiembenh/tpl/quocgiaitem.html'),
		itemSchema = require('json!schema/BaoCaoNghiNgoNhiemBenhQuocGiaSchema.json');


	return Gonrin.ItemView.extend({
		template: itemTemplate,
		bindings: 'data-quocgia-bind',
		modelSchema: itemSchema,
		urlPrefix: "/api/v1/",
		collectionName: "collectionName",
		foreignRemoteField: "id",
		foreignField: "baocao_id",

		uiControl: [
		            {field:"tenquocgia", cssClass:false},
		            {field:"ngaydiqua", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true}
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