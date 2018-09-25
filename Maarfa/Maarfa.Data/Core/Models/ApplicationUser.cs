using System;

namespace Maarfa.Data.Core.Models
{
    public partial class ApplicationUser 
    {
        public ApplicationUser()
        {
            IsDeleted = false;
            CreatedDate=DateTime.Now;
            LasUpdateDate = DateTime.Now;

        }
        public string Name { get; set; }
        public bool? Gender { get; set; }
        public DateTime? BirthDay { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LasUpdateDate { get; set; }
        public bool? IsDeleted { get; set; }
        public string ConfirmedEmailToken { get; set; }
        public string ResetPasswordlToken { get; set; }


    }
}
