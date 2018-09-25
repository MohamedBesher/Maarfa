using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Maarfa.Data.Core.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetCategories();
        Task<List<CategoryDto>> GetCategoriesWithPageing(int pageNumber, int pageSize, string name, bool? iscancel);

        bool IsUsed(int id);
        Task<Category> ViewDetails(int id);
        Category View(int id);
        void Add(Category category);
        void Delete(Category category);

    }
}