using System.Collections.Generic;
using System.Threading.Tasks;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Core.Repositories
{
    public interface ISummaryRepository
    {

        Task<List<SummaryDto>> GetSummaries(int pageNumber, int pageSize, int categoryId, string searchTerm, bool isPublished = true);
        Task<Summary> GetSummary(long id);
        void Insert(Summary summary);

        void Remove(Summary bo);
    }
}