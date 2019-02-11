<?php

namespace Cerberusworks\Cwcms\Traits;

trait SeedableTrait
{
    public function seed($class)
    {
        if (!class_exists($class)) {
            require_once $this->seedersPath.$class.'.php';
        }

        with(new $class())->run();
    }
}