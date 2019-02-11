(function($){
	var fieldSetup = function(){
		if ( $.fn.datetimepicker ) {
			$.datetimepicker.setLocale('id');
			
			// Setup input field date time picker
			$('.datetimepicker > input').datetimepicker({
				format:'d F Y H:i:s' 
			}).trigger('blur.xdsoft');
			
			// Setup input field date picker
			$('.datepicker > input').datetimepicker({
				timepicker:false,
				format:'d F Y' 
			}).trigger('blur.xdsoft');
			
			// Setup when form group icon click to show datetimepicker/datepicker
			$('.datetimepicker > .input-group-addon, .datepicker > .input-group-addon').click(function(){
				$(this).prev('input').datetimepicker('show');
			});
		}
		
		if ( $.fn.validator ) {
			// required jquery validation
			$.validator.setDefaults({
				errorElement: "em",
				errorPlacement: function ( error, element ) {
					var $holder = element.closest(".form-group");
					if( !$holder.hasClass( "has-feedback" ) ){
						var type = element.prop( "type" ), feedbackIcon = false;
						
						// Add the `help-block` class to the error element
						error.addClass( "help-block" );
						
						// Add `has-feedback` class to the parent div.form-group
						// in order to add icons to inputs
						$holder.addClass( "has-feedback" );
						
						if ( type === "checkbox" || type === "radio" ) {
							//error.insertAfter( element.parent( "label" ) );
						} else if ( element.closest(".input-group.date").exists() ) {
							error.insertAfter( element.closest(".input-group") );
						} else if ( element.closest(".input-group").exists() ) {
							error.insertAfter( element.closest(".input-group") );
							if ( (!element.next( "span" )[ 0 ]) ) {
								element.closest(".input-group").addClass('has-icon-feeback');
								$("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter( element );
							}
						} else if ( element.hasClass("selectpicker") ) {
							error.insertAfter( element.closest(".bootstrap-select") );
						} else {
							feedbackIcon = true;
							error.insertAfter( element );
						}
						
						// Add the span element, if doesn't exists, and apply the icon classes to it.
						if ( (!element.next( "span" )[ 0 ]) && feedbackIcon ) {
							element.wrap('<div class="inner-addon right-addon"></div>').after("<span class='glyphicon glyphicon-remove form-control-feedback'></span>");
							//$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
						}
					}
				},
				success: function ( label, element ) {
					var $el = $( element ), type = $el.prop( "type" );
					// Add the span element, if doesn't exists, and apply the icon classes to it.
					if ( type === "checkbox" || type === "radio" ) {
						//error.insertAfter( element.parent( "label" ) );
					} else if ( $el.hasClass("selectpicker") ) {
						//error.insertAfter( element.parent(".input-group") );
					} else if ( $el.closest(".input-group").exists() ) {
						//error.insertAfter( element.parent(".input-group") );
					} else if ( !$el.next( "span" )[ 0 ] ) {
						$el.wrap('<div class="inner-addon right-addon"></div>').after("<span class='glyphicon glyphicon-ok form-control-feedback'></span>");
						//$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
					}
				},
				highlight: function ( element, errorClass, validClass ) {
					var $el = $( element );
					$el.closest( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
					$el.next( "span.glyphicon" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
				},
				unhighlight: function ( element, errorClass, validClass ) {
					var $el = $( element );
					$el.closest( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
					$el.next( "span.glyphicon" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
				},
				submitHandler: function (form) {
					//if( "" == grecaptcha.getResponse() ){
					//	$.alert({
					//		icon: 'fa fa-exclamation-triangle',
					//		title: 'Informasi',
					//		content: 'Pastikan anda bukan robot !',
					//		buttons: {
					//			confirm: {
					//				text: 'OK',
					//				btnClass: 'btn-dark',
					//			}
					//		}
					//	});
					//
					//	return;
					//}
		
					var $form = $("form.form-builder"), formData;
					
					if ( $form.data('ajaxRunning') ) {
						return;
					}
					
					$form.data('ajaxRunning', true);
					
					// reset datepicker
					//$form.find('.datepicker > input').datetimepicker({format: 'Y-m-d'}).trigger('blur.xdsoft');
					//$form.find('.datetimepicker > input').datetimepicker({format: 'Y-m-d H:i:s'}).trigger('blur.xdsoft');
					formData = $form.serializeObject();
					// securing field
					$form.find('.field-secured').each(function() {
						var name = this.name;
						if( formData[name] ){
							formData[name] = CryptoJS.AES.encrypt(JSON.stringify(formData[name]), formData._token, {format: CryptoForm}).toString();
						}
					});
					
					$.confirm({
						icon: 'fa fa-exclamation-triangle',
						title: 'Gagal',
						theme: 'supervan',
						content: function () {
							var self = this;
							return $.ajax({
								method: 'post',
								dataType: 'json',
								url: $form.attr('action'),
								data: formData
							}).done(function (response) {
								form.reset();
								self.setContent(response.message);
								self.setTitle('Berhasil');
								self.setIcon('fa fa-lightbulb-o');
							}).fail(function(response){
								var info;
								try{
									info = $.parseJSON(response.responseText);
									info = info.error || info.message;
								}catch(e){
									info = 'Oops, sepertinya ada yang tidak beres.<br><br>Silahkan coba lagi<br>atau<br>hubungi kami melalui telp.';
								}
		
								self.setContent(info);
							}).complete(function() {
								$form.data('ajaxRunning', false);
							});
						},
						buttons: {
							confirm:{
								text: 'Ok',
								action: function () {
									location.reload(); 
								} 
							},
							cancel: {
								text: 'Close',
								action: function () {
									//close
								}
							}
						}
					});
				}
			}); 
			
			$("form.form-builder").validate({lang : 'id'});
		};
	}
	
	$(document).ready(fieldSetup)
})(jQuery);