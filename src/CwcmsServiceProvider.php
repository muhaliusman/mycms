<?php

namespace Cerberusworks\Cwcms;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class CwcmsServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        // $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'cerberusworks');
        // $this->loadViewsFrom(__DIR__.'/../resources/views', 'cerberusworks');
        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        // $this->loadRoutesFrom(__DIR__.'/routes.php');

        // Publishing is only necessary when using the CLI.
        if ($this->app->runningInConsole()) {
            $this->bootForConsole();
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/cwcms.php', 'cwcms');

        // Register the service the package provides.
        $this->app->singleton('cwcms', function ($app) {
            return new Cwcms;
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['cwcms'];
    }

    /**
     * Console-specific booting.
     *
     * @return void
     */
    protected function bootForConsole()
    {
        // Publishing the configuration file.
        $this->publishes([
            __DIR__.'/../config/cwcms.php' => config_path('cwcms.php'),
        ], 'cwcms_config');

        // Publishing assets.
        $this->publishes([
            __DIR__.'/../assets' => public_path('vendor/cerberusworks'),
        ], 'cwcms_assets');

        // Publishing storage.
        $this->publishes([
            __DIR__.'/../storage' => storage_path('app/public'),
        ], 'cwcms_storage');

        // Publishing seeder.
        $this->publishes([
            __DIR__.'/../database/seeds' => database_path('seeds'),
        ], 'cwcms_seeders');

        // Registering package commands.
        $this->commands([Commands\InstallCommand::Class]);
    }
}
