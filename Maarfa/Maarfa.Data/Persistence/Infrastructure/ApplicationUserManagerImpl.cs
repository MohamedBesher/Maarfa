using Maarfa.Data.Core.Models;
using Maarfa.Data.Persistence.Providers;
using Saned.Maarfa.Data.Persistence.Infrastructure;

namespace Maarfa.Data.Persistence.Infrastructure
{
    public class ApplicationUserManagerImpl : ApplicationUserManager<ApplicationUser>
    {
        public ApplicationUserManagerImpl() : base(new ApplicationUserStoreImpl())
        {
            this.UserTokenProvider = new ApplicationTokenProvider<ApplicationUser>();

        }

        
    }
}