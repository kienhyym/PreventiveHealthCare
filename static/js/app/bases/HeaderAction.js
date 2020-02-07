define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        tpl                 = require('text!tpl/base/HeaderAction.html'),
        template = _.template(tpl),
        Gonrin				= require('gonrin');
    var objectDatas	=	{};
    
    return Gonrin.View.extend({
    	template : template,
		render: function(){
			var self = this;
			var isCanbo = self.getApp().currentUser != null ? self.getApp().currentUser.hasRole('CanBo'): false;
		    
			if(isCanbo === false){
				this.renderSoCombobox();
			} else {
				this.renderSearchBox();
			}
			//this.renderCurrentSoText();
			return this;
		},

		renderCurrentSoText: function(){
			var self = this;
			
			var currentSo = self.getApp().data("current_so", currentSo);
			if(!!currentSo){
				var display = currentSo.ma;
            	if(!!currentSo.me && !!currentSo.me.hoten){
            		display +=" - "+currentSo.me.hoten;
            	}
            	if(!!currentSo.con && !!currentSo.con.hoten){
            		display +=" - "+currentSo.con.hoten;
            	}
            	self.$el.find("#header_right").addClass("align-right");
            	self.$el.find("#header_right").html(display);
			}
			//rerender nav
			self.getApp().nav.render();
			return this;
		},
		renderSearchBox: function(){
			var self = this;
			self.$el.find("#header_left").html("<input style=\"margin-top:20px;\" id=\"input_search\" type=\"text\" class=\"form-control typeahead\" placeholder=\"Tìm kiếm\" autocomplete=\"off\" data-provide=\"typeahead\">");
			var inputSearch = self.$el.find("#input_search");	
			inputSearch.typeahead({
                items: objectDatas.length,
                source: function (request, response)
                {
                	setTimeout(function(){ 
                		$.ajax({
                   		    url: '/api/timkiemso?query='+inputSearch.val(),
                   		    type: 'get',
                   		    headers: {
                   		    	'content-type': 'application/json'
                   		    },
                   		    dataType: 'json',
                   		    success: function (data) {
                   		    	objectDatas = data;
                   		    	return response(data);
                   		    }
                        });
                	}, 2000);
                	
                },
                name: 'timkiemso',
                fitToElement: true,
                displayText: function (item) {
                	var display = item.ma;
                	if(!!item.me && !!item.me.hoten){
                		display +=" - "+item.me.hoten;
                	}
                	if(!!item.con && !!item.con.hoten){
                		display +=" - "+item.con.hoten;
                	}
                    return display;
                },
                updater: function (item) {
                    return item;
                },
                afterSelect: function(item){
                	var path = 'sochamsoc/model?id='+item.id;
    				self.getApp().getRouter().navigate(path);
    				inputSearch.val('');
    				return;
                }
            });
			return this;
		},
		resetCurrentSo: function(){
			var curSo = this.getApp().data("current_so");
			//console.log(curSo);
			var socombobox = this.$el.find('#danhsachso').data('gonrin');
			if((curSo != null) && !!socombobox){
				var curVal = socombobox.getValue();
				if (curSo.id != curVal){
					socombobox.setValue(curSo.id);
					this.renderCurrentSoText();
				}
				
			}
		},
		renderSoCombobox: function(){
			var self = this;
			//co can query len server???
			var socombobox = self.$el.find('#danhsachso');
			var url = '/api/v1/sochamsoc';
			var currentUser = self.getApp().currentUser;
			if (!!currentUser && !!currentUser.info && !!currentUser.info.id){
				var userinfoid = currentUser.info.id;
				var filters = {"me_id": {"$eq":userinfoid}};
				$.ajax({
	 				url: url,
	 				data: {"q": JSON.stringify({"filters": filters})},
	 				dataType: "json",
	 				contentType: "application/json",
	 				success: function(data) {
	 					//set current so 
	 					var curSoId = -1;
	 					var currentSo = null;
	 					for(var i = 0; i< data.objects.length; i++){
	 						if(data.objects[i].id > curSoId){
	 							curSoId = data.objects[i].id;
	 							currentSo = data.objects[i];
	 						}
	 					}
	 					
	 					socombobox.combobox({
	                    	textField: "ma",
	                        valueField: "id",
	                        dataSource: data.objects,
	                        refresh:true,
	                        value: curSoId > -1 ? curSoId: null
	                    });
	 					
	 					socombobox.unbind('change.gonrin').on('change.gonrin', function(e){
	 						var selectedValue = socombobox.data('gonrin').getValue();
	 		            	var path = 'sochamsoc/model?id='+selectedValue;
	 						self.getApp().getRouter().navigate(path);
	 		            });
	 					
	 					if(curSoId > -1){
	 						var path = 'sochamsoc/model?id='+curSoId;
	 						self.getApp().getRouter().navigate(path);
	 					} else if(!this.isCanbo){
	 						var path = 'sochamsoc/model';
	 						self.getApp().getRouter().navigate(path);
	 					}
	 					
	 					if (currentSo != null){
	 						self.getApp().data("current_so", currentSo);
	 						self.renderCurrentSoText();
	 					}
	 					
	 				},
	 				error:function(xhr,status,error){
	 					self.getApp().notify("Get data Error");
					},
				});
			}
			
		},
	    
	    
	});

});