using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maarfa.Data.Core.Repositories;

namespace Maarfa.Data.Core
{
    public interface IUnitOfWork:IDisposable
    {
        ICategoryRepository Categories { get; }
        IBookRepository Books { get; }
        IContactUsRepository ContactUss { get; }
        ISummaryRepository Summaries { get; }
        IVideoRepository Videos { get; }
        Task<int> Complete();
    }
}
