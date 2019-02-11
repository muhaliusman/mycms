<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('id', 'ID');
            $table->renameColumn('name', 'first_name');
			$table->string('last_name', 65)->after('name');
			$table->string('user_login', 60)->unique()->after('email');
			$table->date('birthday')->nullable()->after('remember_token');
			$table->dateTime('last_login')->nullable()->after('birthday');
			$table->string('avatar', 255)->nullable()->after('last_login');
			$table->string('api_token', 60)->unique()->after('avatar');
			$table->tinyInteger('active')->default(1)->after('api_token');
			$table->string('user_role')->after('active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
