using System;
using System.ComponentModel.DataAnnotations;
using Maarfa.Data.Core.Models;
using Saned.Maarfa.Api.Validator;

namespace Saned.Maarfa.Api.Models
{
    public class SummaryViewModel
    {

        public long Id { get; set; }
        [Required(ErrorMessage = "الاسم مطلوب")]
        [MaxLength(150,ErrorMessage = "الاسم لا يزيد عن 150 حرف")]
        public string Name { get; set; }
        /// <summary>
        /// define Summary Small Image Path
        /// </summary>

        #region Image

        [CheckifIsEdit("Slogon")]
        public string Image64 { get; set; }

        [CheckifIsEdit("Slogon")]
        public string Imgfilename { get; set; }

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

        #endregion
        public string Slogon { get; set; }
        /// <summary>
        /// define Summary Small Image Path
        /// </summary>
        ///        

        public string Image { get; set; }
        public bool IsPublished { get; set; }
        [Required(ErrorMessage = "فئة الملخص مطلوب")]

        public int CategoryId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}