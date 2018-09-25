using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using Maarfa.Data.Core.Repositories;
using Maarfa.Data.ExtensionsMethods;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Maarfa.Data.Persistence.Repositories
{
    class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetCategories()
        {
            return await _context.Categories.Where(u => !u.IsCanceled).ToListAsync();
        }

        public bool IsUsed(int id)
        {
            var books = _context.Books.Count(u => u.CategoryId == id);
            var videos = _context.Videos.Count(u => u.CategoryId == id);
            var summaries = _context.Summaries.Count(u => u.CategoryId == id);
            if (books > 0 || videos > 0 || summaries > 0)
                return true;
            else return false;

        }

        public Task<Category> ViewDetails(int id)
        {
            return _context.Categories.FirstOrDefaultAsync(u => u.Id == id);
        }



        public void Add(Category category)
        {
            _context.Categories.Add(category);
        }

        public void Delete(Category category)
        {
            if (category != null)
                _context.Categories.Remove(category);
        }

        public Category View(int id)
        {
            return _context.Categories.FirstOrDefault(u => u.Id == id);
        }

        public async Task<List<CategoryDto>> GetCategoriesWithPageing(int pageNumber, int pageSize, string name, bool? iscancel)
        {
            SqlParameter pageNumberParameter = new SqlParameter("@PageNumber", pageNumber);
            SqlParameter pageSizeParameter = new SqlParameter("@PageSize", pageSize);
            var searchTermParameter = new SqlParameter().Getparamter(name, "SearchTerm");
            var isDeletedParameter = new SqlParameter().Getparamter(iscancel, "IsCanceled");
            return (await _context.Database.SqlQuery<CategoryDto>("Categories_SelectList @PageNumber,@PageSize,@SearchTerm,@IsCanceled", pageNumberParameter, pageSizeParameter, searchTermParameter, isDeletedParameter).ToListAsync());
        }
    }
}
