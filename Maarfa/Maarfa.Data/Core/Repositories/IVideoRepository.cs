using System.Collections.Generic;
using System.Threading.Tasks;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Core.Repositories
{
    public interface IVideoRepository
    {
        Task<List<VideoDto>> GetVideos(int pageNumber, int pageSize, int categoryId, string searchTerm, bool isPublished = true);
        Task<Video> GetVideo(long id);

        void Insert(Video video);

        void Remove(Video video);
    }
}