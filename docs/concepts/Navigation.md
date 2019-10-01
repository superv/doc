# Navigation

Navigation system can provide menus to frontend application through API. 
Menus consist of different namespaces holding child sections.

Namespaces and Sections can be created on database or can be added during runtime.

All navigations have a unique identifier, and belong to a Port. Default navigation included in the system has the identifier `acp` and belongs to ApiPort.

### Creating Sections in Migrations
In migration files you can use `ResourceConfig` to create a section for the resource that's been created. Section url will be automatically by the platform pointing resources index spa-page.

You should provide full namespace of the section with dot notation: `navigation_slug.namespace` or `navigation_slug.namespace.section`

```
    function (Blueprint $table, ResourceConfig $config) {
        $config->nav('acp.supreme');
    }
```

or 

```
    function (Blueprint $table, ResourceConfig $config) {
        $config->nav('acp.supreme.settings');
    }
```

If you want to point the resource index to a custom spa-pag, you can do it so by using array notation:


```
    function (Blueprint $table, ResourceConfig $config) {
        $config->nav([
            'parent' => 'acp.settings.auth',
            'title'  => 'System Users',
            'handle' => 'users',
            'icon'   => 'user',
        ]);
    }
```


### Adding Sections during runtime
If you want to add a section during runtime you can hook on to navigation events. But this time you should provide the url parameter

```
    Nav::building('acp.supreme', function (Payload $payload) {
        $payload->push('sections', [
            'title'    => 'Servers',
            'handle'   => 'servers',
            'url'    => 'foo-section',
        ]);
    });
```