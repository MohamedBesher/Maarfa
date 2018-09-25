using System.Data.Entity.ModelConfiguration;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Persistence.EntityConfigurations
{
    public class ClientConfigurations : EntityTypeConfiguration<Client>
    {
        public ClientConfigurations()
        {
            Property(u => u.Secret).
                IsRequired();

            Property(u => u.Name).
                IsRequired()
                .HasMaxLength(100);


            Property(u => u.AllowedOrigin).HasMaxLength(100);
        }
    }
}