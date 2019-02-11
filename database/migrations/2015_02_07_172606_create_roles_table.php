<?php
/*
|--------------------------------------------------------------------------
| Laravel ACL
|--------------------------------------------------------------------------
|
| Light-weight role-based permissions for Laravel 5 built in Auth system.
| 
| Custome code based:
| ~ kodeine/laravel-acl "0.1.3"
| ~ By Ahsen M.
| ~ https://github.com/kodeine
*/

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }

}
