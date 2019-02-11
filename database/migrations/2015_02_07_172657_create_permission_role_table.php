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

class CreatePermissionRoleTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permission_role', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('permission_id')->unsigned()->index();
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');
            $table->integer('role_id')->unsigned()->index();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
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
        Schema::dropIfExists('permission_role');
    }

}
