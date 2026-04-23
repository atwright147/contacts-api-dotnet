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
    public DbSet<Address> Addresses { get; set; }
    public DbSet<PhoneNumber> PhoneNumbers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Contact>()
        .HasMany(c => c.Addresses)
        .WithOne()
        .HasForeignKey(a => a.ContactId)
        .OnDelete(DeleteBehavior.Cascade);

      modelBuilder.Entity<Contact>()
        .HasMany(c => c.PhoneNumbers)
        .WithOne()
        .HasForeignKey(t => t.ContactId)
        .OnDelete(DeleteBehavior.Cascade);

      // Seed data is handled in Program.cs to avoid migration conflicts
    }
  }
}
