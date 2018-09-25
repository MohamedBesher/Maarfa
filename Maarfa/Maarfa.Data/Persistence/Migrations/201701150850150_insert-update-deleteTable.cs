namespace Maarfa.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class insertupdatedeleteTable : DbMigration
    {
        public override void Up()
        {
            CreateStoredProcedure(
                "dbo.Book_Insert",
                p => new
                    {
                        Name = p.String(maxLength: 50),
                        Slogon = p.String(maxLength: 1000),
                        Description = p.String(maxLength: 1000),
                        Image = p.String(maxLength: 1000),
                        DownloadLink = p.String(),
                        CreatedDate = p.DateTime(),
                        IsPublished = p.Boolean(),
                        CategoryId = p.Int(),
                    },
                body:
                    @"INSERT [dbo].[Books]([Name], [Slogon], [Description], [Image], [DownloadLink], [CreatedDate], [IsPublished], [CategoryId])
                      VALUES (@Name, @Slogon, @Description, @Image, @DownloadLink, @CreatedDate, @IsPublished, @CategoryId)
                      
                      DECLARE @Id bigint
                      SELECT @Id = [Id]
                      FROM [dbo].[Books]
                      WHERE @@ROWCOUNT > 0 AND [Id] = scope_identity()
                      
                      SELECT t0.[Id]
                      FROM [dbo].[Books] AS t0
                      WHERE @@ROWCOUNT > 0 AND t0.[Id] = @Id"
            );
            
            CreateStoredProcedure(
                "dbo.Book_Update",
                p => new
                    {
                        Id = p.Long(),
                        Name = p.String(maxLength: 50),
                        Slogon = p.String(maxLength: 1000),
                        Description = p.String(maxLength: 1000),
                        Image = p.String(maxLength: 1000),
                        DownloadLink = p.String(),
                        CreatedDate = p.DateTime(),
                        IsPublished = p.Boolean(),
                        CategoryId = p.Int(),
                    },
                body:
                    @"UPDATE [dbo].[Books]
                      SET [Name] = @Name, [Slogon] = @Slogon, [Description] = @Description, [Image] = @Image, [DownloadLink] = @DownloadLink, [CreatedDate] = @CreatedDate, [IsPublished] = @IsPublished, [CategoryId] = @CategoryId
                      WHERE ([Id] = @Id)"
            );
            
            CreateStoredProcedure(
                "dbo.Book_Delete",
                p => new
                    {
                        Id = p.Long(),
                    },
                body:
                    @"DELETE [dbo].[Books]
                      WHERE ([Id] = @Id)"
            );
            
            CreateStoredProcedure(
                "dbo.Summary_Insert",
                p => new
                    {
                        Name = p.String(maxLength: 50),
                        Slogon = p.String(maxLength: 1000),
                        Image = p.String(maxLength: 1000),
                        IsPublished = p.Boolean(),
                        CategoryId = p.Int(),
                        CreatedDate = p.DateTime(),
                    },
                body:
                    @"INSERT [dbo].[Summaries]([Name], [Slogon], [Image], [IsPublished], [CategoryId], [CreatedDate])
                      VALUES (@Name, @Slogon, @Image, @IsPublished, @CategoryId, @CreatedDate)
                      
                      DECLARE @Id bigint
                      SELECT @Id = [Id]
                      FROM [dbo].[Summaries]
                      WHERE @@ROWCOUNT > 0 AND [Id] = scope_identity()
                      
                      SELECT t0.[Id]
                      FROM [dbo].[Summaries] AS t0
                      WHERE @@ROWCOUNT > 0 AND t0.[Id] = @Id"
            );
            
            CreateStoredProcedure(
                "dbo.Summary_Update",
                p => new
                    {
                        Id = p.Long(),
                        Name = p.String(maxLength: 50),
                        Slogon = p.String(maxLength: 1000),
                        Image = p.String(maxLength: 1000),
                        IsPublished = p.Boolean(),
                        CategoryId = p.Int(),
                        CreatedDate = p.DateTime(),
                    },
                body:
                    @"UPDATE [dbo].[Summaries]
                      SET [Name] = @Name, [Slogon] = @Slogon, [Image] = @Image, [IsPublished] = @IsPublished, [CategoryId] = @CategoryId, [CreatedDate] = @CreatedDate
                      WHERE ([Id] = @Id)"
            );
            
            CreateStoredProcedure(
                "dbo.Summary_Delete",
                p => new
                    {
                        Id = p.Long(),
                    },
                body:
                    @"DELETE [dbo].[Summaries]
                      WHERE ([Id] = @Id)"
            );
            
            CreateStoredProcedure(
                "dbo.Video_Insert",
                p => new
                    {
                        Name = p.String(maxLength: 50),
                        Image = p.String(maxLength: 1000),
                        Embed = p.String(maxLength: 1000),
                        Link = p.String(maxLength: 1000),
                        IsPublished = p.Boolean(),
                        CreatedDate = p.DateTime(),
                        CategoryId = p.Int(),
                    },
                body:
                    @"INSERT [dbo].[Videos]([Name], [Image], [Embed], [Link], [IsPublished], [CreatedDate], [CategoryId])
                      VALUES (@Name, @Image, @Embed, @Link, @IsPublished, @CreatedDate, @CategoryId)
                      
                      DECLARE @Id bigint
                      SELECT @Id = [Id]
                      FROM [dbo].[Videos]
                      WHERE @@ROWCOUNT > 0 AND [Id] = scope_identity()
                      
                      SELECT t0.[Id]
                      FROM [dbo].[Videos] AS t0
                      WHERE @@ROWCOUNT > 0 AND t0.[Id] = @Id"
            );
            
            CreateStoredProcedure(
                "dbo.Video_Update",
                p => new
                    {
                        Id = p.Long(),
                        Name = p.String(maxLength: 50),
                        Image = p.String(maxLength: 1000),
                        Embed = p.String(maxLength: 1000),
                        Link = p.String(maxLength: 1000),
                        IsPublished = p.Boolean(),
                        CreatedDate = p.DateTime(),
                        CategoryId = p.Int(),
                    },
                body:
                    @"UPDATE [dbo].[Videos]
                      SET [Name] = @Name, [Image] = @Image, [Embed] = @Embed, [Link] = @Link, [IsPublished] = @IsPublished, [CreatedDate] = @CreatedDate, [CategoryId] = @CategoryId
                      WHERE ([Id] = @Id)"
            );
            
            CreateStoredProcedure(
                "dbo.Video_Delete",
                p => new
                    {
                        Id = p.Long(),
                    },
                body:
                    @"DELETE [dbo].[Videos]
                      WHERE ([Id] = @Id)"
            );
            
        }
        
        public override void Down()
        {
            DropStoredProcedure("dbo.Video_Delete");
            DropStoredProcedure("dbo.Video_Update");
            DropStoredProcedure("dbo.Video_Insert");
            DropStoredProcedure("dbo.Summary_Delete");
            DropStoredProcedure("dbo.Summary_Update");
            DropStoredProcedure("dbo.Summary_Insert");
            DropStoredProcedure("dbo.Book_Delete");
            DropStoredProcedure("dbo.Book_Update");
            DropStoredProcedure("dbo.Book_Insert");
        }
    }
}
