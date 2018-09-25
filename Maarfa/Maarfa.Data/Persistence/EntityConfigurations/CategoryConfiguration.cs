using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Persistence.EntityConfigurations
{
    class CategoryConfiguration : EntityTypeConfiguration<Category>
    {
        public CategoryConfiguration()
        {
            Property(u => u.Name)
               .HasMaxLength(50);
        }
     
    }
}
