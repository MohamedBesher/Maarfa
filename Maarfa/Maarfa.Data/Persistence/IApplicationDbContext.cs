using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Text;
using System.Threading.Tasks;
using Maarfa.Data.Core.Models;

namespace Maarfa.Data.Persistence
{
    internal interface IApplicationDbContext
    {
        DbSet<Category> Categories { get; set; }
        //DbSet<MaterialType> Types { get; set; }
        DbSet<Book> Books { get; set; }
        DbSet<Client> Clients { get; set; }
         DbSet<RefreshToken> RefreshTokens { get; set; }

        DbSet<Video> Videos { get; set; }
        DbSet<Summary> Summaries { get; set; }
        DbSet<ContactUs> ContactUses { get; set; }

    }
}
