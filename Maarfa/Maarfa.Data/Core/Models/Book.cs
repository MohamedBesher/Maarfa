using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maarfa.Data.Core.Models
{
    public class Book

    {
        public Book()
        {
            CreatedDate = DateTime.Now;
        }
        public long Id { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// define Path of Small image.
        /// </summary>
        public string Slogon { get; set; }

        public string Description { get; set; }
        /// <summary>
        /// define Path of Large image.
        /// </summary>
        public string  Image { get; set; }

        /// <summary>
        /// define path of Book to be able to download or view .
        /// </summary>
        public string  DownloadLink { get; set; }

        public DateTime CreatedDate { get; set; }
        public bool IsPublished { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }


        public void UnPublish()
        {
            IsPublished = false;
        }

        public void Modify( string name, string description, bool isPublished,
                             int categoryId)
        {
            Name = name;
            Description = description;   
            IsPublished = isPublished;
            CategoryId = categoryId;
        }

        public void Modify(string slogn, string imagePath)
        {
            Slogon = slogn;
            Image = imagePath;
        }

        public void Modify(string bookPath)
        {
            DownloadLink = bookPath;
        }

        // public int MaterialTypeId { get; set; }

        //public MaterialType MaterialType { get; set; }
    }
}