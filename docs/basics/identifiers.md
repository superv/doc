# Identifiers

superV uses unique dot notation identifiers for objects. Combined with the unique Addon identifier, it allows the platform to locate desired object with string literals such as: `{addon}.{resource}.{object}:{id}`

Let's say we have created the `catalog` module, and the `products` resource.
Products Resource identifier would be `catalog.products`. 

You can programmatically call the resource if you need to:
```php
$resource = ResourceFactory::make('catalog.products');
```

Identifiers are mainly used to hook on Resources and Resource Child Objects

Here are identifier examples for Resource Child Objects

- Fields: `catalog.products.fields:title`
- Forms: `catalog.products.forms:default`
- Lists (Tables): `catalog.products.lists:default`
- Pages: `catalog.products.pages:dashboard`
- Events: `catalog.products.event:query_resolved`


<div class="alert alert--info">
Multiple forms and lists can be used for a resource (currently under development). Thus we need to use the object id `default` ones such as `forms:default`
</div>
