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
                        Email = "john.doe@example.com"
                    },
                    new Contact
                    {
                        FirstName = "Jane",
                        LastName = "Smith",
                        Email = "jane.smith@example.com"
                    },
                    new Contact
                    {
                        FirstName = "Bob",
                        LastName = "Johnson",
                        Email = "bob.johnson@example.com"
                    },
                    new Contact
                    {
                        FirstName = "Alice",
                        LastName = "Williams",
                        Email = "alice.williams@example.com"
                    },
                    new Contact
                    {
                        FirstName = "Charlie",
                        LastName = "Brown",
                        Email = "charlie.brown@example.com"
                    }
                };

                await _context.Contacts.AddRangeAsync(contacts);
                await _context.SaveChangesAsync();
            }
        }
    }
}
