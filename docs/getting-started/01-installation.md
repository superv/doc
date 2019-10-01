# Installation

superV requires Laravel 5.7+ or 6.0 and PHP 7.2.0+

## Fresh project
Create project with composer in your terminal:
```bash
composer create-project superv/superv-project 0.20.x-dev@dev
```

Your web server should point to project's `public` folder for your hostname (eg: `superv.test`). Just as it would in a normal Laravel application.

Required directory permissions are also same with a normal laravel application with one exception, which is the `addons` folder. So make sure this folder is writable by your web server too.

Next, create a database and add your credentials to your `.env` file:

```text
DB_HOST=localhost
DB_DATABASE=superv
DB_USERNAME=superv
DB_PASSWORD=secret
```

superV needs to know the base hostname for registering ports and routes ([click here for more information on ports](./concepts/Ports.html)), so while there, make sure that your hostname is correct.

```text
SV_HOSTNAME=superv.test
```

Generate your JWT token:
```bash
php artisan jwt:secret
```

And install superV:
```bash
php artisan superv:install
```

Make sure you create a full access user for base admin panel with the installer. If you skipped it somehow, you can use this command any time later:
```bash
php artisan superv:user "Root User" root@superv.io --password=secret
```


Navigate to `http://superv.test/superv` using your browser and login with the credentials you entered in previous step.

  
## Existing project
Install superV Platform package:
```bash
composer require superv/platform 0.20.x-dev
```


Add composer merge plugin configuration under the `extra` key in your `composer.json` file:
```json
    {
        "extra": {
            "merge-plugin": {
                "include": [
                    "addons/*/*/*/composer.json"
                ],
                "recurse": true,
                "replace": false
            }
        }
    }
```

<div class="alert alert--info">
Composer packages for the superV addons are located in a special folder called `addons` instead of the default vendor directory.
</div>

Create the addons directory, and make it writable:
```bash
mkdir addons
chmod -Rf 777 addons
echo 'superv/*' > addons/.gitignore
```


Add base hostname to your `.env` file:
```bash
SV_HOSTNAME=superv.test
```
 
Install superV
```bash
php artisan superv:install
```

Pull the Admin Panel SPA package:
```bash
composer require superv/acp 0.20.x-dev
```

And install the SPA addon:

```bash
php artisan addon:install addons/superv/drops/acp
```



Make sure you create a full access user for base admin panel with the installer. If you skipped it somehow, you can use this command any time later:
```bash
php artisan superv:user "Root User" root@superv.io --password=secret
```


Navigate to `http://superv.test/superv` using your browser and login with the credentials you entered in previous step.

