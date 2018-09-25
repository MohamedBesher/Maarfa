using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using Maarfa.Data.Core.Repositories;
using Maarfa.Data.ExtensionsMethods;

namespace Maarfa.Data.Persistence.Repositories
{
    class SummaryRepository : ISummaryRepository
    {
        private readonly ApplicationDbContext _context;

        public SummaryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<SummaryDto>> GetSummaries(int pageNumber, int pageSize, int categoryId, string searchTerm,
            bool isPublished = true)
        {
            SqlParameter pageNumberParameter = new SqlParameter("@PageNumber", pageNumber);
            SqlParameter pageSizeParameter = new SqlParameter("@PageSize", pageSize);
            var categoryIdParameter = new SqlParameter().Getparamter(categoryId, "CategoryId");
            var searchTermParameter = new SqlParameter().Getparamter(searchTerm, "SearchTerm");
            var isPublishedParameter = new SqlParameter().Getparamter(isPublished, "IsPublished");
            return (await _context.Database.SqlQuery<SummaryDto>("Summaries_SelectList @PageNumber,@PageSize,@CategoryId,@SearchTerm,@IsPublished", pageNumberParameter, pageSizeParameter, categoryIdParameter, searchTermParameter, isPublishedParameter).ToListAsync());
        }

        public async Task<Summary> GetSummary(long id)
        {
            return await _context.Summaries.FirstOrDefaultAsync(u => u.Id == id);
        }

        public void Insert(Summary summary)
        {
            _context.Summaries.Add(summary);

        }

        public void Remove(Summary bo)
        {
            _context.Summaries.Remove(bo);
        }
    }
}
