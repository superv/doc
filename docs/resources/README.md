# Resources

- [Introduction](#introduction)
- [Creating Resources](#creating-resources)
- [Resource Configuration](#resource-configuration)
- [Customization & Hooks](#customization)

## Introduction

Resources are the gateways to your database structures allowing you to administer entries through the frontend admin panel.

Unlike other admin panels out in the wild, superV does not generate any files for resources nor does not require you to do so.

Instead, it extends Laravel migrations and does all the magic inside.


## Creating Resources

Since every resource has a corresponding database table, superV gathers resource information with the migration. So let's go ahead and create the migration file for our `Products` resource for our database table `catalog_products`:

```bash
php artisan addon:migration
```

Select Create for the migration type:
```bash
 Will we create a table or update one? [Create]:
  [0] Create
  [1] Update
```

superV will list you the installed addon names, select `catalog` module which would be the module we had created and installed previously, and enter `catalog_products` for the database table name.

This should create the `YYYY_MM_DD_HHiiss_create_catalog_products_table` migration file in the directory `addons/bazaar/modules/database/migrations`.

Let's take a look at the generated migration and how it differs from a usual migration file:
```php
<?php

use SuperV\Platform\Domains\Database\Schema\Blueprint;
use SuperV\Platform\Domains\Resource\ResourceConfig as Config;
use SuperV\Platform\Domains\Database\Migrations\Migration;

class CreateCatalogProductsTable extends Migration
{
    public function up()
    {
        $this->create('catalog_products',
            function (Blueprint $table, Config $config) {
                // $config->identifier('');
                // $config->label('');
                // $config->nav('');
                // $config->resourceKey('');

                $table->increments('id');

                $table->createdBy();
                $table->updatedBy();
            });
    }

    public function down()
    {
        $this->dropIfExists('catalog_products');
    }
}

```

You can see that we are using `Blueprint` and `Schema` from superV Platform instead of Laravel. This allows us to intervene database operations so that we can build our resource with the collected data.
 
 ```php
use SuperV\Platform\Domains\Database\Schema\Blueprint;
use SuperV\Platform\Domains\Database\Migrations\Migration;
```

And notice the ResourceConfig object is passed into migration callback, so that we can configure our resource.

Here we are setting resource label as `Products` and we tell superV that we want to add a navigation link to sidebar (belonging to panel `acp` and under the section `catalog`): 
```php
 function (Blueprint $table, Config $config) {
        $config->label('Products');
        $config->nav('acp.catalog');
``` 

superV adds many helper methods to `Blueprint $table` in order to finalize everything in the migration for simple Models. For instance you can add the following line to create a string type database column, so that superV maps string to TextField and creates the field for you:

```php
$table->string('title');
```

superV also extends the returning ColumnDefinition class which comes from Laravel foundation, and adds more features to configure the field to be generated. Here are some examples:

We can use this field as the Entry Label to be used in places such as dropdown menus, messages etc:
```php
$table->string('title')->entryLabel();
```

We can even add validations to be performed while the related entry is created or updated.
```php
$table->string('title')->rules(['min:3', 'max:100']);
```

Here we can add a searchable flag for this field. So it can be searchable through the Resource Dashboard.
```php
$table->string('title')->searchable();
```

Multiple searchable columns supported as well:
```php
$table->string('title')->searchable();
$table->string('description')->searchable();
```

Let's add a Select field for product status:
```php
$table->select('status')->options(['active', 'pending'])->default('pending');
```

Field types either support `searchable` feature or you can mark them as filter, so a filter is generated from them:
```php
$table->select('status')->options(['active', 'pending'])->default('pending')->addFlag('filter');
```

<div class="alert alert--info">
While resource and field creation is only supported through migrations, you can make all the necessary configuration through Resource Hooks. <a href="/hooks">Read more about Hooks here</a>
</div>

You can find the helpers list and the column-field mappings in [Migrations](#migrations) section. 


For the sake of the sample, here are two helpers used to not only adding for adding 4 columns (`created_at`, `created_by_id` and `updated_at`, `updated_by_id` respectively) but also for adding two BelongsTo relation `created_by` and `updated_by`. superV would update this columns automatically when an entry is created or updated.

```php
 $table->createdBy();
 $table->updatedBy();
```


## Resource Configuration



## Migrations


### Column-Field Type Mappings

### Field Helpers

### Relation Helpers







