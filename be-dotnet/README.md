# Contacts API (.net)

## Run

```sh
dotnet restore
dotnet run --project contacts-api.csproj
```

Once it starts, look for a line like:
Now listening on: http://localhost:xxxx or https://localhost:xxxx

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
dotnet aspnet-codegenerator controller -name ContactsController -async -api -m Contact -dc ApplicationDbContext -outDir Controllers
```

## Migrations

### Generate

```sh
dotnet ef migrations add {NameOfMigration}
```

### Apply

```sh
dotnet ef database update
```

## Useful docs

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-9.0&tabs=visual-studio-code
- https://formulae.brew.sh/cask/dotnet-sdk
- https://kenslearningcurve.com/tutorials/using-sqlite-with-entity-framework-core-in-c/
