using contacts_api.Data;
using contacts_api.Models;
using Microsoft.EntityFrameworkCore;

namespace contacts_api.Services
{
  public class DatabaseSeeder
  {
    private readonly ApplicationDbContext _context;

    public DatabaseSeeder(ApplicationDbContext context)
    {
      _context = context;
    }

    public async Task SeedAsync()
    {
      // Seed data if the table is empty
      if (!await _context.Contacts.AnyAsync())
      {
        var contacts = new List<Contact>
        {
          new Contact
          {
            FirstName = "John",
            LastName = "Doe",
            Email = "john.doe@example.com",
            Addresses = new List<Address>
            {
              new Address
              {
                Line1 = "123 Main St",
                City = "Austin",
                State = "TX",
                PostalCode = "78701",
                Country = "USA"
              }
            },
            PhoneNumbers = new List<PhoneNumber>
            {
              new PhoneNumber
              {
                Number = "+1-512-555-0101",
                Type = "mobile"
              }
            }
          },
          new Contact
          {
            FirstName = "Jane",
            LastName = "Smith",
            Email = "jane.smith@example.com",
            Addresses = new List<Address>
            {
              new Address
              {
                Line1 = "456 Oak Ave",
                Line2 = "Apt 2C",
                City = "Dallas",
                State = "TX",
                PostalCode = "75201",
                Country = "USA"
              }
            },
            PhoneNumbers = new List<PhoneNumber>
            {
              new PhoneNumber
              {
                Number = "+1-214-555-0102",
                Type = "home"
              }
            }
          },
          new Contact
          {
            FirstName = "Bob",
            LastName = "Johnson",
            Email = "bob.johnson@example.com",
            Addresses = new List<Address>
            {
              new Address
              {
                Line1 = "789 Pine Rd",
                City = "Houston",
                State = "TX",
                PostalCode = "77002",
                Country = "USA"
              }
            },
            PhoneNumbers = new List<PhoneNumber>
            {
              new PhoneNumber
              {
                Number = "+1-713-555-0103",
                Type = "work"
              }
            }
          },
          new Contact
          {
            FirstName = "Alice",
            LastName = "Williams",
            Email = "alice.williams@example.com",
            Addresses = new List<Address>
            {
              new Address
              {
                Line1 = "321 Cedar Blvd",
                City = "San Antonio",
                State = "TX",
                PostalCode = "78205",
                Country = "USA"
              }
            },
            PhoneNumbers = new List<PhoneNumber>
            {
              new PhoneNumber
              {
                Number = "+1-210-555-0104",
                Type = "mobile"
              }
            }
          },
          new Contact
          {
            FirstName = "Charlie",
            LastName = "Brown",
            Email = "charlie.brown@example.com",
            Addresses = new List<Address>
            {
              new Address
              {
                Line1 = "654 Birch Ln",
                City = "Fort Worth",
                State = "TX",
                PostalCode = "76102",
                Country = "USA"
              }
            },
            PhoneNumbers = new List<PhoneNumber>
            {
              new PhoneNumber
              {
                Number = "+1-817-555-0105",
                Type = "home"
              }
            }
          }
        };

        await _context.Contacts.AddRangeAsync(contacts);
        await _context.SaveChangesAsync();
      }
    }
  }
}
