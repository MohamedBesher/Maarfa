using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Saned.Maarfa.Api.Validator;

namespace Saned.Maarfa.Api.Models
{
    public class BookViewModel
    {

        public long Id { get; set; }

        [Required(ErrorMessage = "الاسم مطلوب")]
        [MaxLength(150, ErrorMessage = "الاسم لا يزيد عن 150 حرف")]

        public string Name { get; set; }

        public string Slogon { get; set; }
        [Required(ErrorMessage = "الوصف مطلوب")]

        public string Description { get; set; }
       

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
        public string Image { get; set; }

        #endregion


        #region downloadLink
                public string DownloadLink { get; set; }
        [CheckifIsEdit("DownloadLink")]


        public string DownloadLinkfilename { get; set; }

                public string DownloadLinkExtention
                {
                    get
                    {
                        if (DownloadLinkfilename != null)
                            return DownloadLinkfilename.Contains(".") ? DownloadLinkfilename.Split(new[] { '.' }).Last() : DownloadLinkfilename;
                        return DownloadLinkfilename;
                    }
                    set { }
                }
        [CheckifIsEdit("DownloadLink")]
        public string DownloadLink64 { get; set; }
        #endregion

        public DateTime CreatedDate { get; set; }=DateTime.Now;
        public bool IsPublished { get; set; }
        [Required(ErrorMessage = "فئةالكتاب مطلوب")]

        public int CategoryId { get; set; }
    }
}