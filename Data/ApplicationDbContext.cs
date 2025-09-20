using Microsoft.EntityFrameworkCore;
using contacts_api.Models;

namespace contacts_api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data is handled in Program.cs to avoid migration conflicts
        }
    }
}
