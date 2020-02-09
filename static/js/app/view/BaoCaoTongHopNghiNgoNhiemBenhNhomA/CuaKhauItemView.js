define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var itemTemplate = require('text!tpl/BaoCaoTongHopNghiNgoNhiemBenhNhomA/cuakhauitem.html'),
		itemSchema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/CuaKhauSchema.json');


	return Gonrin.ItemView.extend({
		template: itemTemplate,
		bindings: 'data-ck-bind',
		modelSchema: itemSchema,
		tagName: 'tr',
		urlPrefix: "/api/v1/",
		collectionName: "collectionName",
		// foreignRemoteField: "cuakhau_id",
		// foreignField: "loaibaocao",

		uiControl: [
		            {field:"tenvacxin", cssClass:false},
		            {field:"solandung", cssClass:false},
		            {field:"ngaydunggannhat", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true},
		            {field:"ketqua", cssClass:false}
		            ],
		render: function () {
			var self = this;
			this.applyBindings();
		},

	});

});