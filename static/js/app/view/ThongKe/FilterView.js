define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/ThongKe/filter.html'),
    	//schema 				= require('json!app/view/BaoCao/NguoiSchema.json'),
    	schema				= require('json!app/view/ThongKe/Filter.json');
    
    var tuanList = [];
    for(var i = 1; i < 54; i++){
    	var obj = {"value": i, "text": i + ""};
    	tuanList.push(obj);
    }
    var thangList = [];
    for(var i = 1; i < 13; i++){
    	var obj = {"value": i, "text": i + ""};
    	thangList.push(obj);
    }
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "filter",
    	uiControl:[
    				{
    				    field: "loaikybaocao",
    				    uicontrol: "combobox",
    				    dataSource: [
    			                	  {
    			                		  value: 1,text: "Tuần"
    			                	  },
    			                	  {
    			                		  value: 2,text: "Tháng"
    			                	  },
    			                	  {
    			                		  value: 3,text: "6 tháng"
    			                	  },
    			                	  {
    			                		  value: 5,text: "Năm"
    			                	  },
    			                	 ],
    					textField: "text",
    					valueField: "value",
    				},
    				{
    				    field: "tutuan",
    				    uicontrol: "combobox",
    				    dataSource: tuanList,
    					textField: "text",
    					valueField: "value",
    					height: "200px"
    				},
    				{
    				    field: "dentuan",
    				    uicontrol: "combobox",
    				    dataSource: tuanList,
    					textField: "text",
    					valueField: "value",
    					height: "200px"
    				},
    				{
    				    field: "tuthang",
    				    uicontrol: "combobox",
    				    dataSource: thangList,
    					textField: "text",
    					valueField: "value",
    					height: "200px"
    				},
    				{
    				    field: "denthang",
    				    uicontrol: "combobox",
    				    dataSource: thangList,
    					textField: "text",
    					valueField: "value",
    					height: "200px"
    				},
    				{
    				    field: "tu6thang",
    				    uicontrol: "combobox",
    				    dataSource: [
    				        {value:1,text:"Đầu năm"},
    				        {value:2,text:"Cuối năm"},
    				    ],
    					textField: "text",
    					valueField: "value",
    					height: "200px"
    				},
    				{
    				    field: "den6thang",
    				    uicontrol: "combobox",
    				    dataSource: [
    				        {value:1,text:"Đầu năm"},
    				        {value:2,text:"Cuối năm"},
    				    ],
    					textField: "text",
    					valueField: "value",
    				},
    				{
    				    field: "solieucuakhau",
    				    uicontrol:"radio",
						textField: "text",
						valueField: "value",
						dataSource: [
							{ value: true, text: "Có" },
							{ value: false, text: "Không"},
				       ],
    				},
    	],
    	render:function(){
    		var self = this;
    		// //preg select
    		self.model.set("tunam", moment().year());
    		self.model.set("dennam", moment().year());
    		this.applyBindings();
    		this.$el.find("rootwizard").bootstrapWizard();
    		var tree = self.$el.find("#donvi-tree");
    		//hide
    		this.showHideThoiGian();
    		
    		this.getFieldElement("loaikybaocao").on('change.gonrin', function(e){
            	self.showHideThoiGian();
            });
    		var mode = this.viewData.mode;
    		//http://localhost:8062/api/v1/donvitree_thongke;
			$.ajax({
 				url: (self.getApp().serviceURL || "") + "/api/v1/donvitree_thongke?mode="+mode,
 				dataType: "json",
 				contentType: "application/json",
 				success: function(data) {
 					var tree = self.$el.find("#donvi-tree");
 					tree.treeview({
 						data: data,
 						//onNodeSelected: $.proxy(self.onItemClick, self),
 						nodesField: "nodes",
 						textField: "ten",
 						showIcon: false,
 				        showCheckbox: true,
 				        
 				        onNodeChecked: $.proxy(self.onDonViNodeChecked, self),
 				        onNodeUnchecked: $.proxy(self.onDonViNodeUnchecked, self),
 					});
 					//self.renderThongKe(data);
 				},
 				error:function(xhr,status,error){
 					self.getApp().notify("Get data Error");
				},
			});
    		
			
			this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				  e.target // newly activated tab
				  e.relatedTarget // previous active tab
				  
				  var ul = e.target.closest( "ul" );
				  $(ul).find("li").removeClass("tabarrow");
				  
				  if(e.target){
					  var li = e.target.closest( "li" );
					  $(li).addClass("tabarrow");
					  var preli = $(li).prevAll( "li" );
					  $.each(preli, function(idx, liitem){
						  console.log(liitem);
						  $(liitem).addClass("tabarrow");
					  });
				  }
				  
				  
			});
    		
			
    	},
    	onDonViNodeChecked: function(event, node){
    		var self = this;
    		var tree = self.$el.find("#donvi-tree");
    		if((node != null) && (node.nodes != null)){
    			for(var i = 0; i < node.nodes.length; i ++){
    				tree.data("gonrin").checkNode(node.nodes[i].nodeId,{ silent: true });
    				//tree.treeview('checkNode', [ node.nodes[i].nodeId, { silent: true } ]);
    			}
            }

            if((node != null) &&(node.type === "cuakhau")){
            	parent = tree.data("gonrin").getParent(node);
            	tree.data("gonrin").checkNode(parent.nodeId, { silent: true });
            }
            
            if((node != null) && (!node.type )&& (node.nodes != null)){
            	for(var i = 0; i < node.nodes.length; i ++){
            		tree.data("gonrin").checkNode( node.nodes[i].nodeId, { silent: true } );
            		if(self.viewData.mode == "donvi"){
            			var in_node = node.nodes[i];
        				for(var j = 0; j < in_node.nodes.length; j ++){
        					tree.data("gonrin").checkNode(in_node.nodes[j].nodeId, { silent: true });
        				}
            		}
    				
    			}
            }
            this.onTreeCheckChange();
            
    	},
    	onDonViNodeUnchecked: function(event, node){
    		var self = this;
    		var tree = self.$el.find("#donvi-tree");
    		
    		if((node != null) && (node.nodes != null)){
    			for(var i = 0; i < node.nodes.length; i ++){
    				tree.data("gonrin").uncheckNode(node.nodes[i].nodeId, { silent: true } );
    			}
            }

        	if((node != null) && (!node.type ) && (node.nodes != null)){
            	for(var i = 0; i < node.nodes.length; i ++){
            		tree.data("gonrin").uncheckNode(node.nodes[i].nodeId, { silent: true } );
            		if(self.viewData.mode == "donvi"){
            			var in_node = node.nodes[i];
        				for(var j = 0; j < in_node.nodes.length; j ++){
        					tree.data("gonrin").uncheckNode(in_node.nodes[j].nodeId, { silent: true } );
        				}
            		}
    			}
            }
        	this.onTreeCheckChange();
    	},
    	onTreeCheckChange : function(){
    		var self = this;
    		var tree = self.$el.find("#donvi-tree");
    		
    		var donvimodel = [];
            var cuakhaumodel = [];
            
            var nodes = tree.data("gonrin").getChecked();
            
            if(self.viewData.mode == "donvi"){
            	for(var i = 0; i < nodes.length; i++){
                	var node = nodes[i];
                	if ($.inArray( node.id, cuakhaumodel) == -1){
            			cuakhaumodel.push(node.id);
            		}
            		
                	if(node.type === "donvi"){
                		//donvimodel.push(node.id);
                		if ($.inArray( node.id, donvimodel) == -1){
                			donvimodel.push(node.id);
                		}
                	}
                	if(node.type === "cuakhau"){
                		//cuakhaumodel.push(node.id);
                		if ($.inArray( node.id, cuakhaumodel) == -1){
                			cuakhaumodel.push(node.id);
                		}
                	}
                }
            }
            if(self.viewData.mode == "cuakhau"){
            	for(var i = 0; i < nodes.length; i++){
                	var node = nodes[i];
                	if(node.type === "cuakhau"){
                		//cuakhaumodel.push(node.id);
                		if ($.inArray( node.id, cuakhaumodel) == -1){
                			cuakhaumodel.push(node.id);
                		}
                		if ($.inArray( node.donvi_id, donvimodel) == -1){
                			donvimodel.push(node.donvi_id);
                		}
                	}
                }
            }
            self.model.set("donvi",donvimodel);
            self.model.set("cuakhau",cuakhaumodel);
    	},
    	showHideThoiGian: function(){
        	var self = this;
        	var loaiky = self.model.get("loaikybaocao");
        	if(loaiky == 1){
        		self.$el.find("#tuthanglabel").hide();
        		self.$el.find("#denthanglabel").hide();
        		self.$el.find("#tu6thanglabel").hide();
        		self.$el.find("#den6thanglabel").hide();
        		
        		this.getFieldElement("tuthang").data("gonrin").hide();
        		this.getFieldElement("denthang").data("gonrin").hide();
        		this.getFieldElement("tu6thang").data("gonrin").hide();
        		this.getFieldElement("den6thang").data("gonrin").hide();
        		
        		self.$el.find("#tutuanlabel").show();
        		self.$el.find("#dentuanlabel").show();
        		this.getFieldElement("tutuan").data("gonrin").show();
        		this.getFieldElement("dentuan").data("gonrin").show();
        	}
        	if(loaiky == 2){
        		self.$el.find("#tutuanlabel").hide();
        		self.$el.find("#dentuanlabel").hide();
        		self.$el.find("#tu6thanglabel").hide();
        		self.$el.find("#den6thanglabel").hide();
        		
        		this.getFieldElement("tutuan").data("gonrin").hide();
        		this.getFieldElement("dentuan").data("gonrin").hide();
        		this.getFieldElement("tu6thang").data("gonrin").hide();
        		this.getFieldElement("den6thang").data("gonrin").hide();
        		
        		self.$el.find("#tuthanglabel").show();
        		self.$el.find("#denthanglabel").show();
        		this.getFieldElement("tuthang").data("gonrin").show();
        		this.getFieldElement("denthang").data("gonrin").show();
        	}
        	if(loaiky == 3){
        		self.$el.find("#tutuanlabel").hide();
        		self.$el.find("#dentuanlabel").hide();
        		self.$el.find("#tuthanglabel").hide();
        		self.$el.find("#denthanglabel").hide();
        		
        		this.getFieldElement("tutuan").data("gonrin").hide();
        		this.getFieldElement("dentuan").data("gonrin").hide();
        		this.getFieldElement("tuthang").data("gonrin").hide();
        		this.getFieldElement("denthang").data("gonrin").hide();
        		
        		self.$el.find("#tu6thanglabel").show();
        		self.$el.find("#den6thanglabel").show();
        		this.getFieldElement("tu6thang").data("gonrin").show();
        		this.getFieldElement("den6thang").data("gonrin").show();
        	}
        	if(loaiky > 3){
        		self.$el.find("#tutuanlabel").hide();
        		self.$el.find("#dentuanlabel").hide();
        		self.$el.find("#tuthanglabel").hide();
        		self.$el.find("#denthanglabel").hide();
        		self.$el.find("#tu6thanglabel").hide();
        		self.$el.find("#den6thanglabel").hide();
        		
        		this.getFieldElement("tutuan").data("gonrin").hide();
        		this.getFieldElement("dentuan").data("gonrin").hide();
        		this.getFieldElement("tuthang").data("gonrin").hide();
        		this.getFieldElement("denthang").data("gonrin").hide();
        		this.getFieldElement("tu6thang").data("gonrin").hide();
        		this.getFieldElement("den6thang").data("gonrin").hide();
        	}
        }
    	//onItemClick:
    });
    
});