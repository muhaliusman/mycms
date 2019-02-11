<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::create('options', function (Blueprint $table) {
			$table->bigIncrements('optionId');
			$table->string('name');
			$table->text('value');
			$table->string('locale', 3)->nullable();
			$table->string('autoload', 5)->default('no'); // value betwen yes or no
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('options');
    }
}