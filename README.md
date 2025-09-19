# Contacts API (.net)

## .gitignore

```sh
dotnet new gitignore
```

## Add a Package

```sh
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

## Generate a Controller

```sh
❯ dotnet aspnet-codegenerator controller -name ContactsController -async -api -m Contact -dc ApplicationDbContext -outDir Controllers
```

## Useful docs

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code
- https://formulae.brew.sh/cask/dotnet-sdk
- https://kenslearningcurve.com/tutorials/using-sqlite-with-entity-framework-core-in-c/
