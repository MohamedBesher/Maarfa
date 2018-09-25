using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maarfa.Data.Core.Dtos
{
    public class VideoDto: Overall
    {
        public long Id { get; set; }
        public string Name { get; set; }     
        public string Image { get; set; }  
        public string Embed { get; set; }
        public string Link { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
