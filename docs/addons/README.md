# Introduction

Instead of using the `app` directory provided by a fresh Laravel installation, superV encourages  you to divide your application into special composer packages called `addons`. 

An addon can be a private composer package you have been developing or a public superv addon that is published as composer package.

Either when creating the addon or installing it through composer, superV locates the package in a special manner with the help of it's composer plugin package.

Knowing that all the addons are located in the `addons` directory which resides at your project root, superV follows this directory structure:

```
Project Root  
|
|-- addons
    |-- bazaar
       |-- modules
           |-- core
           |-- catalog
           |-- orders
       |-- panels
           |-- admin
           |-- web
           |-- user   
|-- app
|-- bootstrap
```

### Addon Types

- [Modules](./modules.md)
- [Panels](./panels.md)





 
 