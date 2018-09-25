using System;
using System.Collections.Generic;
using System.Linq;
using  System.Data.Entity;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using Maarfa.Data.Core.Repositories;
using Maarfa.Data.ExtensionsMethods;

namespace Maarfa.Data.Persistence.Repositories
{
    class VideoRepository: IVideoRepository
    {
        private readonly ApplicationDbContext _context;

        public VideoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Video> GetVideo(long id)
        {
            return await _context.Videos.FirstOrDefaultAsync(u => u.Id == id);
        }

        public void Insert(Video video)
        {
            _context.Videos.Add(video);
        }

        public void Remove(Video video)
        {
            _context.Videos.Remove(video);
        }

        public async Task<List<VideoDto>> GetVideos(int pageNumber, int pageSize, int categoryId, string searchTerm,
            bool isPublished = true)
        {
            SqlParameter pageNumberParameter = new SqlParameter("@PageNumber", pageNumber);
            SqlParameter pageSizeParameter = new SqlParameter("@PageSize", pageSize);
            var categoryIdParameter = new SqlParameter().Getparamter(categoryId, "CategoryId");
            var searchTermParameter = new SqlParameter().Getparamter(searchTerm, "SearchTerm");
            var isPublishedParameter = new SqlParameter().Getparamter(isPublished, "IsPublished");
            return (await _context.Database.SqlQuery<VideoDto>("Videos_SelectList @PageNumber,@PageSize,@CategoryId,@SearchTerm,@IsPublished", pageNumberParameter, pageSizeParameter, categoryIdParameter, searchTermParameter, isPublishedParameter).ToListAsync());
        }
    }
}
