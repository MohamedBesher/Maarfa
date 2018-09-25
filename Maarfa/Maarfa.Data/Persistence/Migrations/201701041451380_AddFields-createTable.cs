namespace Maarfa.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddFieldscreateTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Books", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.Books", "MaterialType_Id", "dbo.MaterialTypes");
            DropForeignKey("dbo.Summaries", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.Videos", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.Videos", "MaterialType_Id", "dbo.MaterialTypes");
            DropForeignKey("dbo.Summaries", "Type_Id", "dbo.MaterialTypes");
            DropIndex("dbo.Books", new[] { "Category_Id" });
            DropIndex("dbo.Books", new[] { "MaterialType_Id" });
            DropIndex("dbo.Summaries", new[] { "Category_Id" });
            DropIndex("dbo.Summaries", new[] { "Type_Id" });
            DropIndex("dbo.Videos", new[] { "Category_Id" });
            DropIndex("dbo.Videos", new[] { "MaterialType_Id" });
            RenameColumn(table: "dbo.Books", name: "Category_Id", newName: "CategoryId");
            RenameColumn(table: "dbo.Books", name: "MaterialType_Id", newName: "MaterialTypeId");
            RenameColumn(table: "dbo.Summaries", name: "Category_Id", newName: "CategoryId");
            RenameColumn(table: "dbo.Videos", name: "Category_Id", newName: "CategoryId");
            RenameColumn(table: "dbo.Videos", name: "MaterialType_Id", newName: "MaterialTypeId");
            RenameColumn(table: "dbo.Summaries", name: "Type_Id", newName: "MaterialTypeId");
            AddColumn("dbo.Books", "CreatedDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Books", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.Categories", "IsCanceled", c => c.Boolean(nullable: false));
            AddColumn("dbo.MaterialTypes", "IsCanceled", c => c.Boolean(nullable: false));
            AddColumn("dbo.Summaries", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.Summaries", "CreatedDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Videos", "IsPublished", c => c.Boolean(nullable: false));
            AddColumn("dbo.Videos", "CreatedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Books", "CategoryId", c => c.Int(nullable: false));
            AlterColumn("dbo.Books", "MaterialTypeId", c => c.Int(nullable: false));
            AlterColumn("dbo.Summaries", "CategoryId", c => c.Int(nullable: false));
            AlterColumn("dbo.Summaries", "MaterialTypeId", c => c.Int(nullable: false));
            AlterColumn("dbo.Videos", "CategoryId", c => c.Int(nullable: false));
            AlterColumn("dbo.Videos", "MaterialTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Books", "CategoryId");
            CreateIndex("dbo.Books", "MaterialTypeId");
            CreateIndex("dbo.Summaries", "CategoryId");
            CreateIndex("dbo.Summaries", "MaterialTypeId");
            CreateIndex("dbo.Videos", "CategoryId");
            CreateIndex("dbo.Videos", "MaterialTypeId");
            AddForeignKey("dbo.Books", "CategoryId", "dbo.Categories", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Books", "MaterialTypeId", "dbo.MaterialTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Summaries", "CategoryId", "dbo.Categories", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Videos", "CategoryId", "dbo.Categories", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Videos", "MaterialTypeId", "dbo.MaterialTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Summaries", "MaterialTypeId", "dbo.MaterialTypes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Summaries", "MaterialTypeId", "dbo.MaterialTypes");
            DropForeignKey("dbo.Videos", "MaterialTypeId", "dbo.MaterialTypes");
            DropForeignKey("dbo.Videos", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.Summaries", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.Books", "MaterialTypeId", "dbo.MaterialTypes");
            DropForeignKey("dbo.Books", "CategoryId", "dbo.Categories");
            DropIndex("dbo.Videos", new[] { "MaterialTypeId" });
            DropIndex("dbo.Videos", new[] { "CategoryId" });
            DropIndex("dbo.Summaries", new[] { "MaterialTypeId" });
            DropIndex("dbo.Summaries", new[] { "CategoryId" });
            DropIndex("dbo.Books", new[] { "MaterialTypeId" });
            DropIndex("dbo.Books", new[] { "CategoryId" });
            AlterColumn("dbo.Videos", "MaterialTypeId", c => c.Int());
            AlterColumn("dbo.Videos", "CategoryId", c => c.Int());
            AlterColumn("dbo.Summaries", "MaterialTypeId", c => c.Int());
            AlterColumn("dbo.Summaries", "CategoryId", c => c.Int());
            AlterColumn("dbo.Books", "MaterialTypeId", c => c.Int());
            AlterColumn("dbo.Books", "CategoryId", c => c.Int());
            DropColumn("dbo.Videos", "CreatedDate");
            DropColumn("dbo.Videos", "IsPublished");
            DropColumn("dbo.Summaries", "CreatedDate");
            DropColumn("dbo.Summaries", "IsPublished");
            DropColumn("dbo.MaterialTypes", "IsCanceled");
            DropColumn("dbo.Categories", "IsCanceled");
            DropColumn("dbo.Books", "IsPublished");
            DropColumn("dbo.Books", "CreatedDate");
            RenameColumn(table: "dbo.Summaries", name: "MaterialTypeId", newName: "Type_Id");
            RenameColumn(table: "dbo.Videos", name: "MaterialTypeId", newName: "MaterialType_Id");
            RenameColumn(table: "dbo.Videos", name: "CategoryId", newName: "Category_Id");
            RenameColumn(table: "dbo.Summaries", name: "CategoryId", newName: "Category_Id");
            RenameColumn(table: "dbo.Books", name: "MaterialTypeId", newName: "MaterialType_Id");
            RenameColumn(table: "dbo.Books", name: "CategoryId", newName: "Category_Id");
            CreateIndex("dbo.Videos", "MaterialType_Id");
            CreateIndex("dbo.Videos", "Category_Id");
            CreateIndex("dbo.Summaries", "Type_Id");
            CreateIndex("dbo.Summaries", "Category_Id");
            CreateIndex("dbo.Books", "MaterialType_Id");
            CreateIndex("dbo.Books", "Category_Id");
            AddForeignKey("dbo.Summaries", "Type_Id", "dbo.MaterialTypes", "Id");
            AddForeignKey("dbo.Videos", "MaterialType_Id", "dbo.MaterialTypes", "Id");
            AddForeignKey("dbo.Videos", "Category_Id", "dbo.Categories", "Id");
            AddForeignKey("dbo.Summaries", "Category_Id", "dbo.Categories", "Id");
            AddForeignKey("dbo.Books", "MaterialType_Id", "dbo.MaterialTypes", "Id");
            AddForeignKey("dbo.Books", "Category_Id", "dbo.Categories", "Id");
        }
    }
}
