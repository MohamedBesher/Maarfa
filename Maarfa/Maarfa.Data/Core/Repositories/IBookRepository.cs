using System.Collections.Generic;
using System.Threading.Tasks;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Core.Repositories
{
    public interface IBookRepository
    {
        Task<List<BookDto>> GetBooks(int pageNumber, int pageSize,int categoryId ,string searchTerm,bool isPublished=true);
        Task<Book> GetBook(long id);
        void InsertBook(Book book);
        void Remove(Book book);
    }
}
