namespace contacts_api.Models
{
  public class Contact
  {
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public ICollection<Address> Addresses { get; set; } = new List<Address>();
    public ICollection<TelephoneNumber> TelephoneNumbers { get; set; } = new List<TelephoneNumber>();
  }

  public class Address
  {
    public int Id { get; set; }
    public required string Line1 { get; set; }
    public string? Line2 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
    public int ContactId { get; set; }
  }

  public class TelephoneNumber
  {
    public int Id { get; set; }
    public required string Number { get; set; }
    public string? Type { get; set; }
    public int ContactId { get; set; }
  }

  public class ContactWithFullName : Contact
  {
    public string FullName { get; set; } = string.Empty;
  }
}
