namespace Maarfa.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddEditdeleteCategory : DbMigration
    {
        public override void Up()
        {
            CreateStoredProcedure(
                "dbo.Category_Insert",
                p => new
                    {
                        Name = p.String(maxLength: 50),
                        IsCanceled = p.Boolean(),
                    },
                body:
                    @"INSERT [dbo].[Categories]([Name], [IsCanceled])
                      VALUES (@Name, @IsCanceled)
                      
                      DECLARE @Id int
                      SELECT @Id = [Id]
                      FROM [dbo].[Categories]
                      WHERE @@ROWCOUNT > 0 AND [Id] = scope_identity()
                      
                      SELECT t0.[Id]
                      FROM [dbo].[Categories] AS t0
                      WHERE @@ROWCOUNT > 0 AND t0.[Id] = @Id"
            );
            
            CreateStoredProcedure(
                "dbo.Category_Update",
                p => new
                    {
                        Id = p.Int(),
                        Name = p.String(maxLength: 50),
                        IsCanceled = p.Boolean(),
                    },
                body:
                    @"UPDATE [dbo].[Categories]
                      SET [Name] = @Name, [IsCanceled] = @IsCanceled
                      WHERE ([Id] = @Id)"
            );
            
            CreateStoredProcedure(
                "dbo.Category_Delete",
                p => new
                    {
                        Id = p.Int(),
                    },
                body:
                    @"DELETE [dbo].[Categories]
                      WHERE ([Id] = @Id)"
            );
            
        }
        
        public override void Down()
        {
            DropStoredProcedure("dbo.Category_Delete");
            DropStoredProcedure("dbo.Category_Update");
            DropStoredProcedure("dbo.Category_Insert");
        }
    }
}
