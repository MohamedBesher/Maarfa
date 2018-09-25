using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Persistence.EntityConfigurations
{
    class BookConfiguration : EntityTypeConfiguration<Book>
    {
        public BookConfiguration()
        {
            Property(u => u.Name)
              .HasMaxLength(50);

            Property(g => g.CategoryId)
               .IsRequired();

            Property(g => g.CreatedDate)
            .IsRequired();


           

            Property(u => u.Slogon)
             .HasMaxLength(1000);

            Property(u => u.Description)
             .HasMaxLength(1000);


            Property(u => u.Image)
             .HasMaxLength(1000);




        }
    }
}
