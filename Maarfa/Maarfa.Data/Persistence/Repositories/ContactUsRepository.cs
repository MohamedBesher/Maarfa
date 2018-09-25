using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;
using Maarfa.Data.Core.Repositories;


namespace Maarfa.Data.Persistence.Repositories
{
    class ContactUsRepository: IContactUsRepository
    {
        private readonly ApplicationDbContext _context;

        public ContactUsRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ContactUs> GetContacts()
        {
            return await  _context
                    .ContactUses
                    .SingleOrDefaultAsync();
        }
    }
}
