using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Persistence.EntityConfigurations
{
    class VideoConfiguration : EntityTypeConfiguration<Video>
    {
        public VideoConfiguration()
        {
            Property(u => u.Name)
              .HasMaxLength(50);

            Property(u => u.Image)
             .HasMaxLength(1000);

            Property(u => u.Embed)
             .HasMaxLength(1000);

            Property(g => g.CategoryId)
            .IsRequired();

            Property(g => g.CreatedDate)
         .IsRequired();

         

            Property(u => u.Link)
             .HasMaxLength(1000);
        }
    }
}
