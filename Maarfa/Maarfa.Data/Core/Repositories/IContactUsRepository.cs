using System.Threading.Tasks;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Core.Repositories
{
    public interface IContactUsRepository
    {
        Task<ContactUs> GetContacts();

    }
}