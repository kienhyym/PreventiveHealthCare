define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/ToKhaiYTe/model.html'),
		schema = require('json!app/view/ToKhaiYTe/ToKhaiYTeSchema.json'); 

	var prinfulltpl_vi = require('text!tpl/ToKhaiYTe/printfull_vi.html');
	var printpl_vi = require('text!tpl/ToKhaiYTe/print_vi.html');
	var printpl_cn = require('text!tpl/ToKhaiYTe/print_cn.html');
	var printpl_en = require('text!tpl/ToKhaiYTe/print_en.html');



	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tokhaiyte",
		tools: [
			{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "back",
						type: "button",
						buttonClass: "btn-default btn-sm",
						label: "TRANSLATE:BACK",
						command: function () {
							var self = this;
							//Backbone.history.history.back();
							self.getApp().getRouter().navigate(self.collectionName + "/collection");
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:SAVE",
						command: function () {
							var self = this;
							// self.model.set('id', '1áds23')
							self.model.set('donvi_id', 1)
							self.model.set('cuakhau_id', 1)
							self.model.set('canbo_id', 1)


							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Save successfully");
									self.getApp().getRouter().navigate(self.collectionName + "/collection");
								},
								error: function (model, xhr, options) {
									//self.alertMessage("Something went wrong while processing the model", false);
									self.getApp().notify('Save error');
								}
							});
						}
					},
					// {
					// 	name: "delete",
					// 	type: "button",
					// 	buttonClass: "btn-danger btn-sm",
					// 	label: "TRANSLATE:DELETE",
					// 	visible: function () {
					// 		return this.getApp().getRouter().getParam("id") !== null;
					// 	},
					// 	command: function () {
					// 		var self = this;
					// 		self.model.destroy({
					// 			success: function (model, response) {
					// 				self.getApp().notify('Delete successfully');

					// 				self.getApp().getRouter().navigate(self.collectionName + "/collection");
					// 			},
					// 			error: function (model, xhr, options) {
					// 				//self.alertMessage("Something went wrong while processing the model", false);
					// 				self.getApp().notify('Delete error');
					// 			}
					// 		});
					// 	}
					// },
				]
			},

			{
				name: "printgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "printmodel",
						type: "button",
						buttonClass: "btn-primary btn-sm",
						label: "In tờ khai",
						command: function () {
							var self = this;
							//Backbone.history.history.back();
							// self.getApp().getRouter().navigate(self.collectionName + "/collection");
						},
						visible: function () {
							return this.getApp().getRouter().getParam("id") !== null;
						},
					},
					{
						name: "printmodel-validate",
						type: "button",
						buttonClass: "btn-warning btn-sm",
						label: "In tờ xác nhận",
						command: function () {
							var self = this;
							self.printForm("vi", false);
						},
						visible: function () {
							return this.getApp().getRouter().getParam("id") !== null;
						},
					},
				]
			}
		],
		uiControl: [
			// {
			// 	field:"gioitinh",
			// 	uicontrol:"combobox",
			// 	textField: "text",
			// 	valueField: "value",
			// 	dataSource: [
			// 	        { text: "Nam", value: "nam" },
			// 	        { text: "Nữ", value: "nữ" },
			// 	],
			// },
			{ field: "ngaybaocao", cssClass: false, textFormat: "DD/MM/YYYY", disabledComponentButton: true },
			{field:"ngaykekhai", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true},
			{ field: "ngay_nhapquacanh", cssClass: false, textFormat: "DD/MM/YYYY", disabledComponentButton: true },
			{ field: "quoctich", uicontrol: false, },
			{ field: "gioitinh", uicontrol: false, },
			{
				field: "thongtindilai_taubay",
				uicontrol: "checkbox",
				checkedField: "name",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: true, id: 1, },
					{ name: false, id: 5 },
				],
				value: 1
			},
			{
				field: "thongtindilai_tauthuyen",
				uicontrol: "checkbox",
				checkedField: "name",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: true, id: 1, },
					{ name: false, id: 0 },
				],
				value: 1
			},
			{
				field: "thongtindilai_oto",
				uicontrol: "checkbox",
				checkedField: "name",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: true, id: 1, },
					{ name: false, id: 0 },
				],
				value: 1
			},

			{
				field: "dauhieubenh_khotho",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 0 },
				],
			},
			{
				field: "dauhieubenh_dauhong",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 0 },
				],
			},
			{
				field: "dauhieubenh_buonnon",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 0 },
				],
			},
			{
				field: "dauhieubenh_tieuchay",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 0 },
				],
			},
			{
				field: "dauhieubenh_xuathuyetngoaida",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 0 },
				],
			},
			{
				field: "dauhieubenh_phatban",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 0 },
				],
			},
			{
				field: "tiepxuc_dongvat",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "Có", id: 1 },
					{ name: "Không", id: 0 },
				],
			},
			{
				field: "chamsocnguoibenhtruyennhiem",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "Có", id: 1 },
					{ name: "Không", id: 0 },
				],
			},
			{
				field: "dauhieubenh_sot",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 0 },
				],
			},
			{
				field: "dauhieubenh_ho",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 0 },
				],
			},
			// {
			// 	field: "baocaonghingonhiembenhquocgia",
			// 	uicontrol: false,
			// 	itemView: QuocGiaItemView,
			// 	tools: [{
			// 		name: "create",
			// 		type: "button",
			// 		buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
			// 		label: "<i class='fa fa-plus'></i>",
			// 		command: "create"
			// 	},],
			// 	toolEl: "#add-quocgia-item"
			// },
			// {
			// 	field: "baocaonghingonhiembenhvacxin",
			// 	uicontrol: false,
			// 	itemView: VacXinItemView,
			// 	tools: [{
			// 		name: "create",
			// 		type: "button",
			// 		buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
			// 		label: "<i class='fa fa-plus'></i>",
			// 		command: "create"
			// 	},],
			// 	toolEl: "#add-vacxin-item"
			// },
			// {
			// 	field: "baocaonghingonhiembenhnguoitiepxuc",
			// 	uicontrol: false,
			// 	itemView: NguoiTiepXucItemView,
			// 	tools: [{
			// 		name: "create",
			// 		type: "button",
			// 		buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
			// 		label: "<i class='fa fa-plus'></i>",
			// 		command: "create"
			// 	},],
			// 	toolEl: "#add-nguoitiepxuc-item"
			// },
			{
				field: "cmtnd",
				cssClass: false,


			},
			{
				field: "vacxin_dasudung",
				cssClass: false,


			},
			{
				field: "diachi_lienlac",
				cssClass: false,


			},
			{
				field: "sodienthoai",
				cssClass: false,


			},
			{
				field: "quocgiadiqua",
				cssClass: false,


			},
			{
				field: "noi_khoihanh",
				cssClass: false,


			},
			{
				field: "email",
				cssClass: false,


			},
			{
				field: "gio_nhapquacanh",
				cssClass: false,


			},
			{
				field: "gioitinh",
				cssClass: false,

			},
			{
				field: "hoten",
				cssClass: false,


			},
			{
				field: "noiden",
				cssClass: false,

			},
			{
				field: "ma",
				cssClass: false,


			},
			{
				field: "nambaocao",
				cssClass: false,

			},
			{
				field: "soghe_phuongtien",
				cssClass: false,


			},
			{
				field: "sohieu_phuongtien",
				cssClass: false,


			},

			{
				field: "sohochieu",
				cssClass: false,


			},
			{
				field: "namsinh",
				cssClass: false,


			},
			{ field: "ngay_khoihanh", cssClass: true, textFormat: "DD/MM/YYYY", disabledComponentButton: true },
			{ field: "ngay_nhapcanh", cssClass: true, textFormat: "DD/MM/YYYY", disabledComponentButton: true },
			{
				field: "phuongtien",
				cssClass: false,


			},
			{
				field: "quoctich",
				cssClass: false,


			},
			{
				field: "sohieu_phuongtien",
				cssClass: false,


			},
			{
				field: "tiensu_chandoan",
				cssClass: false,


			},
			{
				field: "tiensu_dichte",
				cssClass: false,

			},
			{
				field: "tiensu_ngaykhoiphat",
				cssClass: false,


			},
			{
				field: "tiensu_trieuchunglamsang",
				cssClass: false,


			},
			{
				field: "tiensu_xutri",
				cssClass: false,


			},
			{
				field: "diachi_taivietnam",
				cssClass: false,


			},
			{
				field: "thongtindilai_chitiet",
				cssClass: false,


			},
		],
		render: function () {
			var self = this;

			var user = self.getApp().currentUser;
			if (user) {
				var id = this.getApp().getRouter().getParam("id");
				if (id) {

					this.model.set('id', id);
					this.model.fetch({
						success: function (data) {
							self.applyBindings();
						},
						error: function () {
							self.getApp().notify("Get data Eror");
						},
					});
				} else {
					self.model.set("ngaykekhai", moment().startOf('day').format("YYYY-MM-DD"));

					var info = user.info;

					var cuakhau = info.cuakhau;
					if (!!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
						self.model.set({ "cuakhau_id": cuakhau.id, "tencuakhau": cuakhau.ten, "macuakhau": cuakhau.ma });

					}
					var donvi = info.donvi;
					if (!!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
						self.model.set({ "donvi_id": donvi.id, "tendonvi": donvi.ten })
					}

					self.model.set( "ngon_ngu", "vi");

					self.applyBindings();
				}

			}
			self.registerEvents();
		},
		registerEvents: function(){
			var self = this;
			self.model.on("change:hoten", function(){
				var hoten = self.model.get("hoten");
				if(hoten){
					var hoten_upcase = hoten.toUpperCase();
					if(hoten_upcase !== hoten){
						self.model.set("hoten", hoten_upcase);
					}
				}
			});
		},
		printXacNhan: function () {

		},
		printForm: function (lang, full=false) {
			var self = this;

			console.log("MOde", self.model.toJSON());
			var data = self.model.toJSON();

			// var ngaytao = null; var thangthao = null; var namtao = null;
			// var ngaykekhai = this.model.get("ngaykekhai");
			// if (ngaykekhai) {
			// 	var ngaykekhai_date = moment(ngaykekhai, "YYYY-MM-DD-THH:mm:ss");
			// 	ngaytao = (ngaykekhai_date.date() > 9) ? ngaykekhai_date.date() : '0' + created_date.date();
			// 	thangthao = (created_date.month() + 1) > 9 ? created_date.month() + 1 : '0' + (created_date.month() + 1);
			// 	namtao = created_date.year();
			// }

			//return true;


			var user = self.getApp().currentUser;
			if (user) {
				console.log(user.info);
				var donvi = user.info.donvi;
				if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
					// self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten, "madonvi":donvi.ma})
					data.hotline_sodienthoai = donvi.hotline_sodienthoai || "";
					data.hotline_email = donvi.hotline_email  || "";
					data.hotline_fax = donvi.hotline_fax  || "";
					
				}
				var ngaykekhai = self.model.get("ngaykekhai");
				data.ngaykekhai_ngay = "";
				data.ngaykekhai_thang = "";
				data.ngaykekhai_nam = "";
				if(ngaykekhai){
					var moobject = moment(ngaykekhai, "YYYY-MM-DDTHH:mm:ss");
					data.ngaykekhai_ngay = moobject.format("DD");
					data.ngaykekhai_thang = moobject.format("MM");
					data.ngaykekhai_nam = moobject.format("YYYY");
				}
				

				
				var printtpl = null;
				var heightpx = null;
				var widthpx = null;
				var heightmm = null;
				var widthmm = null;
				if (lang == "vi"){
					printtpl = printpl_vi;
				}

				if (full){
					// heightpx = "1754px";
					// widthpx="1240px";
					heightmm= "294mm";
					widthmm= "202mm";
				}else{
					//A5
					// heightpx = "559px";
					// widthpx="793px";
					heightmm= "148mm";
					widthmm= "210mm";
					console.log(widthmm, heightmm);
				}
				
				var tpl = gonrin.template(printtpl);
				var content = tpl(data);
				var mywindow = window.open('', 'PRINT', 'height='+heightmm+ ',width=' + widthmm);
				//var mywindow = window.open('', 'PRINT');
				mywindow.document.write('<html><head><title>' + document.title + '</title>');
				mywindow.document.write('<meta charset="UTF-8">');
				mywindow.document.write('</head><body class="printForm A5in" style="width:'+widthmm+'; height: '+heightmm+'">');
				mywindow.document.write(content);
				mywindow.document.write('</body></html>');
				mywindow.document.close(); // necessary for IE >= 10
				mywindow.focus(); // necessary for IE >= 10*/
				if (print) {
					$(mywindow).on("load", function () {
						// Handler when all assets (including images) are loaded
						mywindow.print();
					});
				}

				mywindow.close();
			}
			
			
			return true;
		}
	});
});