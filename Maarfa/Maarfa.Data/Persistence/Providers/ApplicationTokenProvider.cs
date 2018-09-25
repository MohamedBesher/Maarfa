using System;
using System.Linq;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;
using Microsoft.AspNet.Identity;

namespace Maarfa.Data.Persistence.Providers
{
    public class ApplicationTokenProvider<TUser> : IUserTokenProvider<ApplicationUser, string> where TUser : class, IUser
    {
        private string GenerateId(Guid id)
        {
            long i = id.ToByteArray().Aggregate<byte, long>(1, (current, b) => current * ((int)b + 1));
            return String.Format("{0:x}", i - DateTime.Now.Ticks);
        }
        public async Task<string> GenerateAsync(string purpose, UserManager<ApplicationUser, string> manager, ApplicationUser user)
        {
            string resetToken = GenerateId(Guid.NewGuid());
            if (purpose == "Confirmation")
            {
                user.ConfirmedEmailToken = resetToken;
                await manager.UpdateAsync(user);
            }

            if (purpose == "ResetPassword")
            {
                user.ResetPasswordlToken = resetToken;
                await manager.UpdateAsync(user);
            }
            return await Task.FromResult<string>(resetToken.ToString());
        }

        public Task<bool> IsValidProviderForUserAsync(UserManager<ApplicationUser, string> manager, ApplicationUser user)
        {
            //if (manager == null) throw new ArgumentNullException();
            //else
            //{
            //    return Task.FromResult<bool>(manager.SupportsUserEmail);
            //}
            return Task.FromResult(true);
        }

        public Task NotifyAsync(string token, UserManager<ApplicationUser, string> manager, ApplicationUser user)
        {
            return Task.FromResult<int>(0);
        }

        public Task<bool> ValidateAsync(string purpose, string token, UserManager<ApplicationUser, string> manager, ApplicationUser user)
        {
            if (purpose == "Confirmation")
            {
                return Task.FromResult<bool>(user.ConfirmedEmailToken.ToString() == token);
            }
            else if (purpose == "ResetPassword")
            {
                return Task.FromResult<bool>(user.ResetPasswordlToken.ToString() == token);
            }
            else
            {
                return Task.FromResult<bool>(false);
            }
        }
    }
}