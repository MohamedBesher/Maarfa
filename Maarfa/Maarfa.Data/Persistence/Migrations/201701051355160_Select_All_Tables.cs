namespace Maarfa.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Select_All_Tables : DbMigration
    {
        public override void Up()
        {

            CreateStoredProcedure("Books_SelectList",
                p => new
                {
                    PageNumber = p.Int(1),
                    PageSize = p.Int(8),
                    CategoryId = p.Int(0),
                    MaterialTypeId = p.Int(0),
                    SearchTerm = p.String(150, defaultValueSql: "NULL"),
                    IsPublished = p.Boolean(defaultValueSql: "NULL"),

                }, @" select B.[Id] ,B.[Name],[Slogon],[Description],[Image],
                    [DownloadLink],B.[CategoryId],B.[MaterialTypeId],[CreatedDate],
                    [IsPublished] 
                    from [dbo].[Books] as B
                    -- join [dbo].[Categories] as C
                    -- on  @CategoryId!=0 and B.CategoryId=c.Id and B.CategoryId=@CategoryId
                    -- join [dbo].[MaterialTypes] as M
                    -- on  @MaterialTypeId!=0 and b.MaterialTypeId=M.Id and b.MaterialTypeId=@MaterialTypeId
                    where  (@SearchTerm is null or b.Name like '%' + @SearchTerm + '%' ) 
                    and B.IsPublished=ISNULL(@IsPublished,B.IsPublished)
                    and (@CategoryId=0 or B.CategoryId=@CategoryId)
                    and (@MaterialTypeId=0 or b.MaterialTypeId=@MaterialTypeId)
                    ORDER BY
                    CreatedDate Desc
                    OFFSET @PageSize * (@PageNumber - 1) ROWS
                    FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE)");


            CreateStoredProcedure("Videos_SelectList",
               p => new
               {
                   PageNumber = p.Int(1),
                   PageSize = p.Int(8),
                   CategoryId = p.Int(0),
                   MaterialTypeId = p.Int(0),
                   SearchTerm = p.String(150, defaultValueSql: "NULL"),
                   IsPublished = p.Boolean(defaultValueSql: "NULL"),

               }, @"select V.[Id] , V.[Name],[Image],[Embed],[Link],
                    V.[CategoryId], V.[MaterialTypeId],[CreatedDate],
                    [IsPublished] 
                    from [dbo].[Videos] as V
                    --join [dbo].[Categories] as C
                    --on  @CategoryId!=0 and V.CategoryId=c.Id and V.CategoryId=@CategoryId
                    --join [dbo].[MaterialTypes] as M
                    --on  @MaterialTypeId!=0 and V.MaterialTypeId=M.Id and V.MaterialTypeId=@MaterialTypeId
                    where  (@SearchTerm is null or V.Name like '%' + @SearchTerm + '%' )
                    and V.IsPublished=ISNULL(@IsPublished,V.IsPublished)
                    and (@CategoryId=0 or V.CategoryId=@CategoryId)
                    and (@MaterialTypeId=0 or V.MaterialTypeId=@MaterialTypeId)
                    ORDER BY
                    CreatedDate Desc
                    OFFSET @PageSize * (@PageNumber - 1) ROWS
                    FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE)");




            CreateStoredProcedure("Summaries_SelectList",
             p => new
             {
                 PageNumber = p.Int(1),
                 PageSize = p.Int(8),
                 CategoryId = p.Int(0),
                 MaterialTypeId = p.Int(0),
                 SearchTerm = p.String(150, defaultValueSql: "NULL"),
                 IsPublished = p.Boolean(defaultValueSql: "NULL"),

             }, @"select V.[Id] , V.[Name],[Slogon],[Image],
                    V.[CategoryId], V.[MaterialTypeId],[CreatedDate],
                    [IsPublished] 
                    from [dbo].[Summaries] as V
                    --join [dbo].[Categories] as C
                    --on  @CategoryId!=0 and V.CategoryId=c.Id and V.CategoryId=@CategoryId
                    --join [dbo].[MaterialTypes] as M
                    --on  @MaterialTypeId!=0 and V.MaterialTypeId=M.Id and V.MaterialTypeId=@MaterialTypeId
                    where  (@SearchTerm is null or V.Name like '%' + @SearchTerm + '%' ) 
                    and V.IsPublished=ISNULL(@IsPublished,V.IsPublished)
                    and (@CategoryId=0 or V.CategoryId=@CategoryId)
                    and (@MaterialTypeId=0 or V.MaterialTypeId=@MaterialTypeId)
                    ORDER BY
                    CreatedDate Desc
                    OFFSET @PageSize * (@PageNumber - 1) ROWS
                    FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE)");
        }


        public override void Down()
        {
            DropStoredProcedure("Books_SelectList");
            DropStoredProcedure("Videos_SelectList");
            DropStoredProcedure("Summaries_SelectList");

        }
    }
}

