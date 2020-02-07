define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/thangmodel.html');
    //	schema 				= require('json!app/view/BaoCao/Schema.json');
    var tinhtrangbaocao 	= require('json!app/enum/TinhTrangBaocaoEnum.json');
    
    var BaoCaoModelView 	= require('app/view/BaoCao/ModelView');
    var NguoiModelView 		= require("app/view/BaoCao/NguoiModelView");
    var PhuongTienModelView = require("app/view/BaoCao/PhuongTienModelView");
    var HangHoaModelView = require("app/view/BaoCao/HangHoaModelView");
    var ThiTheModelView = require("app/view/BaoCao/ThiTheModelView");
    var VSSHModelView = require("app/view/BaoCao/VSSHModelView");
    var readonly = false;
    
    return BaoCaoModelView.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocao",
    	loaikybaocao: 2,
    	uiControl:[
			{
			    field: "kybaocao",
			    cssClass: false
			},
			{
			    field: "nambaocao",
			    cssClass: false
			},
			{
			    field: "ma",
			    cssClass: false
			},
			{
				field: "bangnguoi",
				uicontrol: false,
				itemView: NguoiModelView,
				modelData: function(){
					return this.viewData != null ? this.viewData.congdon.bangnguoi : null;
				},
				primaryField: "id",
			},
			{
				field: "bangphuongtien",
				uicontrol: false,
				itemView: PhuongTienModelView,
				modelData: function(){
					return this.viewData != null ? this.viewData.congdon.bangphuongtien : null;
				},
				primaryField: "id",
			},
			{
				field: "banghanghoa",
				uicontrol: false,
				itemView: HangHoaModelView,
				modelData: function(){
					return this.viewData != null ? this.viewData.congdon.banghanghoa : null;
				},
				primaryField: "id",
			},
			{
				field: "bangthithe",
				uicontrol: false,
				itemView: ThiTheModelView,
				modelData: function(){
					return this.viewData != null ? this.viewData.congdon.bangthithe : null;
				},
				primaryField: "id",
			},
			{
				field: "bangvssh",
				uicontrol: false,
				itemView: VSSHModelView,
				modelData: function(){
					return this.viewData != null ? this.viewData.congdon.bangvssh : null;
				},
				primaryField: "id",
			}
      	],
      	//render:function(){
      	//	console.log(this);
      	//}
    });
    
});