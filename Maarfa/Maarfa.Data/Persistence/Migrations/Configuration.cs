using System.Collections.Generic;
using Maarfa.Data.Core.Models;
using Maarfa.Data.Persistence.Infrastructure;
using Microsoft.AspNet.Identity.EntityFramework;
using Saned.Maarfa.Data.Persistence.Infrastructure;
 using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
using Maarfa.Data.Core.Tools;

namespace Maarfa.Data.Migrations
{
   

    internal sealed class Configuration : DbMigrationsConfiguration<Maarfa.Data.Persistence.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            MigrationsDirectory = @"Persistence\Migrations";
        }

        protected override void Seed(Maarfa.Data.Persistence.ApplicationDbContext context)
        {

            if (!context.Clients.Any())
            {
                context.Clients.AddRange(BuildClientsList());
                context.SaveChanges();
            }

            #region Categories

            if (!context.Categories.Any())
            {
                List<Category> categories = new List<Category>()
                {
                    new Category() {Name = "التمريض", IsCanceled = false},
                    new Category() {Name = "الصيدلة", IsCanceled = false},
                    new Category() {Name = " الطب البشري", IsCanceled = false},
                    new Category() {Name = "العلوم الادارية", IsCanceled = false},
                    new Category() {Name = "العلوم الطبيةالتطبيقية", IsCanceled = false},
                    new Category() {Name = "طب الاسنان", IsCanceled = false},
                };
                context.Categories.AddRange(categories);
                context.SaveChanges();


            }

            #endregion


            #region Videos

            if (!context.Videos.Any())
            {

                List<Video> videos = new List<Video>()
                {
                    new Video()
                    {
                        Name = "Video Name 1",
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 2",
                        CategoryId = 2,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 3",
                        CategoryId = 3,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 4",
                        CategoryId = 4,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 5",
                        CategoryId = 5,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 6",
                        CategoryId = 6,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 1",
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 1",
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 1",
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 1",
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 1",
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 1",
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    },
                    new Video()
                    {
                        Name = "Video Name 1",
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Embed = "https://www.youtube.com/embed/eqVXrpqWTQQ",
                        Link = "https://www.youtube.com/watch?v=c4dBiSKKePw",
                        IsPublished = true,
                        Image =
                            "https://i.ytimg.com/vi/c4dBiSKKePw/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=hFXBhr0V81CGVyinnIn3jheUldY"
                    }
                };
                context.Videos.AddRange(videos);
                context.SaveChanges();
            }

            #endregion


            #region books

            if (!context.Books.Any())
            {
                List<Book> books = new List<Book>()
                {
                    new Book()
                    {
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Name = "book 1",
                        Description =
                            "Description Description Description Description Description Description Description Description Description Description Description ",
                        DownloadLink =
                            "http://www.kutub.info/downloads/19640.pdf?1458133555&key=YTBmYmU0Y2TYMPEnDr3e1ketguO%2FcJc1PnqFzIm3EJo%3D%0A",
                        Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                        Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg",
                        IsPublished = true
                    },
                    new Book()
                    {
                        CategoryId = 2,
                        CreatedDate = DateTime.Now,
                        Name = "book 2",
                        Description =
                            "Description Description Description Description Description Description Description Description Description Description Description ",
                        DownloadLink =
                            "http://www.kutub.info/downloads/19640.pdf?1458133555&key=YTBmYmU0Y2TYMPEnDr3e1ketguO%2FcJc1PnqFzIm3EJo%3D%0A",
                        Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                        Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg",
                        IsPublished = true
                    },
                    new Book()
                    {
                        CategoryId = 3,
                        CreatedDate = DateTime.Now,
                        Name = "book 3",
                        Description =
                            "Description Description Description Description Description Description Description Description Description Description Description ",
                        DownloadLink =
                            "http://www.kutub.info/downloads/19640.pdf?1458133555&key=YTBmYmU0Y2TYMPEnDr3e1ketguO%2FcJc1PnqFzIm3EJo%3D%0A",
                        Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                        Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg",
                        IsPublished = true
                    },
                    new Book()
                    {
                        CategoryId = 4,
                        CreatedDate = DateTime.Now,
                        Name = "book 4",
                        Description =
                            "Description Description Description Description Description Description Description Description Description Description Description ",
                        DownloadLink =
                            "http://www.kutub.info/downloads/19640.pdf?1458133555&key=YTBmYmU0Y2TYMPEnDr3e1ketguO%2FcJc1PnqFzIm3EJo%3D%0A",
                        Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                        Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg",
                        IsPublished = true
                    },
                    new Book()
                    {
                        CategoryId = 5,
                        CreatedDate = DateTime.Now,
                        Name = "book 5",
                        Description =
                            "Description Description Description Description Description Description Description Description Description Description Description ",
                        DownloadLink =
                            "http://www.kutub.info/downloads/19640.pdf?1458133555&key=YTBmYmU0Y2TYMPEnDr3e1ketguO%2FcJc1PnqFzIm3EJo%3D%0A",
                        Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                        Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg",
                        IsPublished = true
                    },
                    new Book()
                    {
                        CategoryId = 6,
                        CreatedDate = DateTime.Now,
                        Name = "book 6",
                        Description =
                            "Description Description Description Description Description Description Description Description Description Description Description ",
                        DownloadLink =
                            "http://www.kutub.info/downloads/19640.pdf?1458133555&key=YTBmYmU0Y2TYMPEnDr3e1ketguO%2FcJc1PnqFzIm3EJo%3D%0A",
                        Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                        Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg",
                        IsPublished = true
                    },
                    new Book()
                    {
                        CategoryId = 1,
                        CreatedDate = DateTime.Now,
                        Name = "book 7",
                        Description =
                            "Description Description Description Description Description Description Description Description Description Description Description ",
                        DownloadLink =
                            "http://www.kutub.info/downloads/19640.pdf?1458133555&key=YTBmYmU0Y2TYMPEnDr3e1ketguO%2FcJc1PnqFzIm3EJo%3D%0A",
                        Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                        Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg",
                        IsPublished = true
                    },
                    new Book()
                    {
                        CategoryId = 2,
                        CreatedDate = DateTime.Now,
                        Name = "book 8",
                        Description =
                            "Description Description Description Description Description Description Description Description Description Description Description ",
                        DownloadLink =
                            "http://www.kutub.info/downloads/19640.pdf?1458133555&key=YTBmYmU0Y2TYMPEnDr3e1ketguO%2FcJc1PnqFzIm3EJo%3D%0A",
                        Image = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg",
                        Slogon = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                        IsPublished = true
                    }
                };
                context.Books.AddRange(books);
                context.SaveChanges();
 }
                #endregion
           
            #region Summaries

            if (!context.Summaries.Any())
                {
                    List<Summary> summaries = new List<Summary>()
                    {
                        new Summary()
                        {
                            CategoryId = 1,
                            CreatedDate = DateTime.Now,
                            Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                            IsPublished = true,
                            Name = "Summary 1",
                            Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg"
                        },
                        new Summary()
                        {
                            CategoryId = 2,
                            CreatedDate = DateTime.Now,
                            Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                            IsPublished = true,
                            Name = "Summary 2",
                            Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg"
                        },
                        new Summary()
                        {
                            CategoryId = 3,
                            CreatedDate = DateTime.Now,
                            Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                            IsPublished = true,
                            Name = "Summary 3",
                            Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg"
                        },
                        new Summary()
                        {
                            CategoryId = 4,
                            CreatedDate = DateTime.Now,
                            Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                            IsPublished = true,
                            Name = "Summary 4",
                            Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg"
                        },
                        new Summary()
                        {
                            CategoryId = 5,
                            CreatedDate = DateTime.Now,
                            Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                            IsPublished = true,
                            Name = "Summary 5",
                            Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg"
                        },
                        new Summary()
                        {
                            CategoryId = 6,
                            CreatedDate = DateTime.Now,
                            Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                            IsPublished = true,
                            Name = "Summary 6",
                            Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg"
                        },
                        new Summary()
                        {
                            CategoryId = 1,
                            CreatedDate = DateTime.Now,
                            Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                            IsPublished = true,
                            Name = "Summary 7",
                            Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg"
                        },
                        new Summary()
                        {
                            CategoryId = 2,
                            CreatedDate = DateTime.Now,
                            Image = "http://q8yusa.com/wp-content/uploads/2015/08/Stack-Books.jpg?x21741",
                            IsPublished = true,
                            Name = "Summary 8",
                            Slogon = "http://www.spelling-words-well.com/images/dictionary-spelling-books.jpg"
                        }

                    };
                    context.Summaries.AddRange(summaries);
                    context.SaveChanges();


                }

                #endregion

                #region contacts

                if (!context.ContactUses.Any())
                {
                    context.ContactUses.Add(new ContactUs() {Email = "www.gosi.gov.sa", Phone = "920004696"});
                    context.SaveChanges();
                }

                #endregion

                #region Roles

                string adminRoleId;
               

                if (!context.Roles.Any())
                {
                    adminRoleId = context.Roles.Add(new IdentityRole("Administrator")).Id;
                    context.SaveChanges();
                }
                else
                {
                    adminRoleId = context.Roles.First(c => c.Name == "Administrator").Id;

                }

            #endregion

#region users
            if (!context.Users.Any())
                {
                    var administrator =
                        context.Users.Add(new ApplicationUser()
                        {
                            UserName = "administrator",
                            Name = "administrator",
                            Email = "admin@somesite.com",
                            EmailConfirmed = true
                        });
                    context.SaveChanges();

                    administrator.Roles.Add(new IdentityUserRole {RoleId = adminRoleId});
                    context.SaveChanges();



                    var store = new ApplicationUserStoreImpl();//new UserStore<ApplicationUser>();

                    store.SetPasswordHashAsync(administrator, new ApplicationUserManagerImpl().PasswordHasher.HashPassword("administrator123"));
                    //store.SetPasswordHashAsync(standardUser, new ApplicationUserManagerImpl().PasswordHasher.HashPassword("user123"));
                    //store.SetPasswordHashAsync(drUser, new ApplicationUserManagerImpl().PasswordHasher.HashPassword("dr1234"));
                    //store.SetPasswordHashAsync(agentUser, new ApplicationUserManagerImpl().PasswordHasher.HashPassword("ag1234"));
                    context.SaveChanges();

                }


            #endregion






        }

        private static List<Client> BuildClientsList()
        {

            List<Client> clientsList = new List<Client>
            {
                new Client
                { Id = "ngAuthApp",
                    Secret= Helper.GetHash("abc@123"),
                    Name="AngularJS front-end Application",
                    ApplicationType =ApplicationTypes.JavaScript,
                    Active = true,
                    RefreshTokenLifeTime = 7200,
                    AllowedOrigin = "http://localhost:32150/"
                },
                new Client
                { Id = "consoleApp",
                    Secret=Helper.GetHash("123@abc"),
                    Name="Console Application",
                    ApplicationType =ApplicationTypes.NativeConfidential,
                    Active = true,
                    RefreshTokenLifeTime = 14400,
                    AllowedOrigin = "*"
                }
            };

            return clientsList;
        }

    }
}

