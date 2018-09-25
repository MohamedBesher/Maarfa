using System;
using System.Threading.Tasks;
using Maarfa.Data.Core.Repositories;
using Maarfa.Data.Persistence;
using Maarfa.Data.Persistence.Repositories;

namespace Maarfa.Data.Core
{
    public class UnitOfWork : IUnitOfWork
    {

        private  ApplicationDbContext _context;

        public ICategoryRepository Categories { get; private set; }
        public IBookRepository Books { get; private set; }
        public IContactUsRepository ContactUss { get; private set; }
        public ISummaryRepository Summaries { get; private set; }
        public IVideoRepository Videos { get; private set; }
        public UnitOfWork()
        {
            _context = new ApplicationDbContext();
            Categories = new CategoryRepository(_context);
             Books = new BookRepository(_context);
            ContactUss = new ContactUsRepository(_context);
            Summaries = new SummaryRepository(_context);
            Videos = new VideoRepository(_context);
        }
        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Categories = new CategoryRepository(_context);
             Books = new BookRepository(_context);
            ContactUss = new ContactUsRepository(_context);
            Summaries = new SummaryRepository(_context);
            Videos = new VideoRepository(_context);
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposing)
            {
                return;
            }

            if (this._context == null)
            {
                return;
            }

            this._context.Dispose();
            this._context = null;
        }
    }
}