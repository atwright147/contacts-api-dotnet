namespace contacts_api.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
    }

    public class ContactWithFullName : Contact
    {
        public string FullName { get; set; } = string.Empty;
    }
}
