(function($){
	var contact = '.form-panel-page_contact';
		/* post_only = '.form-panel-page_excerpt',
	    typePost = ['blog']; */
	$(document)
		.ready(function(){
			var value = $('#field-post_type').val();

			if( 'ContactUs' == value ){
				$(contact).removeClass('hidden');
			}/* 
			if( typePost.indexOf(value) >= 0 ){
				$(post_only).removeClass('hidden');
			} */
		})
		.on('submit', 'form', function(e){
			var $post_type = $('#field-post_type'), value;
			
			value = $post_type.val();
			$post_type.removeAttr('disabled');
			if( 'ContactUs' != value ){
				$(contact).remove();
			}
			/* if( typePost.indexOf(value) < 0 ){
				$(post_only).remove();
			} */
		});
})(jQuery);