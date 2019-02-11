<?php

namespace Cerberusworks\Cwcms\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Process\Process;
use Cerberusworks\Cwcms\CwcmsServiceProvider;

class InstallCommand extends Command
{

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'cwcms:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configuration Cerberusworks CMS';

    protected function getOptions()
    {
        return [
            ['with-dummy', null, InputOption::VALUE_NONE, 'Install with dummy data', null],
        ];
    }

    public function fire(Filesystem $filesystem)
    {
        return $this->handle($filesystem);
    }

    /**
     * Execute the console command.
     *
     * @param \Illuminate\Filesystem\Filesystem $filesystem
     *
     * @return void
     */
    public function handle(Filesystem $filesystem)
    {
        $this->info('Install Cerberusworks CMS');

        $tags = ['cwcms_assets', 'cwcms_storage'];

        $this->call('vendor:publish', ['--provider' => CwcmsServiceProvider::class, '--tag' => $tags]);

        $this->info('Migrating dummy tables');
        $this->call('migrate');

        if ($this->option('with-dummy')) {
            $tags = ['cwcms_seeders'];

            $this->call('vendor:publish', ['--provider' => CwcmsServiceProvider::class, '--tag' => $tags]);

            $this->info('Seeding dummy data');
            $this->seed('CwmsDatabaseSeeder');
        }

        $this->info($successMessage);
    }
}
