namespace contacts_api.Models
{
  public record AuthResponse(string Id, string Email, IEnumerable<string> Roles, string Token, DateTime ExpiresAt);
}
