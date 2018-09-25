using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Maarfa.Data.Core.Models
{
    public class Video

    {
        public Video()
        {
            CreatedDate=DateTime.Now;
        }
        public long Id { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// define Youtube Video Small Image Path
        /// </summary>
        public string Image { get; set; }
        /// <summary>
        /// define embed Link (Iframe)
        /// </summary>
        public string  Embed { get; set; }
        /// <summary>
        /// define Youtube Video Path
        /// </summary>
        public string Link { get; set; }
        public bool IsPublished { get; set; }

        public DateTime CreatedDate { get; set; }

        public Category Category { get; set; }
        //public MaterialType MaterialType { get; set; }

        public int CategoryId { get; set; }
        // public int MaterialTypeId { get; set; }


        public void UnPublish()
        {
            IsPublished = false;
        }
        public void Modify(string image)
        {
            Image = image;
        }
      
        public void Modify(string name,string link
            , bool isPublished, int categoryId)
        {
            Name = name;
            Embed = link;
            Link = link;
            IsPublished = isPublished;
            CategoryId = categoryId;
        }
    }
}
