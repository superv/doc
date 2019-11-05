# Hooks

While most of the configuration can be done in migrations for simple models, that's not always the case. Most of the time we need to tweak forms, lists, actions, filters, queries and etc. This is where the Hook Systems comes to the rescue.

Before diving in let's see how a Hook file looks like:
```php
<?php

namespace Bazaar\Modules\Catalog\Resources\Products;

use Bazaar\Modules\Catalog\Resources\AuthorFilter;
use Bazaar\Modules\Catalog\Resources\PublisherFilter;
use SuperV\Platform\Domains\Resource\Hook\Contracts\ResourceResolvedHook;
use SuperV\Platform\Domains\Resource\Resource;

class Products implements ResourceResolvedHook
{
    public static $identifier = 'catalog.products';

    public function resolved(Resource $resource)
    {
        $resource->searchable(['title']);
        $resource->getField('status')->copyToFilters();

        $resource->addFilter(AuthorFilter::make());
        $resource->addFilter(PublisherFilter::make());
    }
}
```

## Registering Hooks
By default, all hooks in `src/Resources` directory of your module are registered when your module is booted. 
You can name your hooks as you wish and place them anywhere under this directory. 

However you are required to define the identifier as a property to match the object you want to hook. [Read more about the identifiers here](./basics/identifiers.html)
```php
    public static $identifier = 'catalog.products';
```


Let's look at a hook example from the superV code base which is used to hook on Users Resource Object:

```php
<?php

namespace SuperV\Platform\Resources\Users;

use SuperV\Platform\Domains\Resource\Hook\Contracts\ResourceResolvedHook;
use SuperV\Platform\Domains\Resource\Resource;

class UsersResource implements ResourceResolvedHook
{
    public static $identifier = 'platform.users';

    public function resolved(Resource $resource)
    {
        $resource->registerAction('update_password', UpdatePasswordAction::class);
        $resource->registerAction('impersonate', ImpersonateAction::class);

        $resource->getField('password')->addFlag('view.hide');
        $resource->getField('remember_token')->addFlag('view.hide');
    }
}
```

This hook will be triggered as soon as the actual resource object for users resource is created along with the platform. We are using this hook to register some actions to be displayed on Resource Entry Dashboard as well as hiding the `password` and `remember_token` fields in the Resource Entry View.



Available Hook Handlers:
- [Entry Observer Hook](#entry-observer-hook)
- [Resource Hook](#)
- [Form Hook](#)
- [List Hook](#)
- [Page Hook](#)

<div class="alert alert--info">
Note that you can use multiple hooks belonging to same hook handler in a single hook class.
</div>


## Entry Observer Hooks
Hooks on to entry events such as create, update, retrieve and delete.

Identifier example: `catalog.products`

Contracts:
-  [AfterCreatedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/AfterCreatedHook.php) 
-  [AfterDeletedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/AfterDeletedHook.php) 
-  [AfterRetrievedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/AfterRetrievedHook.php) 
-  [AfterSavedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/AfterSavedHook.php) 
-  [BeforeCreatingHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/BeforeCreatingHook.php) 
-  [BeforeSavingHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/BeforeSavingHook.php) 



## Resource Hooks
Hook on the actual Resource, ResourceConfig and the Query Builder object.

Identifier example: `catalog.products`. 

Contracts:
-  [ResourceResolvedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/ResourceResolvedHook.php) 
- [ConfigResolvedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/ConfigResolvedHook.php) 
- [QueryResolvedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/QueryResolvedHook.php) 

## Form Hooks
Hook on the Resource Forms before and after resolving and before validation.

Identifier example: `catalog.products.forms:default`. 

Contracts:
-  [FormResolvingHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/FormResolvingHook.php) 
-  [FormResolvedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/FormResolvedHook.php) 
-  [FormValidatingHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/FormValidatingHook.php) 


## List Hooks
Hook on the Resource Lists, List Data and the List Query objects.

Contracts:
-  [ListResolvedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/ListResolvedHook.php) 
-  [ListQueryResolvedHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/ListQueryResolvedHook.php) 
-  [ListDataHook](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/ListDataHook.php) 




## Scoping by Role
One of the great features of the Hook System is that, you can limit your Hook files to different Role scopes by implementing the [HookByRole](https://github.com/superv/platform/blob/master/src/Domains/Resource/Hook/Contracts/HookByRole.php) contract in your hooks. Here's an example for such a scoped Hook, we would only triggered if the current logged in user is a `dealer`

````php
<?php

namespace Bazaar\Modules\Core\Resources\Applications\Lists;

use Current;
use Illuminate\Database\Eloquent\Builder;
use SuperV\Platform\Domains\Resource\Hook\Contracts\HookByRole;
use SuperV\Platform\Domains\Resource\Hook\Contracts\ListQueryResolvedHook;
use SuperV\Platform\Domains\Resource\Hook\Contracts\ListResolvedHook;
use SuperV\Platform\Domains\Resource\Resource\IndexFields;
use SuperV\Platform\Domains\Resource\Table\Contracts\TableInterface;

class ListForDealers implements ListQueryResolvedHook, ListResolvedHook, HookByRole
{
    public static $identifier = 'viessmann.applications.lists:default';

    /**
     * Callback to process after the query object for list is resolved
     *
     * @param \Illuminate\Database\Eloquent\Builder                            $query
     * @param \SuperV\Platform\Domains\Resource\Table\Contracts\TableInterface $table
     */
    public function queryResolved($query, TableInterface $table)
    {
        $query->whereHas('assigned_dealer', function (Builder $query) {
            $query->where('user_id', Current::userId());
        });
    }

    public static function getRole(): string
    {
        return 'dealer';
    }

    public function resolved(TableInterface $table, IndexFields $fields)
    {
        $fields->hide('assigned_dealer');
        $table->notDeletable();
    }
}
````