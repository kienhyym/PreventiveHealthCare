define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var itemTemplate = require('text!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/tpl/nguoinghinhiem.html'),
		itemSchema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/NguoiNghiNhiemSchema.json');


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
		            {field:"sothutu", cssClass:false},
                    {field:"hoten", cssClass:false},
		            {field:"namsinh", cssClass:false},
					// {field:"gioitinh", cssClass:false},
					{
						field:"gioitinh",
						uicontrol:"combobox",
						textField: "text",
						valueField: "value",
						cssClass:"form-control",
						dataSource: [
							{ value: "Nam", text: "Nam" },
							{ value: "Nu", text: "Nữ" },
					 	],
					},
                    {field:"noiden", cssClass:false},
                    {field:"quoctich", cssClass:false},
		            {field:"ngaygio_phathien", cssClass:false},
		            {field:"tinhtrang", cssClass:false},
		            {field:"huongxuly", cssClass:false},
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