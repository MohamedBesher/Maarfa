namespace Saned.Maarfa.Api.Models
{
    public class PageingViewModel
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 8;
        public int CategoryId { get; set; } = 0;
        public string SearchTerm { get; set; } = null;
        public bool IsPublished { get; set; } = true;


    }

    public class CategoryViewModel
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 8;
        public string SearchTerm { get; set; } = null;


    }
}