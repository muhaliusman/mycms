(function($, uniqId, addItemUrl){
	var Menu = {
		$ul: null,
		tmpl: null,
		spinner: null,
		data: {
			id: null,
			dbId: null,
			label: null,
			link: null,
			menu_Id: null,
			depth: 0,
			order: 0,
			parent: '',
			type: 'custome'
		},
		init: function() {
			var self = Menu;
			
			self.$ul = $("ul#menu-to-edit");
			self.tmpl = _.template( $('#tmpl-menu-item').html() );
			self.data.menu_Id = $('input#idmenu').val();
			$('.submit-add-to-menu').click(self.addItem);
		},
		addItem: function(){
			if( $(this).closest('#menu-settings-column').hasClass('metabox-holder-disabled') ){
				return;
			}
			
			var self = Menu, $li = $(this).closest('.control-section');
			self.spinner = $li.find(".spinner").show();
			self[$li.data('metaType')]($li);
		},
		appendItem: function( data ){
			if( data ){	
				if( _.isArray(data) ){
					var self = this;
					_.each(data, function(item){
						self.$ul.append(self.tmpl({item: item}));
					});
				}
				else{
					this.$ul.append(this.tmpl({item: data}));
				}
			}
			
			this.spinner.hide();
		},
		customeItem: function($li){
			var linkVal = $li.find('input#custom-menu-item-url').val();
			var labelVal = $li.find('input#custom-menu-item-name').val();
			if( ! linkVal || ! labelVal ){
				$li.find('#customlinkdiv').addClass('form-invalid');
				return this.spinner.hide();
			}
			
			var data = _.extend({}, this.data, {
				id: uniqId(),
				link : linkVal,
				label : labelVal,
			});

			this.addItemToDb([data]);
		},
		postItem: function($li){
			var data = [];
			var self = this;
			$li.find(".categorychecklist > li > label > input.menu-item-checkbox:checked").each(function(){
				var items = {
					id: uniqId(),
					term_title: '',
				};

				$(this).nextAll('input').each(function(){
					var item = $(this);
					items[item.attr('name')] = item.val();
					if( 'label' == item.attr('name') )
						items.term_title = item.val();
				});

				data.push(_.extend({}, self.data, items));
			});
			
			if( _.isEmpty(data) )
				return self.spinner.hide();
			
			self.addItemToDb(data);
		},
		addItemToDb: function(data){
			var self = this;
			
			$.post(addItemUrl, {items:data}, function(response) {
				self.appendItem(response);
			}, "json")
			.fail(function() {
				self.spinner.hide();
			});
		}
	};
		
	
	$( document ).ready(Menu.init);
	//delete confirmation
	$(document).on('click', '.delete-action .menu-delete', function(){
		return confirm("Do you want to delete this menu ?");
	});	
})(jQuery, window.WCB.helper.uniqId, window.addItemUrl);