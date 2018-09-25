namespace Maarfa.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Books",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                        Slogon = c.String(maxLength: 1000),
                        Description = c.String(maxLength: 1000),
                        Image = c.String(maxLength: 1000),
                        DownloadLink = c.String(),
                        Category_Id = c.Int(),
                        MaterialType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Category_Id)
                .ForeignKey("dbo.MaterialTypes", t => t.MaterialType_Id)
                .Index(t => t.Category_Id)
                .Index(t => t.MaterialType_Id);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MaterialTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ContactUs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Phone = c.String(maxLength: 20),
                        Email = c.String(maxLength: 200),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Summaries",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                        Slogon = c.String(maxLength: 1000),
                        Image = c.String(maxLength: 1000),
                        Category_Id = c.Int(),
                        Type_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Category_Id)
                .ForeignKey("dbo.MaterialTypes", t => t.Type_Id)
                .Index(t => t.Category_Id)
                .Index(t => t.Type_Id);
            
            CreateTable(
                "dbo.Videos",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                        Image = c.String(maxLength: 1000),
                        Embed = c.String(maxLength: 1000),
                        Link = c.String(maxLength: 1000),
                        Category_Id = c.Int(),
                        MaterialType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.Category_Id)
                .ForeignKey("dbo.MaterialTypes", t => t.MaterialType_Id)
                .Index(t => t.Category_Id)
                .Index(t => t.MaterialType_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Videos", "MaterialType_Id", "dbo.MaterialTypes");
            DropForeignKey("dbo.Videos", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.Summaries", "Type_Id", "dbo.MaterialTypes");
            DropForeignKey("dbo.Summaries", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.Books", "MaterialType_Id", "dbo.MaterialTypes");
            DropForeignKey("dbo.Books", "Category_Id", "dbo.Categories");
            DropIndex("dbo.Videos", new[] { "MaterialType_Id" });
            DropIndex("dbo.Videos", new[] { "Category_Id" });
            DropIndex("dbo.Summaries", new[] { "Type_Id" });
            DropIndex("dbo.Summaries", new[] { "Category_Id" });
            DropIndex("dbo.Books", new[] { "MaterialType_Id" });
            DropIndex("dbo.Books", new[] { "Category_Id" });
            DropTable("dbo.Videos");
            DropTable("dbo.Summaries");
            DropTable("dbo.ContactUs");
            DropTable("dbo.MaterialTypes");
            DropTable("dbo.Categories");
            DropTable("dbo.Books");
        }
    }
}
