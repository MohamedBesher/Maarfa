

using System;

namespace Maarfa.Data.Core.Dtos
{
    public class RegisterData
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PhoneCode { get; set; }
    }

    public class RegisterUserData: RegisterData
    {
        public bool Gender { get; set; }
        public DateTime BirthDay { get; set; }
        public string SoicalMediaId { get; set; }

    }

    public class RegisterDoctorData : RegisterData
    {
        public string FacilityPhoneCode { get; set; }
        public int FacilityId { get; set; }
        public string University { get; set; }
        public string Degree { get; set; }
        public int GraduationYear { get; set; }
        public int YearOfExperience { get; set; }
        public int MedicalSpecialtyId { get; set; }
        public string HealthSpecialiesId { get; set; }
        public bool Gender { get; set; }
        public DateTime BirthDay { get; set; }
        public string Id { get; set; }
    }

    public class RegisterAgentData : RegisterData
    {
        public int FacilitytId { get; set; }
        public string FacilityPhoneCode { get; set; }

        //public string FacilityName { get; set; }
        //public string FacilityLatitude { get; set; }
        //public string FacilityLongitude { get; set; }
        //public int FacilityDistrictId { get; set; }
        //public string FacilityPhoneNumber { get; set; }
    }
}