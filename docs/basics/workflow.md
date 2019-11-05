# Development Workflow

While working with superV this development workflow could be guiding:

- Create a Module
- Create a migration for the module
- In the migration create the necessary fields and relations.
- Run the migration and resource data is created in the database. (no files generated)
- Refresh migrations until you are satisfied with the database schema.
- If you want to customize further, use Resource Hooks by creating Hooks that can customize Resource, List, Forms and other resource related things.
