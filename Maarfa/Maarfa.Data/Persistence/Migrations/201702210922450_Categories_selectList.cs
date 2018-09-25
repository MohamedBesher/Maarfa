namespace Maarfa.Data.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class Categories_selectList : DbMigration
    {
        public override void Up()
        {


            CreateStoredProcedure("Categories_SelectList",
               p => new
               {
                   PageNumber = p.Int(1),
                   PageSize = p.Int(8),
                   SearchTerm = p.String(150, defaultValueSql: "NULL"),
                   IsCanceled = p.Boolean(defaultValueSql: "NULL"),

               }, @"select V.[Id] , V.[Name],V.[IsCanceled]
                ,OverallCount = COUNT(1) OVER()
                from[dbo].[Categories] as V
                where(@SearchTerm is null or V.Name like '%' + @SearchTerm + '%' )
                and V.IsCanceled=ISNULL(@IsCanceled, V.IsCanceled)
                ORDER BY
                Id Desc
                OFFSET @PageSize * (@PageNumber - 1) ROWS
                FETCH NEXT @PageSize ROWS ONLY OPTION(RECOMPILE)");

        }

        public override void Down()
        {
            DropStoredProcedure("Books_SelectList");
        }
    }
}
