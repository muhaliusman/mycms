<?php

use App\Option;
use Illuminate\Database\Seeder;

class BaseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		$faker = Faker\Factory::create();
		// this required option for site
		$required = array(
			'_favicon' => 'settings/favicon.png',
			'_site_name' => env('APP_NAME'),
			'_site_logo' => 'settings/logo.png',
			'_meta_image' => '',
			'_meta_key' => $faker->sentence(7),
			'_meta_desc' => $faker->sentence(7)
		);

		// yes, usage frontend & backend
		foreach( $required as $name => $value ){
			DB::table('options')->insert([
				'name' => $name,
				'value' => $value,
				'autoload' => 'yes'
			]);
		}
    }
}