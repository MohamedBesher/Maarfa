using System;
using System.ComponentModel.DataAnnotations;
using Maarfa.Data.Core.Models;
using Saned.Maarfa.Api.Validator;

namespace Saned.Maarfa.Api.Models
{
    public class VideoViewModel
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "الاسم مطلوب")]
        [MaxLength(150, ErrorMessage = "الاسم لا يزيد عن 150 حرف")]

        public string Name { get; set; }
        /// <summary>
        /// define Youtube Video Small Image Path
        /// </summary>
        ///         [Required(ErrorMessage = "الوصف مطلوب")]

        [CheckifIsEdit("Image")]
        public string Imgfilename { get; set; }

        [CheckifIsEdit("Image")]
        public string Image64 { get; set; }

        public string ImgExtention
        {
            get
            {
                //if (Imgfilename != null)
                //    return Imgfilename.Contains(".") ? Imgfilename.Split(new[] { '.' })[1] : Imgfilename;
                return "png";
            }
            set { }
        }
        public string Image { get; set; }
        /// <summary>
        /// define embed Link (Iframe)
        /// </summary>
        [Required(ErrorMessage = "رابط الفيديو مطلوب")]

        public string Embed { get; set; }
        /// <summary>
        /// define Youtube Video Path
        /// </summary>
        public string Link { get; set; }
        public bool IsPublished { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Required(ErrorMessage = "فئة الفيديو مطلوب")]

        public int CategoryId { get; set; }

    }
}