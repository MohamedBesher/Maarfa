using System.Data.Entity.ModelConfiguration;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Persistence.EntityConfigurations
{
    public class ApplicationUserConfigurations : EntityTypeConfiguration<ApplicationUser>
    {
        public ApplicationUserConfigurations()
        {
            Property(u => u.Name).
                HasMaxLength(150);
        }
    }
}