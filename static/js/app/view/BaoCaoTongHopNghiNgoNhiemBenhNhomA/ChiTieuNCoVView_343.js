define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
        Gonrin = require('gonrin');
        
    var def = {
        "record_type": "nCoV",
        "schema": {
			"record_type": {
                "type": "string"
			},
            "quoctich_vietnam": {
                "type": "number"
			},
			"quoctich_trungquoc": {
                "type": "number"
			},
			"quoctich_khac": {
                "type": "number"
			},
			"xetnghiem_duongtinh": {
                "type": "number"
            },
			"xetnghiem_amtinh": {
                "type": "number"
			},
			
			"xetnghiem_dangchoketqua": {
                "type": "number"
            },
			"tiepxucgan_dangtheodoi": {
                "type": "number"
			},
			
			"tiepxucgan_cotrieuchung": {
                "type": "number"
            },
			"tiepxucgan_dienbiennang": {
                "type": "number"
            },
			"tiepxucgan_khongtrieuchung": {
                "type": "number"
            },
			"tiepxucgan_qua14ngay": {
                "type": "number"
            },
        },
        "data": {}
    }

	var itemTemplate = require('text!tpl/BaoCaoTongHopNghiNgoNhiemBenhNhomA/chitieuncov.html'),
		itemSchema = def.schema;

	var Model = Gonrin.Model.extend({
		defaults: Gonrin.getDefaultModel(itemSchema),
		computeds: {
			tong_trongngay: function() {
				var ret = 0;
				var quoctich_vietnam = this.get("quoctich_vietnam") != null ? this.get("quoctich_vietnam"): 0;
				var quoctich_trungquoc = this.get("quoctich_trungquoc") != null ? this.get("quoctich_trungquoc"): 0;
				var quoctich_khac = this.get("quoctich_khac") != null ? this.get("quoctich_khac"): 0;
    			return quoctich_vietnam + quoctich_trungquoc + quoctich_khac;
    	    },
		},
		urlRoot : "/api/v1/baocaotonghopnghingonhiembenhnhoma"
	});

	return Gonrin.ItemView.extend({
		template: itemTemplate,
		bindings: 'data-chitieu-bind',
		modelSchema: itemSchema,
		modelClass: Model,
		urlPrefix: "/api/v1/",
		collectionName: "baocaotonghopnghingonhiembenhnhoma",
		// uiControl: [
		//             {field:"tenvacxin", cssClass:false},
		//             {field:"solandung", cssClass:false},
		//             {field:"ngaydunggannhat", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true},
		//             {field:"ketqua", cssClass:false}
		//             ],
		render: function () {
			var self = this;
			//self.model.set("record_type", "nCoV");
			this.applyBindings();
		},

	});

});