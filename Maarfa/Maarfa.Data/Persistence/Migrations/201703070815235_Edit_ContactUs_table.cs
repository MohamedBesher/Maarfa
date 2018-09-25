namespace Maarfa.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Edit_ContactUs_table : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ContactUs", "AboutUs", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ContactUs", "AboutUs");
        }
    }
}
