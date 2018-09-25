using System;
using System.Data.Entity;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;
using Microsoft.AspNet.Identity.EntityFramework;


namespace Maarfa.Data.Persistence.Infrastructure
{
    public class ApplicationUserStore<TUser> : UserStore<TUser>, IDisposable, IUserCustomStore<TUser> where TUser : ApplicationUser
    {
        public ApplicationUserStore() : base(new ApplicationDbContext())
        {

        }
        public Task<TUser> FindByPhoneNumberAsync(string phoneNumber)
        {
            return Users.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber && x.PhoneNumber != null);
        }




        protected override void Dispose(bool isDisposing)
        {
            if (!isDisposing)
            {
                return;
            }


        }
    }
}