if ($.fn.DataTable) {
(function($, i18n){
	var bulkTable = {
		$table: null,
		init: function(){
			bulkTable.$table = $(".dataTable");
			bulkTable.$table.DataTable({
				responsive: true,
				autoWidth: false,
				iDisplayLength: 50,
				initComplete: bulkTable.initComplete,
				drawCallback: function(){
					$("img.lazyload").lazyload();
				},
				columnDefs:[
					{
						searchable: false,
						orderable: false,
						targets: [0, -1],
						width: '1%' 
					}
				],
				language:{
					info: "_MAX_ items",
					lengthMenu: "Show: _MENU_",
					paginate:{
						previous: "<i class='fa fa-caret-left'></i>",
						next: "<i class='fa fa-caret-right'></i>"
					}
				}
			});

			$("#bulkTableAll, .bulkTableRow").prop('checked', false);			
			$(".bulkTableRow").click(bulkTable.checked);
			$("#bulkTableAll").click(function() { 
				$(".bulkTableRow").prop('checked', this.checked );
				bulkTable.checked();
			});
		},
		initComplete: function(settings, json){
			var span = [  
				'<div class="tablebulk">',
					'<div class="btn-group">',
						'<label class="btn btn-default bulk-label">',
							'<input id="bulkTableAll" type="checkbox">', 
							'<span id="bulk-info"><span>0</span>&nbsp;'+ i18n._selected +'</span>',
						'</label>',
						'<button class="btn btn-default confirmation--delete" type="submit">'+ i18n._bulkDeleteBtn +'</button>',
					'</div>',
				'</div>'
			].join("");
			
			if( bulkTable.$table.find('input[type="checkbox"]').length <= 1 )
				span = '';
			
			var wraperClass = 'table-responsive';
			if( bulkTable.$table.find('.dummy-fit').length > 0 ){
				wraperClass += ' admin-datatable-fit';
			}

			bulkTable.$table.wrap('<div class="'+ wraperClass +'"></div>').before(span);
			bulkTable.$table.find('tbody.hidden').removeClass('hidden');
		},
		checked: function(){
			var count = $(".bulkTableRow:checked").length,
				isChecked = (count > 0);

			$('#bulk-info span').text(count);
			$("#bulkTableAll").prop('checked', isChecked);
			$('#form-bulk-delete').toggleClass('bulk-active', isChecked);
		}
	};
	
	$(document).ready(bulkTable.init);
})(jQuery, window.WCB._i18n);
}