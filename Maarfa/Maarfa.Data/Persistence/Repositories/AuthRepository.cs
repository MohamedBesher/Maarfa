using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Maarfa.Data.Core;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using Maarfa.Data.Persistence.Infrastructure;
using Microsoft.AspNet.Identity;

namespace Maarfa.Data.Persistence.Repositories
{
    public enum EmailType
    {
        EmailConfirmation = 1,
        ForgetPassword = 2,
    }

    public class AuthRepository : IDisposable
    {
        private readonly IUnitOfWork _unitOfWork;

        private ApplicationDbContext _context;

        private readonly ApplicationUserManagerImpl _userManager;

        public AuthRepository()
        {
            _context = new ApplicationDbContext();
            _userManager = new ApplicationUserManagerImpl();
            _unitOfWork = new UnitOfWork(_context);
        }

        #region user


       
        //public async Task ForgetPassword(string email)
        //{

        //    var user = await _userManager.FindByEmailAsync(email);
        //    await SendPasswordResetToken(user);

        //}
       
      
        public async Task<IdentityResult> ResetPassword(string userId = "", string code = "", string newPassword = "")
        {

            IdentityResult result = await _userManager.ResetPasswordAsync(userId, code, newPassword);
            return result;
        }
        public async Task<ApplicationUser> FindUser(string userName, string password)
        {
            ApplicationUser user = await _userManager.FindAsync(userName, password);
            return user;
        }

        public async Task<bool> IsEmailConfirme(string userId)
        {
            return await _userManager.IsEmailConfirmedAsync(userId);
        }
        public async Task<bool> IsUserArchieve(string userId)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == userId);
            return user.IsDeleted != null && user.IsDeleted.Value;
        }

        public async Task<ApplicationUser> FindUser(string email)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(email);
            return user;
        }

        public ApplicationUser FindUserbyEmail(string email)
        {
            ApplicationUser user =_userManager.FindByEmail(email);
            return user;
        }

        public async Task<IdentityResult> ConfirmEmail(string userId, string code)
        {
            IdentityResult result = await this._userManager.ConfirmEmailAsync(userId, code);
            return result;
        }

        public IList<string> GetRoles(string userId)
        {
            IList<string> lst = _userManager.GetRoles(userId);
            return lst;
        }

       

        private async Task AddRoleToUser(string userId, string role)
        {
            await _userManager.AddToRoleAsync(userId, role);
        }

        private async Task<string> GenerateToken(string userId, EmailType emailType)
        {
            switch (emailType)
            {
                case EmailType.EmailConfirmation:
                    return await _userManager.GenerateEmailConfirmationTokenAsync(userId);
                case EmailType.ForgetPassword:
                    return await _userManager.GeneratePasswordResetTokenAsync(userId);
                default:
                    return "";
            }

        }
        
        public async Task<IdentityResult> ChangePassword(string userId, string oldPassword, string newPassword)
        {
            IdentityResult result = await _userManager.ChangePasswordAsync(userId, oldPassword, newPassword);
            return result;
        }


        #endregion

        #region token

        public Client FindClient(string clientId)
        {
            var client = _context.Clients.Find(clientId);

            return client;
        }

        public async Task<bool> AddRefreshToken(RefreshToken token)
        {

            var existingToken =
                _context.RefreshTokens
                    .SingleOrDefault(r => r.Subject == token.Subject && r.ClientId == token.ClientId);

            if (existingToken != null)
            {
                var result = await RemoveRefreshToken(existingToken);
            }

            _context.RefreshTokens.Add(token);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _context.RefreshTokens.FindAsync(refreshTokenId);

            if (refreshToken != null)
            {
                _context.RefreshTokens.Remove(refreshToken);
                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshToken(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Remove(refreshToken);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _context.RefreshTokens.FindAsync(refreshTokenId);

            return refreshToken;
        }

        public List<RefreshToken> GetAllRefreshTokens()
        {
            return _context.RefreshTokens.ToList();
        }

        #endregion

        #region Soical
        public async Task<ApplicationUser> FindAsync(UserLoginInfo loginInfo)
        {
            ApplicationUser user = await _userManager.FindAsync(loginInfo);

            return user;
        }


        public async Task<IdentityResult> AddLoginAsync(string userId, UserLoginInfo login)
        {
            var result = await _userManager.AddLoginAsync(userId, login);

            return result;
        }
        #endregion

        //public void Dispose()
        //{
        //    _context.Dispose();
        //    _userManager.Dispose();
        //    GC.SuppressFinalize(this);
        //}
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposing)
            {
                return;
            }

            if (this._context == null)
            {
                return;
            }

            this._context.Dispose();
            this._userManager.Dispose();
            this._context = null;
            this._unitOfWork.Dispose();
        }

        public async Task<ApplicationUser> FindUserByUserName(string userName)
        {
            ApplicationUser user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == userName);
            return user;
        }
        public  ApplicationUser CheckUserNameExist(string userName)
        {
            ApplicationUser user = _userManager.Users.SingleOrDefault(x => x.UserName == userName);
            return user;
        }
        public async Task<ApplicationUser> FindUserByUserId(string id)
        {
            ApplicationUser user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<IdentityResult> EditImage(string picture, string id)
        {
            ApplicationUser user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == id);
            user.PhotoUrl = picture;
            return await _userManager.UpdateAsync(user);
        }
    }
}