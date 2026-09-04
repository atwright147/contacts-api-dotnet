using Bogus;
using contacts_api.Data;
using contacts_api.Models;
using Microsoft.EntityFrameworkCore;

namespace contacts_api.Services
{
  public class DatabaseSeeder(ApplicationDbContext context)
  {
    private const int SeederRandomSeed = 20260423;
    private readonly ApplicationDbContext _context = context;

    public async Task SeedAsync()
    {
      // Seed data if the table is empty
      if (!await _context.Contacts.AnyAsync())
      {
        var contactFaker = new Faker<Contact>()
          .RuleFor(u => u.FirstName, (f) => f.Name.FirstName())
          .RuleFor(u => u.LastName, (f) => f.Name.LastName())
          .RuleFor(u => u.Email, (f, u) => f.Internet.Email(u.FirstName, u.LastName))
          .RuleFor(u => u.DateOfBirth, (f) => DateOnly.FromDateTime(f.Date.Past(80, DateTime.Now.AddYears(-18))))
          .RuleFor(u => u.IsFavorite, (f) => f.Random.Bool());

        var addressFaker = new Faker<Address>()
          .RuleFor(a => a.Line1, (f) => f.Address.StreetAddress())
          .RuleFor(a => a.Line2, (f) => f.Random.Bool() ? f.Address.SecondaryAddress() : null)
          .RuleFor(a => a.City, (f) => f.Address.City())
          .RuleFor(a => a.State, (f) => f.Address.State())
          .RuleFor(a => a.PostalCode, (f) => f.Address.ZipCode())
          .RuleFor(a => a.Country, (f) => f.Address.Country());

        var phoneNumberFaker = new Faker<PhoneNumber>()
          .RuleFor(p => p.Number, (f) => f.Phone.PhoneNumber())
          .RuleFor(p => p.Type, (f) => f.PickRandom("Mobile", "Home", "Work"));

        var random = new Random(SeederRandomSeed);

        // 3. Generate individual items in the loop
        for (int i = 0; i < 100; i++)
        {
          Contact fakeContact = contactFaker.Generate();

          var addresses = addressFaker.Generate(random.Next(1, 4));
          foreach (var address in addresses)
          {
            fakeContact.Addresses.Add(address);
          }

          var phoneNumbers = phoneNumberFaker.Generate(random.Next(1, 4));
          foreach (var phoneNumber in phoneNumbers)
          {
            fakeContact.PhoneNumbers.Add(phoneNumber);
          }

          _context.Contacts.Add(fakeContact);
        }

        await _context.SaveChangesAsync();
      }

      // Ensure primary IDs point to children belonging to the same contact.
      var persistedContacts = await _context.Contacts
        .Include(c => c.Addresses)
        .Include(c => c.PhoneNumbers)
        .ToListAsync();

      var hasChanges = false;

      foreach (var contact in persistedContacts)
      {
        var primaryAddressId = contact.Addresses
          .OrderBy(a => a.Id)
          .Select(a => a.Id)
          .FirstOrDefault();

        var primaryPhoneNumberId = contact.PhoneNumbers
          .OrderBy(p => p.Id)
          .Select(p => p.Id)
          .FirstOrDefault();

        var hasValidPrimaryAddress = primaryAddressId != 0 && contact.Addresses.Any(a => a.Id == contact.PrimaryAddressId);
        var hasValidPrimaryPhone = primaryPhoneNumberId != 0 && contact.PhoneNumbers.Any(p => p.Id == contact.PrimaryPhoneNumberId);

        if (!hasValidPrimaryAddress && primaryAddressId != 0)
        {
          contact.PrimaryAddressId = primaryAddressId;
          hasChanges = true;
        }

        if (!hasValidPrimaryPhone && primaryPhoneNumberId != 0)
        {
          contact.PrimaryPhoneNumberId = primaryPhoneNumberId;
          hasChanges = true;
        }
      }

      if (hasChanges)
      {
        await _context.SaveChangesAsync();
      }
    }
  }
}
