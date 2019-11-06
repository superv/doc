# Installation

### Requirements
superV has the following requirments:
 
- Laravel 5.8+ or 6.*
- PHP 7.2.0+
- NPM (If you are willing to customize the frontend)

  
### Install as a Composer Package

Pull in the latest superV Platform package:
```bash
composer require superv/platform
```

Run the installer
```bash
php artisan superv:install
```

Installer will try to complete the following configurations for you:
- [Configure composer.json for the Merge Plugin](./configuration.html#configure-composer-json-for-the-merge-plugin)
- [Create a full privileged User](./configuration.html#create-a-full-privileged-user)
- [Create the Addons directory](./configuration.html#create-the-addons-directory)


Install the composer package for Admin Panel addon:
```bash
composer require superv/admin-panel
```

Install the Admin Panel
```bash
php artisan addon:install superv.panels.admin
```


You can now navigate to `http://your-base-hostname/admin` using your browser and login with the user credentials you created during the installation process.


### Install as a Fresh Project

Create project with composer in your terminal:
```bash
composer create-project superv/superv-project 
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

And install superV
```bash
php artisan superv:install
```

Install the Admin Panel
```bash
php artisan addon:install superv.panels.admin
```


You can now navigate to `http://your-base-hostname/admin` using your browser and login with the user credentials you created during the installation process.


