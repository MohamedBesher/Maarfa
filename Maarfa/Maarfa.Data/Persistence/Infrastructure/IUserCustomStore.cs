using System;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;
using Microsoft.AspNet.Identity;

namespace Maarfa.Data.Persistence.Infrastructure
{
    public interface IUserCustomStore<TUser> : IUserStore<TUser> , IDisposable where TUser : ApplicationUser, IUser<string>
    {
        Task<TUser> FindByPhoneNumberAsync(string phoneNumber);
   
    }
}