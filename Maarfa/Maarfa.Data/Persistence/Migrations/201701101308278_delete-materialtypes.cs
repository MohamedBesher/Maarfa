namespace Maarfa.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deletematerialtypes : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Books", "MaterialTypeId");
            DropColumn("dbo.Summaries", "MaterialTypeId");
            DropColumn("dbo.Videos", "MaterialTypeId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Videos", "MaterialTypeId", c => c.Int(nullable: false));
            AddColumn("dbo.Summaries", "MaterialTypeId", c => c.Int(nullable: false));
            AddColumn("dbo.Books", "MaterialTypeId", c => c.Int(nullable: false));
        }
    }
}
