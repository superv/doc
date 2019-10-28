# Installation

superV requires Laravel 5.7+ or 6.0 and PHP 7.2.0+

  
### Install a package to an existing project

Pull in the superV platform package:
```bash
composer require superv/platform 0.20.x-dev
```

Run the installer
```bash
php artisan superv:install
```

Installer will try to complete the following configurations for you:
- [Configure composer.json for the Merge Plugin](./Configuration.html#configure-composer-json-for-the-merge-plugin)
- [Create a full privileged User](./Configuration.html#create-a-full-privileged-user)
- [Create the Addons directory](./Configuration.html#create-the-addons-directory)


Pull the Admin Panel SPA addon:
```bash
composer require superv/acp 0.20.x-dev
```

And install the addon to enable it:
```bash
php artisan addon:install addons/superv/drops/acp
```


You can now navigate to `http://your-base-hostname/superv` using your browser and login with the user credentials you created during the installation process.


### Install as a new project

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


And install superV:
```bash
php artisan superv:install
```

You can now navigate to `http://your-base-hostname/superv` using your browser and login with the user credentials you created during the installation process.
