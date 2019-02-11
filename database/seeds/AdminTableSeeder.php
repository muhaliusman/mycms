<?php

use App\User;
use App\Role;
use App\Permission;
use Illuminate\Database\Seeder;

class AdminTableSeeder extends Seeder
{
	protected $roles;

	public function __construct()
	{
		$this->roles = config('site.admin_roles');
	}


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		// register cms admin
		$faker = Faker\Factory::create();
		foreach( $this->roles as $role => $title ){
			Role::create([
				'slug' => $role,
				'name' => $title,
				'description' => 'This user cms role'
			]);

			User::create([
				'user_login' => $role,
				'password' => bcrypt($role),
				'first_name' => $faker->firstName,
				'last_name' => $faker->lastName,
				'user_role' => $role,
				'email' => $faker->companyEmail(),
				'api_token' => str_random(60),
				'active' => 1,
			])->assignRole($role);
		}

		$this->permissions();
    }


	protected function permissions()
	{
		// permission name must same with permalink pefix or module (see on CMS menu permalink)
		// or an permission Inheritance (kodiene acl) allowed

		// Section Admin
		// ============================================================
		$Admin = Permission::create([
			'name' => 'user',
			'slug' => [
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]
		]);


		// Modul Menu
		// ============================================================
		$Menu = Permission::create([
			'name' => 'menu',
			'slug' => [
				'form'	  => true,
				'additem' => true,
				'store'	  => true,
				'delete'  => true,
			]
		]);


		// Section Options
		// ============================================================
		$Option = Permission::create([
			'name' => 'settings',
			'slug' => [
				'update' => true,
			]
		]);

		$Footer = Permission::create([
			'name' => 'footer',
			'slug' => [
				'update' => true,
			]
		]);

/* 
		// Modul Post
		// ============================================================
		// Post
		$Post = Permission::create([
			'name' => 'post',
			'slug' => [
				'create' => true,
				'view'	 => true,
				'update' => true,
				'delete' => true,
			]
		]);

		// Modul Portfolio
		// ============================================================
		// Post
		$Portfolio = Permission::create([
			'name' => 'portfolio',
			'slug' => [
				'create' => true,
				'view'	 => true,
				'update' => true,
				'delete' => true,
			]
		]);

		// Modul Message
		// ============================================================
		$Message = Permission::create([
			'name' => 'message',
			'slug' => [
				'view'	 => true,
				'delete' => true,
			]
		]);

		// Page
		$Page = Permission::create([
			'name' => 'page',
			'slug' => [
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]
		]);

		// Clients
		$Client = Permission::create([
			'name' => 'client',
			'slug' => [
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]
		]);

		// Post Category
		$PostCategory = Permission::create([
			'name' => 'post-category',
			'slug' => [
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]
		]);

		// Post Category
		$PortfolioCategory = Permission::create([
			'name' => 'portfolio-category',
			'slug' => [
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]
		]);

		// Post Category
		$OfficeType = Permission::create([
			'name' => 'office-type',
			'slug' => [
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]
		]);

		// Article
		$Blog = Permission::create([
			'name' => 'blog',
			'slug' => [
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]
		]);

		// Article
		$Slider = Permission::create([
			'name' => 'slider',
			'slug' => [
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]
		]);
		
		
		// Home Page
		// ============================================================
		$Home = Permission::create([
			'name' => 'home',
			'slug' => [
				'update' => true,
			]
		]); */

		// List Permission name => id
		// ============================================================
		$permissions = [
			'user' => $Admin->id,
			'menu' => $Menu->id,
			'settings' => $Option->id,
			'footer' => $Footer->id,
			/* 'post' => $Post->id,
			'portfolio' => $Portfolio->id,
			'page' => $Page->id,
			'post-category' => $PostCategory->id,
			'blog' => $Blog->id,
			'slider' => $Slider->id,
			'message' => $Message->id,
			'client' => $Client->id,
			'portfolio-category' => $PortfolioCategory->id,
			'office-type' => $OfficeType->id,
			'home' => $Home->id */
		];


		// Attach Permission to Role
		// ============================================================
		$Roles = Role::whereIn('slug', array_keys($this->roles))->get();
		foreach( $Roles as $Role ){
			$perm = $Role->slug == 'admin'? array_except($permissions, ['user']): $permissions;
			$Role->assignPermission(array_values($perm));
		}
	}
}