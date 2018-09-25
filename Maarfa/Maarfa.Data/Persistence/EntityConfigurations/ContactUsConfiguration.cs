using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Persistence.EntityConfigurations
{
    class ContactUsConfiguration :EntityTypeConfiguration<ContactUs>
    {
        public ContactUsConfiguration()
        {
            Property(u => u.Email)
            .HasMaxLength(200);

            Property(u => u.Phone)
           .HasMaxLength(20);



        }
    }
}
