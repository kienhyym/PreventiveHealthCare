define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/User/collection.html'),
    	schema 				= require('json!app/view/HeThong/User/Schema.json');
    
    var DonViSelectView = require("app/view/HeThong/DonVi/TreeSelectView");
    
    var filterschema = {
			"donvi": {
			    "type": "dict"
			},
			"donvi_id": {
			    "type": "number"
			},
			"email": {
			    "type": "string"
			}
	}
	var filtertemplate 				= require('text!tpl/User/filter.html');
	
	var FilterView = Gonrin.FilterView.extend({
    	template : filtertemplate,
    	modelSchema	: filterschema,
    	urlPrefix: "/api/v1/",
    	collectionName: "filter",
    	sesionKey : "userfilter_",
    	uiControl:[
			{
				  field:"donvi",
				  uicontrol: "ref",
				  textField: "ten",
				  foreignRemoteField: "id",
				  foreignField: "donvi_id",
				  dataSource: DonViSelectView,
			},
    				
    	],
    	render:function(){
    		var self = this;
    		this.getDataFromSession();
    		this.applyBindings();
    		var filterBtn = self.$el.find("#filterBtn");
    		filterBtn.unbind("click").bind("click", function(){
    			self.triggerFilter();
    		});
    	},
    });
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "user",
    	uiControl:{
    		orderBy:[
	    	    {field: "id",direction:"asc"}
	    	],
	    	fields: [
	    	     { 
	    	    	field: "id",label:"ID",width:50,readonly: true, 
	    	     },
		     	 { field: "name", label: "Tên"},
		     	 { field: "email", label: "Tài khoản"},
		     	 { 
		     		field: "donvi_id", 
		     		label: "Thuộc đơn vị",
		     		foreign: "donvi",
		     		foreignValueField: "id",
		     		foreignTextField: "ten",	 
		     	 },
		     	{ field: "donvi", visible:false},
		     	 { 
		     		 field: "cuakhau_id", 
		     		label: "Cửa khẩu",
		     		foreign: "cuakhau",
		     		foreignValueField: "id",
		     		foreignTextField: "ten",
		     	 },
		     	{ field: "cuakhau", visible:false},
		     	{ field: "roles", label: "Vai trò", textField: "description"},
		         { field: "active", label: "Kích hoạt"},
		         { field: "password", visible:false},
		         { field: "confirmpassword", visible:false},
		     ],
		     onRowClick: function(event){
		    		if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        	}
		    	}
    	},
	     render:function(){
	    	 var self = this;
	    	 this.applyBindings();
	    	 
	    	 var user = gonrinApp().currentUser;
	    	 if ((user != null) && gonrinApp().currentUser.hasRole('Admin')){
	    		 var $filter = this.$el.find("#filter");
		    	 var filterView = new FilterView({el: $filter});
		      	 filterView.render();
		      	 filterView.on('filterChanged', function(evt){
		      		var $col = self.getCollectionElement();
	      			if($col){
	      				if((evt.data.donvi_id !== null) || (evt.data.email !== null)){
	      					var filters = {"$and":[]};
	      					if(evt.data.donvi_id !== null){
	      						filters["$and"].push({"donvi_id":{"$eq":evt.data.donvi_id}});
	      					}
	      					if(evt.data.email !== null){
	      						filters["$and"].push({"email":{"$contains":evt.data.email}});
	      					}
	      					//var filters = {"$and":[{"nambaocao":{"$eq":evt.data.nambaocao}}, {"donvi_id":{"$eq":evt.data.donvi_id}}]}
	        				$col.data('gonrin').filter(filters);
	      				}else{
	      					$col.data('gonrin').filter(null);
	      				}
	      			}
		      	 });
		      	 if(!filterView.isEmptyFilter()){
		      		 filterView.triggerFilter();
	    		 }
	    	 }
	    	 
	    	 return this;
    	},
    	
    });

});