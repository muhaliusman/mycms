<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenuItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_items', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('label');
			$table->string('link', 255)->nullable();
			$table->integer('term_Id')->nullable()->comment('Relation to other model');
			$table->string('term_title', 255)->nullable()->comment('Relation to other model');
			$table->integer('depth')->default(0);
			$table->integer('order')->default(0);
			$table->integer('parent')->unsigned()->nullable();
			$table->string('type', 50)->default('custome');
			$table->integer('menu_Id')->unsigned();
			$table->string('locale', 3)->nullable();
			$table->boolean('show')->default(0)->comment('Show for frontend');
			$table->foreign('menu_Id')->references('menuId')->on('menus')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_items');
    }
}
