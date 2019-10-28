# Configuration

<div class="alert alert--info">
Following configuration items will be done by the superv:install command if possible.
</div>

### Configure composer.json for the Merge Plugin
superV uses Wikimedi Composer Plugin to merge addon composer settings into the main composer.json file automatically. 

Add the following to `extra` section in your project's `composer.json` file:
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


### Create a full privileged User
superV uses the main `users` table for authentication. But for authorization it has its own roles and actions. You can still use the existing users by granting them the `user` role which is needed to use the default Port that is connected to main Admin Panel.

You can use this command to create a new user

```bash
php artisan superv:user "Root User" root@superv.io --password=secret
```


### Create the Addons directory
Composer packages for the superV addons are located in a special folder called `addons` instead of the default vendor directory. [Learn more about addons](/concepts/Addons.md)

Create the addons directory, and make it writable:
```bash
mkdir addons
chmod -Rf 777 addons
echo 'superv/*' > addons/.gitignore
```
