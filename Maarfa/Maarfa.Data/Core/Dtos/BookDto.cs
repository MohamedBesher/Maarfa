using System;

namespace Maarfa.Data.Core.Dtos
{
    public class BookDto : Overall

    {
        public long Id { get; set; }
        public string Name { get; set; }

        public string Slogon { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }


        public string DownloadLink { get; set; }

        public DateTime CreatedDate { get; set; }

    }
}