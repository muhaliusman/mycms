<?php

use Illuminate\Database\Seeder;

use Illuminate\Database\Eloquent\Model;

class CwmsDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
	 *
	 * Seeder di gunakan pada proses development untuk mempermudah update saat ada penambahan data maupun modul.
     *
     * @return void
     */
    public function run()
    {
		// Seeder sequece is order by constraint
		Model::unguard();
        $this->call(BaseTableSeeder::class); // Base or global option
        $this->call(AdminTableSeeder::class); // Cms admin users & permission
    }
}
