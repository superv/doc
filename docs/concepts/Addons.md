# Addons



### Addon Types
Different types of addons have different features. Valid addon types are:
- Module
- Drop
- Tool
- Theme
- Agent

For now we will use the type `module` which is most inclusive addon type.
 
### Creating an addon
Let's create a sample addon of type `module` to demonstrate the key features mentioned above. We will be creating a CRM module for our company ACME:
```bash
php artisan make:addon acme.crm
```


You can now find the created module files in `addons/acme/modules/crm` directory.

### Installing 
Before using your addon, you must install it first. 

```bash
php artisan addon:install acme crm --type=module
```

This will assume your addon is located at `addons/acme/modules/crm` (Note the format: `addons/{vendor}/{type-plural}/{package}`)
If your addon is located somewhere else you can override path with:
```bash
php artisan addon:install acme crm --type=module --path=some/other/location
```

By default unique identifier for the installed addon will be `acme.modules.crm` `({vendor}.{type-plural}.{package})`
If your application does not need a lengthy identifier like this, you can override this with specifying the unique identifier yourself:

```bash
php artisan addon:install acme crm --type=module --identifier=acme.crm
```


Installer would run the migrations located in your addon's `database/migrations` folder if any.

While developing an addon, you can use `addon:reinstall` command to uninstall and install again. And also `addon:uninstall` to uninstall it. 

<div class="alert alert--danger">
‼ Note that, uninstalling an addon rollbacks all it's migrations, thus would drop related database tables.
</div>
