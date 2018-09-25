using Maarfa.Data.Core.Models;
using Maarfa.Data.Persistence.EntityConfigurations;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;


namespace Maarfa.Data.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
    {
        public DbSet<Category> Categories { get; set; }
        //public DbSet<MaterialType> Types { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Summary> Summaries { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public DbSet<ContactUs> ContactUses { get; set; }
        public ApplicationDbContext() : base("Saned_Maarfa")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new CategoryConfiguration());
            //modelBuilder.Configurations.Add(new MaterialTypeConfiguration());
            modelBuilder.Configurations.Add(new ApplicationUserConfigurations());
            modelBuilder.Configurations.Add(new BookConfiguration());
            modelBuilder.Configurations.Add(new VideoConfiguration());
            modelBuilder.Configurations.Add(new SummaryConfiguration());
            modelBuilder.Configurations.Add(new ContactUsConfiguration());
            modelBuilder.Configurations.Add(new ClientConfigurations());

            modelBuilder.Entity<Book>().MapToStoredProcedures();
            modelBuilder.Entity<Video>().MapToStoredProcedures();
            modelBuilder.Entity<Summary>().MapToStoredProcedures();
            modelBuilder.Entity<Category>().MapToStoredProcedures();

            //modelBuilder.Properties<DateTime>().Configure(c=>c.HasColumnType("datetime2"));


            base.OnModelCreating(modelBuilder);
        }
    }
}
