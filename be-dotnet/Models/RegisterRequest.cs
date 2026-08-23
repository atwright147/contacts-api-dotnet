namespace contacts_api.Models
{
  public record RegisterRequest(string FirstName, string LastName, string Email, string Password);
}
