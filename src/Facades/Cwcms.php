<?php

namespace Cerberusworks\Cwcms\Facades;

use Illuminate\Support\Facades\Facade;

class Cwcms extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'cwcms';
    }
}
