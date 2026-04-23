using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using contacts_api.Data;
using contacts_api.Models;

namespace contacts_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AddressesController(ApplicationDbContext context) : ControllerBase
  {
    // GET: api/Addresses
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
    {
      return await context.Addresses.ToListAsync();
    }

    // GET: api/Addresses/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Address>> GetAddress(int id)
    {
      var address = await context.Addresses.FindAsync(id);

      if (address == null)
      {
        return NotFound();
      }

      return address;
    }

    // GET: api/Addresses/by-contact/3
    [HttpGet("by-contact/{contactId}")]
    public async Task<ActionResult<IEnumerable<Address>>> GetAddressesByContact(int contactId)
    {
      if (!await ContactExists(contactId))
      {
        return NotFound($"Contact with id {contactId} was not found.");
      }

      var addresses = await context.Addresses
        .Where(a => a.ContactId == contactId)
        .ToListAsync();

      return addresses;
    }

    // PUT: api/Addresses/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAddress(int id, Address address)
    {
      if (id != address.Id)
      {
        return BadRequest();
      }

      if (!await ContactExists(address.ContactId))
      {
        return BadRequest($"Contact with id {address.ContactId} does not exist.");
      }

      var existingAddress = await context.Addresses.FindAsync(id);
      if (existingAddress == null)
      {
        return NotFound();
      }

      existingAddress.Line1 = address.Line1;
      existingAddress.Line2 = address.Line2;
      existingAddress.City = address.City;
      existingAddress.State = address.State;
      existingAddress.PostalCode = address.PostalCode;
      existingAddress.Country = address.Country;
      existingAddress.ContactId = address.ContactId;

      try
      {
        await context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!AddressExists(id))
        {
          return NotFound();
        }
      }

      return NoContent();
    }

    // POST: api/Addresses
    [HttpPost]
    public async Task<ActionResult<Address>> PostAddress(Address address)
    {
      if (!await ContactExists(address.ContactId))
      {
        return BadRequest($"Contact with id {address.ContactId} does not exist.");
      }

      context.Addresses.Add(address);
      await context.SaveChangesAsync();

      return CreatedAtAction("GetAddress", new { id = address.Id }, address);
    }

    // DELETE: api/Addresses/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAddress(int id)
    {
      var address = await context.Addresses.FindAsync(id);
      if (address == null)
      {
        return NotFound();
      }

      context.Addresses.Remove(address);
      await context.SaveChangesAsync();

      return NoContent();
    }

    private bool AddressExists(int id)
    {
      return context.Addresses.Any(e => e.Id == id);
    }

    private Task<bool> ContactExists(int id)
    {
      return context.Contacts.AnyAsync(c => c.Id == id);
    }
  }
}
