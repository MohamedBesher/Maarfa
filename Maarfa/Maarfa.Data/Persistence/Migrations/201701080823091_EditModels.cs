namespace Maarfa.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EditModels : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Books", "MaterialTypeId", "dbo.MaterialTypes");
            DropForeignKey("dbo.Summaries", "MaterialTypeId", "dbo.MaterialTypes");
            DropForeignKey("dbo.Videos", "MaterialTypeId", "dbo.MaterialTypes");
            DropIndex("dbo.Books", new[] { "MaterialTypeId" });
            DropIndex("dbo.Summaries", new[] { "MaterialTypeId" });
            DropIndex("dbo.Videos", new[] { "MaterialTypeId" });
            DropTable("dbo.MaterialTypes");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.MaterialTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                        IsCanceled = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.Videos", "MaterialTypeId");
            CreateIndex("dbo.Summaries", "MaterialTypeId");
            CreateIndex("dbo.Books", "MaterialTypeId");
            AddForeignKey("dbo.Videos", "MaterialTypeId", "dbo.MaterialTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Summaries", "MaterialTypeId", "dbo.MaterialTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Books", "MaterialTypeId", "dbo.MaterialTypes", "Id", cascadeDelete: true);
        }
    }
}
