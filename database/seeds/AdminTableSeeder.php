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
		$this->roles = config('cwcms.admin_roles');
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
			$idRole = DB::table('roles')->insertGetId([
				'slug' => $role,
				'name' => $title,
				'description' => 'This user cms role',
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			]);

			$idUser = DB::table('users')->insertGetId([
				'user_login' => $role,
				'password' => bcrypt($role),
				'first_name' => $faker->firstName,
				'last_name' => $faker->lastName,
				'user_role' => $role,
				'email' => $faker->companyEmail(),
				'api_token' => str_random(60),
				'active' => 1,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			]);

			DB::table('role_user')->insert([
				'role_id' => $idRole,
				'user_id' => $idUser,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			]);

		}

		$this->permissions();
    }


	protected function permissions()
	{
		// permission name must same with permalink pefix or module (see on CMS menu permalink)
		// or an permission Inheritance (kodiene acl) allowed

		// Section Admin
		// ============================================================
		$Admin = DB::table('permissions')->insertGetId([
			'name' => 'user',
			'slug' => json_encode([
				'view'	 => true,
				'create' => true,
				'update' => true,
				'delete' => true,
			]),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		]);


		// Modul Menu
		// ============================================================
		$Menu = DB::table('permissions')->insertGetId([
			'name' => 'menu',
			'slug' => json_encode([
				'form'	  => true,
				'additem' => true,
				'store'	  => true,
				'delete'  => true,
			]),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		]);


		// Section Options
		// ============================================================
		$Option = DB::table('permissions')->insertGetId([
			'name' => 'settings',
			'slug' => json_encode([
				'update' => true,
			]),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		]);

		$Footer = DB::table('permissions')->insertGetId([
			'name' => 'footer',
			'slug' => json_encode([
				'update' => true,
			]),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		]);

		$ActivityLog = DB::table('permissions')->insertGetId([
			'name' => 'activity-log',
			'slug' => json_encode([
				'delete'  => true,
			]),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		]);

		// List Permission name => id
		// ============================================================
		$permissions = [
			'user' => $Admin,
			'menu' => $Menu,
			'settings' => $Option,
			'footer' => $Footer,
			'activity-log' => $ActivityLog
		];


		// Attach Permission to Role
		// ============================================================
		$Roles = DB::table('roles')->whereIn('slug', array_keys($this->roles))->get();
		foreach( $Roles as $Role ){
			$perm = $Role->slug == 'admin'? array_except($permissions, ['user', 'activity-log']): $permissions;

			foreach ($perm as $key => $value) {
				DB::table('permission_role')->insert([
					'permission_id' => $value,
					'role_id' => $Role->id,
					'created_at' => date('Y-m-d H:i:s'),
					'updated_at' => date('Y-m-d H:i:s')
				]);
			}
		}
	}
}