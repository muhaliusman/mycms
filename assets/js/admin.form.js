

( function ( document, window, index ){
	/*
		By Osvaldas Valutis, www.osvaldas.info
		Available for use under the MIT License
		custome file input
	*/
	var inputs = document.querySelectorAll( '.inputfile-upload' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));

/***
 * jquery fn & ????
 */
(function($){
	$.fn.isClone = function(){
		var name = $(this).attr('name');
		
		if( name && ( name.indexOf('[__NAME__]') == -1 ) )
		{
			return false;
		}

		return true;
	};
})(jQuery);


/***
 * Field repeter
 */
(function($, uniqId){
	var Repeater = {
		add: function($btn){
			var $container, $clone;
			
			$container = $btn.closest('.repeater').find('.repeater_fields').first();
			$clone = $container.children('.row_clone')
			$clone.find('.row_item').remove();
			$items = $clone.clone().removeClass('row_clone').addClass('row_item');
			
			var new_id = uniqId();
			$items.html(function(i,h){
				return h.replace(/(=["]*[\w-\[\]]*?)(__NAME__)/g, '$1' + new_id).replace(/(=["]#[\w-\[\]]*?)(__NAME__)/g, '$1' + new_id);
			});
			
			$clone.before($items);
			Repeater.order($container);
			
			// setup fields
			$(document)
				.trigger('dmz/form/setup_fields', $items);
				//.trigger('add/imgUploader'); see on media js
		},
		order: function( $container ){
			$container.children('.row_item').each(function(i){
				$(this).find('> .field_order .order_number').html( i+1 );				
			});
		},
		remove: function($el){
			var $item, $container;

			$item = $el.closest('.row_item');
			$container = $item.parent();
			//$(document).trigger('dmz/remove_fields', $item);
			$item.remove();
			Repeater.order($container);
		}
	};
	
	$(document)
		.on('click', '.repeater > .new-repeater-item', function(e){
			Repeater.add($(this));
			e.preventDefault();
		})
		.on('click', '.repeater .remove-repeater-item', function(e){
			Repeater.remove($(this));
			e.preventDefault();
		});
		
	$('form#master-form').submit(function(e){
		$('.row_clone').remove();
	});
})(jQuery, window.WCB.helper.uniqId);


/***
 * Form Field
 * $(document).on('dmz/form)
 */
(function($, _url, _akey, WCB){
	var tinymceConfig = {
		path_absolute: _url.base,
		plugins: [
			"advlist autolink lists link image hr pagebreak",
			"searchreplace wordcount visualblocks visualchars code",
			"media nonbreaking table contextmenu directionality",
			"paste textcolor colorpicker textpattern filemanager"
		],
		toolbar1: "bold italic strikethrough bullist numlist | blockquote underline hr | alignleft aligncenter alignright alignjustify | link unlink | styleselect searchreplace",
		toolbar2: "formatselect | table forecolor removeformat filemanager image media | outdent indent undo redo code", 
		forced_root_block : '<p>',
		menubar: false,
		relative_urls: false,
		convert_urls: false, 
		verify_html : false,
		inline_styles : true,
		image_dimensions: false,
		image_class_list: [
			{title: 'None', value: ''},
			{title: 'Responsive', value: 'img-responsive'},
			{title: 'Responsive inline', value: 'img-responsive-inline'},
			{title: 'Circle', value: 'img-responsive img-circle'},
			{title: 'Full width', value: 'img-full-width'},
			{title: 'Rounded', value: 'img-responsive img-rounded'},
			{title: 'Thumbnail', value: 'img-thumbnail'}
		],
		extended_valid_elements : "span,div[!class|!id|!style],ul[!class|!id|!style],span[*],i[!class|!id|!style]",
		external_filemanager_path: _url.vendor + "filemanager/", 
		filemanager_title: 'Media Manager',
		external_plugins: { "filemanager" : _url.vendor + "filemanager/plugin.min.js"},
		filemanager_access_key: _akey,
		image_advtab: false,
		table_advtab: false,
		table_cell_advtab: false,
		table_row_advtab: false,
		table_appearance_options: false,
		table_default_attributes: {'class': 'table table-bordered'},
		table_default_styles: {},
		table_class_list: [
			{title: 'None', value: ''},
			{title: 'Bordered', value: 'table table-bordered'},
			{title: 'Bordered & Hover', value: 'table table-hover table-bordered'},
			{title: 'Borderless', value: 'table borderless'},
			{title: 'Striped', value: 'table table-striped'}
		],
		table_row_class_list: [
			{title: 'None', value: ''},
			{title: 'Active', value: 'active'},
			{title: 'Success', value: 'success'},
			{title: 'Warning', value: 'warning'},
			{title: 'Danger', value: 'danger'},
			{title: 'Info', value: 'info'},
		],
		link_class_list: [
			{title: 'None', value: ''},
			{title: 'Color Blue', value: 'color-blue'},
			{title: 'Color Black', value: 'color-black'},
			{title: 'Color White', value: 'color-white'},
			{title: 'Color Yellow', value: 'color-yellow'},
			{title: 'Color Orange', value: 'color-orange'},
			{title: 'Color Orange Light', value: 'color-orange-light'}
		],
		setup: function (editor) {
			editor.on('BeforeSetContent', function(e) {
				if (e.content.indexOf("<table") == 0) {
					e.content = '<div class="table-responsive">' + e.content + '</div>';
				}
			});
		}
	};
	
	if( WCB.mceConfig ){
		$.each(WCB.mceConfig, function( k, v ){ tinymceConfig[k] = v;});
	}
	
	var formSetup = function(e, el){
		var $el = $(el);

		// setup select2 vendor(plugin)
		$el.find('.select2-control').each(function(){
			var $this = $(this);
			
			if( ! $this.isClone($this) ) {
				$this.select2();
			}
		});

		if (typeof tinymce !== 'undefined') {
			var selector = [];
			$el.find('textarea.tinymce-control').each(function(){
				var $this = $(this);
				if( ! $this.isClone($this) ) {
					selector.push($this.attr('id'));
				}
			});
			
			if( selector.length > 0 ){
				tinymceConfig.selector = "#" + selector.join(', #');
				tinymce.init(tinymceConfig);
			}
		}
	};
	
	$(document)
		.on('dmz/form/setup_fields', formSetup)
		.ready(function($) {
			$(document).trigger('dmz/form/setup_fields', this);
		});
})(jQuery, window.WCB.url, window.WCB.authKey, window.WCB);


/***
 * tynimce
 *//* 
if (typeof tinymce !== 'undefined') { 
	(function($, _url, _akey, WCB){
		var tinymceConfig = {
			path_absolute: _url.base,
			target: element,
			//selector: "textarea.tinymce-control",
			plugins: [
				"advlist autolink lists link image charmap print hr anchor pagebreak",
				"searchreplace wordcount visualblocks visualchars code fullscreen",
				"insertdatetime media nonbreaking save table contextmenu directionality",
				"emoticons template paste textcolor colorpicker textpattern filemanager"
			], 
			forced_root_block : '<p>',
			menubar: false,
			relative_urls: false,
			convert_urls: false, 
			verify_html : false,
			inline_styles : true,
			extended_valid_elements : "span,div[!class|!id|!style],ul[!class|!id|!style],span[*],i[!class|!id|!style]",
			external_filemanager_path: _url.vendor + "filemanager/", 
			filemanager_title: 'Media Manager',
			external_plugins: { "filemanager" : _url.vendor + "filemanager/plugin.min.js"},
			filemanager_access_key: _akey,
			image_advtab: true,
			toolbar1: "bold italic strikethrough bullist numlist | blockquote underline hr | alignleft aligncenter alignright alignjustify | link unlink anchor | styleselect",
			toolbar2: "formatselect | forecolor removeformat print filemanager image media | outdent indent undo redo code "
		};
		
		if( WCB.mce_style ){
			tinymceConfig.content_css = WCB.mce_style;
		}
		
		
		
		tinymce.init(tinymceConfig);
	})(jQuery, window.WCB.url, window.WCB.authKey, window.WCB);
}
 */
/***
 * field type filemanager 
 */
(function($, _url){
	var FileManager = {
		update: function( $el ){
			var file = $el.val();
			if( ! file )
				return;

			var classes = 'media-filemanager clearfix active';
			var $container = $el.closest('.media-filemanager');
			var fileName = file.substring(file.lastIndexOf('/') + 1);
			var extension = fileName.substring(fileName.lastIndexOf('.') + 1);
			var $editBtn = $container.find('figcaption a[data-fancybox]');

			// is images type
			if( $.inArray(extension, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg']) > -1 ){
				classes += ' file-type-image';
				var thumb = file.replace("/media/", '/mediathumbs/');
			}
			else{
				var thumb = _url.vendor + 'filemanager/img/ico/' + extension + '.jpg';
			}
			
			// check file update
			switch($container.data('path')) {
				case 'location':
					file = file.replace(_url.upload, '');
					break;
				case 'file':
					file = file.replace(_url.upload + 'media/', '');
					break;
			}

			$container.find('h4.ellipsis').text(fileName.replace("." + extension, ''));
			$container.find('.filetype').text(extension);
			$container.find('input.input-real').val(file);
			$container.find('.img-container > img').attr('src', thumb);
			$container.attr('class', classes);
			$editBtn.data('src', $editBtn.data('src') + file.replace('media/', '&fldr=').replace(fileName, ''));
		},
		remove: function( $el ){
			var $container = $el.closest('.media-filemanager');
			
			$container.attr('class', 'media-filemanager clearfix');
			$container.find('input[type="hidden"]').val('');
		}
	};

	$( document )
		.on('dmz/file_manager', function(e, el){ FileManager.update($(el));})
		.on('click', '.media-filemanager a.remove-file', function(e){ FileManager.remove($(this));})
		.ready(function(){
			$('.media-filemanager input.input-dummy').each(function(){
				FileManager.update($(this));
			});
		});
})(jQuery, window.WCB.url);


function responsive_filemanager_callback(field_id){
	var $el = $('#' + field_id);
	
	$.fancybox.close();
	$(document).trigger('dmz/file_manager', $el);
}

/***
 * select2 popup new group
 */
(function($){
	var PopupGroup = {
		trigger: function( $el ){
			if( $(this).val() === "add_new" )
				PopupGroup.show($(this));
		},
		show: function( $el ){
			var title = $el.closest('.form-group').find('> label.control-label').text();
			$.confirm({
				title: 'Add New ' + title,
				content: '' +
					'<form action="">' +
						'<div class="form-group">' +
							'<label>Enter '+ title +' label: </label>' +
							'<input type="text" class="add_new_group form-control"/>' +
						'</div>' +
					'</form>',
				buttons: {
					formSubmit: {
						text: 'Submit',
						btnClass: 'btn-blue',
						action: function(){
							var label = this.$content.find('input.add_new_group').val();
							if(label && label.length > 3 ) {
								if($el.find('option[value="'+label+'"]').length < 1){
									$el.append('<option value="'+label+'">'+label+'</option>');
								}

								$el.val(label).trigger('change');
							}
						}
					},
					cancel: function () { 
						//close
					},
				},
				onContentReady: function () {
					// bind to events
					var jc = this;
					this.$content.find('form').on('submit', function (e) {
						// if the user submits the form by pressing enter in the field.
						e.preventDefault();
						jc.$$formSubmit.trigger('click'); // reference the button and click it
					});
				}
			});
		},
	};

	$(document).on('select2:close', 'select[data-action="newgroup"]', PopupGroup.trigger);
})(jQuery);

/***
 * Setup
 */
(function($){
	var fieldSetup = function(){
		if ( $.fn.datetimepicker ) {
			// Setup input field date time picker
			$('.datetimepicker > input').datetimepicker({
				format:'Y-m-d H:i:s' 
			}).trigger('blur.xdsoft');
			
			// Setup input field date picker
			$('.datepicker > input').datetimepicker({
				timepicker:false,
				format:'Y-m-d' 
			}).trigger('blur.xdsoft');
			
			// Setup when form group icon click to show datetimepicker/datepicker
			$('.datetimepicker > .input-group-addon, .datepicker > .input-group-addon').click(function(){
				$(this).prev('input').datetimepicker('show');
			});
		}
		
		if ( $.fn.mask ) {
			// Setup input field with .mask-as-money as money format
			// see https://igorescobar.github.io/jQuery-Mask-Plugin/
			$('.mask-as-money').each(function(){
				var $this = $(this);
				var value = $this.val();
	
				if( value.indexOf(",") == -1 && value) {
					var split = value.split('.')[1];
					var plus  = '00';
		
					if(split) {
						plus = (parseInt(split, 10) <  10) ? '0': '';
					}
		
					value += plus;
					$this.val(value);
				}
		
				$this.mask('#.##0,00', {reverse: true});
			}); 
			// Setup input field with .mask-as-k as money format
			// see https://igorescobar.github.io/jQuery-Mask-Plugin/
			$('input.mask-as-k').mask('#,##0', {reverse: true});
			$('input.mask-as-idk').mask('#.##0', {reverse: true});
			
			// Setup input field with .mask-as-percent as percent format
			// see https://igorescobar.github.io/jQuery-Mask-Plugin/ 
			$('input.mask-as-percent').each(function(){
				var $this = $(this);
				var value = $this.val();
	
				if( value.indexOf(",") == -1 && value) {
					var split = value.split('.')[1];
					var plus  = '00';
		
					if(split) {
						plus = (parseInt(split, 10) <  10) ? '0': '';
					}
	
					value += plus;
					$this.val(value);
				}
	
				$this.mask('##0.00', {reverse: true});
			});
		}
		
		if ( $.fn.maskMoney ) {
			// https://github.com/plentz/jquery-maskmoney
			$('input.currency-id').maskMoney({thousands:'.', decimal:',', allowZero:true, allowNegative: true, precision: 0}).trigger("mask.maskMoney");
			$('input.currency-idr').maskMoney({thousands:'.', decimal:',', allowZero:true, allowNegative: true, precision: 0, prefix: 'Rp '}).trigger("mask.maskMoney");
		}
	};
	
	// ??
	$(document)
		.ready(fieldSetup)
		.on('focus click', '.form-group.has-error', function(){
			$(this).removeClass('has-error').find(' > .error-message.text-danger').remove();
		})
		.on('click', 'button#sumbit-form', function(){
			$("#master-form button[type='submit']").trigger('click');
		})
		.on('submit', 'form', function(e){
			// clean masked value before save to database
			$('.mask-as-money').mask('#0.00', {reverse: true});
			$('.mask-as-k, .mask-as-idk').unmask();
			$('input.currency-id').val(function(i, val){
				return val.replace(/\./g, '');
			});
			$('input.currency-idr').val(function(i, val){
				return val.replace(/\./g, '').replace('Rp ', '');
			});
		});
})(jQuery);

/*
 FILE TYPE PASSWORD GENERATOR 
*/
(function($){
	"use strict";
	
	var CHAR_SETS = [
			[true, "Numbers", "0123456789"],
			[true, "Lowercase", "abcdefghijklmnopqrstuvwxyz"],
			[true, "Uppercase", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
	];
	
	var PassGenerator = {
		$newPassHtml: null,
		string_length: 10, // create 10 char ramdom string
		cryptoObject: null,
		initCrypto: function() {
			if ("crypto" in window)
				PassGenerator.cryptoObject = crypto;
			else if ("msCrypto" in window)
				PassGenerator.cryptoObject = msCrypto;
		},
		newPassField: function($el){
			this.$newPassHtml = $el.clone();
			$el.replaceWith([
				'<div class="generate-new-password-wrapper">',
					'<div style="width:75%;padding-right:10px;">',
						'<div class="input-group input-group-sm">',
							'<input class="form-control" id="field-password" name="password" type="text">',
							'<span class="input-group-btn">',
								'<button type="button" id="" required="required" class="btn btn-sm btn-default generate-password">Generate</button>',
							'</span>',
						'</div>',
					'</div>',
					'<button type="button" id="" class="btn btn-link btn-sm" style="padding-top:7px;">Cancel</button>',
				'</div>'].join(''));
				
			$('button.generate-password').trigger('click');
		},
		cancel: function($el){
			$el.closest('.generate-new-password-wrapper').replaceWith(this.$newPassHtml);
		},
		generate: function(){
			// Gather the character set
			var charsetStr = "";
			CHAR_SETS.forEach(function(entry, i) { charsetStr += entry[2]; });
			charsetStr = charsetStr.replace(/ /, "\u00A0");  // Replace space with non-breaking space

			// Convert to array and remove duplicate characters
			var charset = [];
			for (var i = 0; charsetStr.length > i; i++) {
				var c = charsetStr.charCodeAt(i);
				var s = null;
				if (0xD800 > c || c >= 0xE000)  // Regular UTF-16 character
					s = charsetStr.charAt(i);
				else if (c >= 0xD800 ? 0xDC00 > c : false) {  // High surrogate
					if (charsetStr.length > i + 1) {
						var d = charsetStr.charCodeAt(i + 1);
						if (d >= 0xDC00 ? 0xE000 > d : false) {
							// Valid character in supplementary plane
							s = charsetStr.substr(i, 2);
							i++;
						}
						// Else discard unpaired surrogate
					}
				} else if (d >= 0xDC00 ? 0xE000 > d : false)  // Low surrogate
					i++;  // Discard unpaired surrogate
				else
					throw "Assertion error";
				if (s != null ? charset.indexOf(s) == -1 : false)
					charset.push(s);
			}
			
			var password = "";
			var statistics = "";
			if (charset.length == 0)
				alert("Error: Character set is empty");
			else {
				var length = this.string_length;
				
				if (0 > length)
					alert("Negative password length");
				else if (length > 10000)
					alert("Password length too large");
				else {
					for (var i = 0; length > i; i++)
						password += charset[this.randomInt(charset.length)];
				}
			}

			$('input[name="password"]').val(password);
		},
		randomInt: function(n) {
			var x = this.randomIntMathRandom(n);
			x = (x + this.randomIntBrowserCrypto(n)) % n;
			return x;
		},
		randomIntMathRandom: function(n) {
			var x = Math.floor(Math.random() * n);
			if (0 > x || x >= n)
				throw "Arithmetic exception";
			return x;
		},
		randomIntBrowserCrypto: function(n) {
			if (this.cryptoObject == null)
				return 0;
			// Generate an unbiased sample
			var x = new Uint32Array(1);
			do this.cryptoObject.getRandomValues(x);
			while (x[0] - x[0] % n > 4294967296 - n);
			return x[0] % n;
		}
	};
	
	$(document)
		.ready(PassGenerator.initCrypto)
		.on('click', 'button.generate-password', function(){PassGenerator.generate()})
		.on('click', '.generate-new-password-wrapper > button', function(){PassGenerator.cancel($(this))})
		.on('click', 'button.generate-new-password', function(){PassGenerator.newPassField($(this))});
})(jQuery);


/*
 custome logic
*/
(function($){
	$(document).ready(function(){
		
		// show hide based on checkbox
		$('input.filedlogic_true_false_toggle').change(function() {
			if($(this).is( ":checked" )){
				$('.filedlogic_true_show').show();
				$('.filedlogic_false_show').hide();
			}
			else{
				$('.filedlogic_true_show').hide();
				$('.filedlogic_false_show').show();
			}
		}).change();

		// refresh page on change
		$('.refresh_page_on_change').change(function() {
			location.reload();
		});
	});
})(jQuery);