<?php

return [
    /*****
	|--------------------------------------------------------------------------
	| Url backend prefix
	|--------------------------------------------------------------------------
	|
	| This value determines prefix to acces  admin/cms/backend page.
	| like http:\\base.com\cms_url -> will redirect to admin/backend page.
	|
	*/
	'backend_uri' => 'cms',


	/*****
	|--------------------------------------------------------------------------
	| Localization
	|--------------------------------------------------------------------------
	|
	| List of available translation language & base site primary language
	|
	*/
	'language' => [
		'en' => 'ENG',
		'id' => 'IND',
	],

	/*****
	|--------------------------------------------------------------------------
	| published list
	|--------------------------------------------------------------------------
	|
	| This value determines available name and value of published type
	|
	*/
	'published_var' => [
		'publish' => 'Published',
		'publish_on' => 'Published On',
		'draf' => 'Draft',
	],


	/*****
	|--------------------------------------------------------------------------
	| Admin User Role
	|--------------------------------------------------------------------------
	|
	| This value determines available name and value of user role.
	| This created for purpose to easy edited display text label
	|
	*/
	'admin_roles' => [
		'masteradmin' => 'Masteradmin',
		'admin' => 'Administrator',			// Admin can't add new user
	],


	/*****
	|--------------------------------------------------------------------------
	| Frontend template modul
	|--------------------------------------------------------------------------
	|
	| This value determines available modul class name (camel case) and label(readable for user) for frontend.
	| This created for purpose to easy edited display text label
	| user purpose for easy customize frontend. included seo meta, permalink etc.
	|
	| !important
	| tipe variable harus uniq, usahakan hanya ada 1 dan dapat digunakan untuk routing function {routing()}
	| variable ini berkaitan dengan laravel\app\Http\Includes\ProviderRouting & laravel\app\Http\Includes\helper-url.php function routing() & laravel\app\Http\Frontend\Controllers\RouterController.php
	*/
	'page_type_var' => [
		'page' => 'Default Template'
	],


	/*****
	|--------------------------------------------------------------------------
	| published list of available post type
	|--------------------------------------------------------------------------
	|
	| This value determines available name and value of published type
	|
	*/
	'post_type_var' => [
		'blog' => 'Blogs'
	],


	/*****
	|--------------------------------------------------------------------------
	| List of available frontmenu / theme (Primary, footer, sidebar, etc )
	|--------------------------------------------------------------------------
	|
	| This value determines available name and label of front menu name.
	|
	*/
	'theme_menu' => [
		'primaryMenu' => 'Primary Menu',
		//'footerMenu' => 'Footer Menu',
	],


	/*****
	|--------------------------------------------------------------------------
	| List of available nav menu type
	|--------------------------------------------------------------------------
	|
	| This value determines available name and label of front menu name.
	|
	*/
	'menu_item_type' => [
		'page' => 'Page',
		'template' => 'Template',
		'custome' => 'Custome Link',
	],

	/***
	|--------------------------------------------------------------------------
	| Rechaptcha Key
	|--------------------------------------------------------------------------
	|
	*/
	'recaptcha_secret_key' => env('RECAPTCHA_SECRET_KEY', ''),
];