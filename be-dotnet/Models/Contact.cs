using System.Text.Json.Serialization;

namespace contacts_api.Models
{
  public class Contact
  {
    public int Id { get; set; }
    public required string FirstName { get; set; } = string.Empty;
    public required string LastName { get; set; } = string.Empty;
    public required string Email { get; set; } = string.Empty;
    public DateOnly? DateOfBirth { get; set; }
    public bool IsFavorite { get; set; } = false;
    [JsonIgnore]
    public int PrimaryAddressId { get; set; }
    [JsonIgnore]
    public int PrimaryPhoneNumberId { get; set; }
    [JsonIgnore]
    public ICollection<Address> Addresses { get; set; } = [];
    [JsonIgnore]
    public ICollection<PhoneNumber> PhoneNumbers { get; set; } = [];
  }

  public class Address
  {
    public int Id { get; set; }
    public required string Line1 { get; set; } = string.Empty;
    public string? Line2 { get; set; } = string.Empty;
    public required string City { get; set; } = string.Empty;
    public required string State { get; set; } = string.Empty;
    public required string PostalCode { get; set; } = string.Empty;
    public required string Country { get; set; } = string.Empty;
    public int ContactId { get; set; }
  }

  public class PhoneNumber
  {
    public int Id { get; set; }
    public required string Number { get; set; } = string.Empty;
    public string? Type { get; set; } = string.Empty;
    public int ContactId { get; set; }
  }

  public class ContactWithFullName : Contact
  {
    public string FullName { get; set; } = string.Empty;
    [JsonIgnore(Condition = JsonIgnoreCondition.Never)]
    public new int PrimaryAddressId { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.Never)]
    public new int PrimaryPhoneNumberId { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.Never)]
    public new ICollection<Address> Addresses { get; set; } = [];
    [JsonIgnore(Condition = JsonIgnoreCondition.Never)]
    public new ICollection<PhoneNumber> PhoneNumbers { get; set; } = [];
  }
}
