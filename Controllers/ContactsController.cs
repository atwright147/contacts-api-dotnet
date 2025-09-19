using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using contacts_api.Data;
using contacts_api.Models;

namespace contacts_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController(ApplicationDbContext context) : ControllerBase
    {
      // GET: api/Contacts
    [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return await context.Contacts.ToListAsync();
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactWithFullName>> GetContact(int id)
        {
            var contact = await context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            var contactWithFullname = new ContactWithFullName
            {
                Id = contact.Id,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                FullName = $"{contact.FirstName} {contact.LastName}"
            };

            return contactWithFullname;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            context.Entry(contact).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
            }

            return NoContent();
        }

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            context.Contacts.Add(contact);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            context.Contacts.Remove(contact);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return context.Contacts.Any(e => e.Id == id);
        }
    }
}
