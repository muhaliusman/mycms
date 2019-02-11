<?php

use Illuminate\Database\Seeder;

use Illuminate\Database\Eloquent\Model;
use Cerberusworks\Cwcms\Traits\SeedableTrait;

class CwmsDatabaseSeeder extends Seeder
{
    use SeedableTrait;

    protected $seedersPath;
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
        $this->seedersPath = database_path('seeds').'/';
        $this->seed('BaseTableSeeder');
        $this->seed('AdminTableSeeder');
    }
}
