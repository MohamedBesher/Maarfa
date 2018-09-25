using System;

namespace Maarfa.Data.Core.Dtos
{
    public class SummaryDto : Overall
    {
        public long Id { get; set; }
        public string Name { get; set; }      
        public string Slogon { get; set; }      
        public string Image { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}