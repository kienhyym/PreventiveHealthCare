define(function (require) {
  "use strict";
  var $ = require('jquery'),
    _ = require('underscore'),
    Gonrin = require('gonrin');

  var template = require('text!tpl/TruongHopCachLyTapTrung/collection.html'),
    schema = require('json!app/view/TruongHopCachLyTapTrung/TruongHopCachLyTapTrungSchema.json');

  var ModelDialogView = require('app/view/TruongHopCachLyTapTrung/DialogModelView');


  var quocgia = [
    {
      "country": "Afghanistan"
    },
    {
      "country": "Albania"
    },
    {
      "country": "Algeria"
    },
    {
      "country": "American Samoa"
    },
    {
      "country": "Andorra"
    },
    {
      "country": "Angola"
    },
    {
      "country": "Anguilla"
    },
    {
      "country": "Antarctica"
    },
    {
      "country": "Antigua and Barbuda"
    },
    {
      "country": "Argentina"
    },
    {
      "country": "Armenia"
    },
    {
      "country": "Aruba"
    },
    {
      "country": "Australia"
    },
    {
      "country": "Austria"
    },
    {
      "country": "Azerbaijan"
    },
    {
      "country": "Bahamas"
    },
    {
      "country": "Bahrain"
    },
    {
      "country": "Bangladesh"
    },
    {
      "country": "Barbados"
    },
    {
      "country": "Belarus"
    },
    {
      "country": "Belgium"
    },
    {
      "country": "Belize"
    },
    {
      "country": "Benin"
    },
    {
      "country": "Bermuda"
    },
    {
      "country": "Bhutan"
    },
    {
      "country": "Bolivia"
    },
    {
      "country": "Bosnia and Herzegovina"
    },
    {
      "country": "Botswana"
    },
    {
      "country": "Bouvet Island"
    },
    {
      "country": "Brazil"
    },
    {
      "country": "British Indian Ocean Territory"
    },
    {
      "country": "Brunei"
    },
    {
      "country": "Bulgaria"
    },
    {
      "country": "Burkina Faso"
    },
    {
      "country": "Burundi"
    },
    {
      "country": "Cambodia"
    },
    {
      "country": "Cameroon"
    },
    {
      "country": "Canada"
    },
    {
      "country": "Cape Verde"
    },
    {
      "country": "Cayman Islands"
    },
    {
      "country": "Central African Republic"
    },
    {
      "country": "Chad"
    },
    {
      "country": "Chile"
    },
    {
      "country": "China"
    },
    {
      "country": "Christmas Island"
    },
    {
      "country": "Cocos (Keeling) Islands"
    },
    {
      "country": "Colombia"
    },
    {
      "country": "Comoros"
    },
    {
      "country": "Congo"
    },
    {
      "country": "The Democratic Republic of Congo"
    },
    {
      "country": "Cook Islands"
    },
    {
      "country": "Costa Rica"
    },
    {
      "country": "Ivory Coast"
    },
    {
      "country": "Croatia"
    },
    {
      "country": "Cuba"
    },
    {
      "country": "Cyprus"
    },
    {
      "country": "Czech Republic"
    },
    {
      "country": "Denmark"
    },
    {
      "country": "Djibouti"
    },
    {
      "country": "Dominica"
    },
    {
      "country": "Dominican Republic"
    },
    {
      "country": "East Timor"
    },
    {
      "country": "Ecuador"
    },
    {
      "country": "Egypt"
    },
    {
      "country": "England"
    },
    {
      "country": "El Salvador"
    },
    {
      "country": "Equatorial Guinea"
    },
    {
      "country": "Eritrea"
    },
    {
      "country": "Estonia"
    },
    {
      "country": "Ethiopia"
    },
    {
      "country": "Falkland Islands"
    },
    {
      "country": "Faroe Islands"
    },
    {
      "country": "Fiji Islands"
    },
    {
      "country": "Finland"
    },
    {
      "country": "France"
    },
    {
      "country": "French Guiana"
    },
    {
      "country": "French Polynesia"
    },
    {
      "country": "French Southern territories"
    },
    {
      "country": "Gabon"
    },
    {
      "country": "Gambia"
    },
    {
      "country": "Georgia"
    },
    {
      "country": "Germany"
    },
    {
      "country": "Ghana"
    },
    {
      "country": "Gibraltar"
    },
    {
      "country": "Greece"
    },
    {
      "country": "Greenland"
    },
    {
      "country": "Grenada"
    },
    {
      "country": "Guadeloupe"
    },
    {
      "country": "Guam"
    },
    {
      "country": "Guatemala"
    },
    {
      "country": "Guernsey"
    },
    {
      "country": "Guinea"
    },
    {
      "country": "Guinea-Bissau"
    },
    {
      "country": "Guyana"
    },
    {
      "country": "Haiti"
    },
    {
      "country": "Heard Island and McDonald Islands"
    },
    {
      "country": "Holy See (Vatican City State)"
    },
    {
      "country": "Honduras"
    },
    {
      "country": "Hong Kong"
    },
    {
      "country": "Hungary"
    },
    {
      "country": "Iceland"
    },
    {
      "country": "India"
    },
    {
      "country": "Indonesia"
    },
    {
      "country": "Iran"
    },
    {
      "country": "Iraq"
    },
    {
      "country": "Ireland"
    },
    {
      "country": "Israel"
    },
    {
      "country": "Isle of Man"
    },
    {
      "country": "Italy"
    },
    {
      "country": "Jamaica"
    },
    {
      "country": "Japan"
    },
    {
      "country": "Jersey"
    },
    {
      "country": "Jordan"
    },
    {
      "country": "Kazakhstan"
    },
    {
      "country": "Kenya"
    },
    {
      "country": "Kiribati"
    },
    {
      "country": "Kuwait"
    },
    {
      "country": "Kyrgyzstan"
    },
    {
      "country": "Laos"
    },
    {
      "country": "Latvia"
    },
    {
      "country": "Lebanon"
    },
    {
      "country": "Lesotho"
    },
    {
      "country": "Liberia"
    },
    {
      "country": "Libyan Arab Jamahiriya"
    },
    {
      "country": "Liechtenstein"
    },
    {
      "country": "Lithuania"
    },
    {
      "country": "Luxembourg"
    },
    {
      "country": "Macao"
    },
    {
      "country": "North Macedonia"
    },
    {
      "country": "Madagascar"
    },
    {
      "country": "Malawi"
    },
    {
      "country": "Malaysia"
    },
    {
      "country": "Maldives"
    },
    {
      "country": "Mali"
    },
    {
      "country": "Malta"
    },
    {
      "country": "Marshall Islands"
    },
    {
      "country": "Martinique"
    },
    {
      "country": "Mauritania"
    },
    {
      "country": "Mauritius"
    },
    {
      "country": "Mayotte"
    },
    {
      "country": "Mexico"
    },
    {
      "country": "Micronesia, Federated States of"
    },
    {
      "country": "Moldova"
    },
    {
      "country": "Monaco"
    },
    {
      "country": "Mongolia"
    },
    {
      "country": "Montserrat"
    },
    {
      "country": "Montenegro"
    },
    {
      "country": "Morocco"
    },
    {
      "country": "Mozambique"
    },
    {
      "country": "Myanmar"
    },
    {
      "country": "Namibia"
    },
    {
      "country": "Nauru"
    },
    {
      "country": "Nepal"
    },
    {
      "country": "Netherlands"
    },
    {
      "country": "Netherlands Antilles"
    },
    {
      "country": "New Caledonia"
    },
    {
      "country": "New Zealand"
    },
    {
      "country": "Nicaragua"
    },
    {
      "country": "Niger"
    },
    {
      "country": "Nigeria"
    },
    {
      "country": "Niue"
    },
    {
      "country": "Norfolk Island"
    },
    {
      "country": "North Korea"
    },
    {
      "country": "Northern Ireland"
    },
    {
      "country": "Northern Mariana Islands"
    },
    {
      "country": "Norway"
    },
    {
      "country": "Oman"
    },
    {
      "country": "Pakistan"
    },
    {
      "country": "Palau"
    },
    {
      "country": "Palestine"
    },
    {
      "country": "Panama"
    },
    {
      "country": "Papua New Guinea"
    },
    {
      "country": "Paraguay"
    },
    {
      "country": "Peru"
    },
    {
      "country": "Philippines"
    },
    {
      "country": "Pitcairn"
    },
    {
      "country": "Poland"
    },
    {
      "country": "Portugal"
    },
    {
      "country": "Puerto Rico"
    },
    {
      "country": "Qatar"
    },
    {
      "country": "Reunion"
    },
    {
      "country": "Romania"
    },
    {
      "country": "Russian Federation"
    },
    {
      "country": "Rwanda"
    },
    {
      "country": "Saint Helena"
    },
    {
      "country": "Saint Kitts and Nevis"
    },
    {
      "country": "Saint Lucia"
    },
    {
      "country": "Saint Pierre and Miquelon"
    },
    {
      "country": "Saint Vincent and the Grenadines"
    },
    {
      "country": "Samoa"
    },
    {
      "country": "San Marino"
    },
    {
      "country": "Sao Tome and Principe"
    },
    {
      "country": "Saudi Arabia"
    },
    {
      "country": "Scotland"
    },
    {
      "country": "Senegal"
    },
    {
      "country": "Serbia"
    },
    {
      "country": "Seychelles"
    },
    {
      "country": "Sierra Leone"
    },
    {
      "country": "Singapore"
    },
    {
      "country": "Slovakia"
    },
    {
      "country": "Slovenia"
    },
    {
      "country": "Solomon Islands"
    },
    {
      "country": "Somalia"
    },
    {
      "country": "South Africa"
    },
    {
      "country": "South Georgia and the South Sandwich Islands"
    },
    {
      "country": "South Korea"
    },
    {
      "country": "South Sudan"
    },
    {
      "country": "Spain"
    },
    {
      "country": "SriLanka"
    },
    {
      "country": "Sudan"
    },
    {
      "country": "Suriname"
    },
    {
      "country": "Svalbard and Jan Mayen"
    },
    {
      "country": "Swaziland"
    },
    {
      "country": "Sweden"
    },
    {
      "country": "Switzerland"
    },
    {
      "country": "Syria"
    },
    {
      "country": "Tajikistan"
    },
    {
      "country": "Tanzania"
    },
    {
      "country": "Thailand"
    },
    {
      "country": "Timor-Leste"
    },
    {
      "country": "Togo"
    },
    {
      "country": "Tokelau"
    },
    {
      "country": "Tonga"
    },
    {
      "country": "Trinidad and Tobago"
    },
    {
      "country": "Tunisia"
    },
    {
      "country": "Turkey"
    },
    {
      "country": "Turkmenistan"
    },
    {
      "country": "Turks and Caicos Islands"
    },
    {
      "country": "Tuvalu"
    },
    {
      "country": "Uganda"
    },
    {
      "country": "Ukraine"
    },
    {
      "country": "United Arab Emirates"
    },
    {
      "country": "United Kingdom"
    },
    {
      "country": "United States"
    },
    {
      "country": "United States Minor Outlying Islands"
    },
    {
      "country": "Uruguay"
    },
    {
      "country": "Uzbekistan"
    },
    {
      "country": "Vanuatu"
    },
    {
      "country": "Venezuela"
    },
    {
      "country": "Vietnam"
    },
    {
      "country": "Virgin Islands, British"
    },
    {
      "country": "Virgin Islands, U.S."
    },
    {
      "country": "Wales"
    },
    {
      "country": "Wallis and Futuna"
    },
    {
      "country": "Western Sahara"
    },
    {
      "country": "Yemen"
    },
    {
      "country": "Yugoslavia"
    },
    {
      "country": "Zambia"
    },
    {
      "country": "Zimbabwe"
    }
  ]

  return Gonrin.CollectionView.extend({
    template: template,
    modelSchema: schema,
    urlPrefix: "/api/v1/",
    bindings: "data-thcl-bind",
    collectionName: "truonghopcachlytaptrung",
    tools: [
      {
        name: "default",
        type: "group",
        groupClass: "toolbar-group",
        buttons: [
          {
            name: "create",
            type: "button",
            buttonClass: "btn-warning btn-sm",
            label: "Thêm trường hợp cách ly tập trung",
            command: function () {
              var self = this;
              var id = self.viewData.id;

              var view = new ModelDialogView({
                viewData: {
                  id: null,
                  donvi_id: self.viewData.donvi_id,
                  cuakhau_id: self.viewData.cuakhau_id || null
                }
              });
              view.dialog({ size: "large" });

              view.on("close", function (param) {
                self.getApp().getRouter().refresh();
              });
            },
            visible: function () {
              var self = this;
              // console.log(self.viewData.disable_create, self.viewData.disable_create || false);
              return !(self.viewData.disable_create || false);
            }
          },
          {
          	name: "export",
          	type: "button",
          	buttonClass: "btn-primary btn-sm",
          	label: "Xuất Excel danh sách",
          	command: function () {
              var self = this;
              var donvi_id = self.viewData.donvi_id || null;
              var cuakhau_id = self.viewData.cuakhau_id || null;
              var ngaybaocao = self.viewData.ngaybaocao || null;


              
              if(!donvi_id){
                return;
              }
              var url = "/export/excel/truonghopcachlytaptrung?donvi_id=" + donvi_id;
              if(!!cuakhau_id){
                url = url + "&cuakhau_id=" + cuakhau_id
              }
              if(!!ngaybaocao){
                url = url + "&ngaybaocao=" + ngaybaocao
              }

              window.open(url, '_blank');
          	}
          },

        ]
      },
    ],
    uiControl: {

      fields: [
        {
          field: "id", label: "ID", visible: false
        },
        { field: "hoten", label: "Họ tên" },
        {
          field: "donvi_id", visible: false
        },
        {
          field: "cuakhau_id", visible: false
        },
        { field: "gioitinh", label: "Giới tính" },
        { field: "namsinh", label: "Năm sinh" },
        { field: "sodienthoai", label: "Số điện thoại", visible: false  },
        { field: "email", label: "Email", visible: false  },
        { field: "quoctich", label: "Quốc tịch" },
        { field: "noio_tinhthanh", label: "Tỉnh thành"},
        { field: "tiensu_dichte", label: "Tiền sử dịch tễ"},
        { field: "tiensu_trieuchunglamsang", label: "Triệu chứng"},
        { field: "tinhtrang_phathien", label: "Tình trạng phát hiện" , visible: false },
        { field: "noitiepnhan_xutri", label: "Địa điểm cách ly"},
        { field: "", visible: false },
        { field: "tencuakhau", visible: false },
        { field: "tendonvi", visible: false },

        { field: "ghichu", visible: false },

        { field: "_created_at", visible: false },
        { field: "_updated_at", visible: false },
        { field: "_deleted", visible: false },
        { field: "_deleted_at", visible: false },
        { field: "ma", visible: false },
        { field: "matokhaiyte", visible: false },
        { field: "ngaybaocao", visible: false },

        { field: "noibaocao", visible: false },
        { field: "nambaocao", visible: false },
        { field: "madonvi", visible: false },
        { field: "macuakhau", visible: false },



        { field: "ma_quoctich", visible: false },

        { field: "cmtnd", visible: false },
        { field: "cuakhau_nhapquacanh", visible: false },
        { field: "gio_nhapquacanh", visible: false },
        { field: "ngay_nhapquacanh", visible: false },
        { field: "phuongtien", visible: false },
        { field: "sohieu_phuongtien", visible: false },

        { field: "noio", visible: false },
        
        { field: "noio_quanhuyen", visible: false },
        { field: "noio_xaphuong", visible: false },
        { field: "nghenghiep", visible: false },
        
        { field: "noio_matinhthanh", visible: false },
        { field: "benhly_kemtheo", visible: false },
        { field: "dienthoai", visible: false },
        { field: "benh_nghingo", visible: false },
        
        { field: "ngaygio_phathien", visible: false },
        { field: "diachi_lienlac", visible: false },
        

        
        { field: "nhanxet_danhgia", visible: false },
        { field: "tiensu_xutri", visible: false },

        { field: "tinhtrang", visible: false },
      ],
      pagination: {
        showRowsInfo: true,
        pageSize: 100
      },
      onRowClick: function (event) {
        var self = this;
        if (event.rowId) {
          var id = self.viewData.id;
          var view = new ModelDialogView({
            viewData: {
              id: event.rowId,
              donvi_id: self.viewData.donvi_id,
              cuakhau_id: self.viewData.cuakhau_id || null
            }
          });
          view.dialog({ size: "large" });

          view.on("close", function (param) {
            self.getApp().getRouter().refresh();
          });
        }
      }
    },

    render: function () {
      var self = this;
      var id = self.viewData.id;
      var ngaybaocao= self.viewData.ngaybaocao;
      var donvi_id = self.viewData.donvi_id;
      var cuakhau_id = self.viewData.cuakhau_id;
      if (!!donvi_id) {
        var filter = {
          "$and": [
            { "donvi_id": { "$eq": donvi_id } },
            { "ngaybaocao": { "$eq": ngaybaocao } },
          ]
        }
        if (!!cuakhau_id) {
          filter = {
            "$and": [
              { "donvi_id": { "$eq": donvi_id } },
              { "ngaybaocao": { "$eq": ngaybaocao } },
              { "cuakhau_id": { "$eq": cuakhau_id } },
            ]
          }
        }
        this.uiControl.filters = filter;
        self.applyBindings();
      }
      // self.renderQuocGia();
      return this;
    },
    renderQuocGia: function () {
      var self = this;
      var select = $('<select>');

      $.each(quocgia, function (idx, obj) {
        var el = $("<option>");
        el.attr("value", obj.country);
        el.html(obj.country);
        select.append(el);
      });
      self.$el.append(select)
    }
  });

});