using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maarfa.Data.Core.Models
{

    public class Summary
    {
        public Summary()
        {
            CreatedDate = DateTime.Now;
        }
        public long Id { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// define Summary Small Image Path
        /// </summary>
        public string Slogon { get; set; }
        /// <summary>
        /// define Summary Small Image Path
        /// </summary>
        public string Image { get; set; }
        public bool IsPublished { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
       /// public int MaterialTypeId { get; set; }
        public DateTime CreatedDate { get; set; }


        //public MaterialType MaterialType { get; set; }
        public void UnPublish()
        {
            IsPublished = false;
        }

        public void Modify(string name, string slogon, string image, bool isPublished, int categoryId)
        {
            Name = name;
            IsPublished = isPublished;
            CategoryId = categoryId;
        }

        public void Modify(string slogn, string imagePath)
        {
            Slogon = slogn;
            Image = imagePath;
        }

        public void Modify(string name, bool isPublished, int categoryId)
        {
            Name = name;
            IsPublished = isPublished;
            CategoryId = categoryId;
        }
    }
}
