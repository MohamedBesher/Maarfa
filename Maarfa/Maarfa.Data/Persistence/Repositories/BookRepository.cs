using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using Maarfa.Data.Core.Repositories;
using Maarfa.Data.ExtensionsMethods;

namespace Maarfa.Data.Persistence.Repositories
{
    class BookRepository : IBookRepository
    {
        //
        private readonly ApplicationDbContext _context;

        public BookRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<BookDto>> GetBooks(int pageNumber, int pageSize, int categoryId, string searchTerm,
            bool isPublished = true)
        {
            SqlParameter pageNumberParameter = new SqlParameter("@PageNumber", pageNumber);
            SqlParameter pageSizeParameter = new SqlParameter("@PageSize", pageSize);
            var categoryIdParameter = new SqlParameter().Getparamter(categoryId, "CategoryId");
            var searchTermParameter = new SqlParameter().Getparamter(searchTerm, "SearchTerm");
            var isPublishedParameter = new SqlParameter().Getparamter(isPublished, "IsPublished");
            return (await _context.Database.SqlQuery<BookDto>("Books_SelectList @PageNumber,@PageSize,@CategoryId,@SearchTerm,@IsPublished", pageNumberParameter, pageSizeParameter, categoryIdParameter, searchTermParameter, isPublishedParameter).ToListAsync());
        }

        public async Task<Book> GetBook(long id)
        {
            return await (_context.Books.FirstOrDefaultAsync(u => u.Id == id));
        }

        public void InsertBook(Book book)
        {
            _context.Books.Add(book);
        }

        public void Remove(Book book)
        {
            _context.Books.Remove(book);
        }
    }
}