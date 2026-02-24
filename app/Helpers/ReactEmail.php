<?php

namespace App\Helpers;

class ReactEmail
{
    public static function render(string $templateName, array $props = [])
    {
        $propsJson = json_encode($props);
        $script = resource_path("emails/render-email.js");

        $cmd = "node $script $templateName '$propsJson' 2>&1";

        return shell_exec($cmd); // Returns actual HTML now
    }
}
