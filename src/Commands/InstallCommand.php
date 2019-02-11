<?php

namespace Cerberusworks\Cwcms\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Process\Process;
use Cerberusworks\Cwcms\CwcmsServiceProvider;
use Cerberusworks\Cwcms\Traits\SeedableTrait;

class InstallCommand extends Command
{
    use SeedableTrait;

    protected $seedersPath = __DIR__.'/../../database/seeds/';

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
     * Get the composer command for the environment.
     *
     * @return string
     */
    protected function findComposer()
    {
        if (file_exists(getcwd().'/composer.phar')) {
            return '"'.PHP_BINARY.'" '.getcwd().'/composer.phar';
        }

        return 'composer';
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

        $this->info('Migrating tables');
        $this->call('migrate');

        if ($this->option('with-dummy')) {
            $tags = ['cwcms_seeders'];

            $this->call('vendor:publish', ['--provider' => CwcmsServiceProvider::class, '--tag' => $tags]);

            $composer = $this->findComposer();
            $this->info('Dump autoload');
            $process = new Process($composer.' dump-autoload');

            $this->info('Seeding dummy data');
            $this->seed('CwmsDatabaseSeeder');
        }

        $this->info('Cwcms successfully installed');
    }
}
