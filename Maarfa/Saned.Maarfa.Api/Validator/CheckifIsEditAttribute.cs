using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Maarfa.Data.Core.Models;
using Saned.Maarfa.Api.Models;

namespace Saned.Maarfa.Api.Validator
{
    public class CheckifIsEditAttribute : ValidationAttribute
    {
        private readonly string _propertyname;
        public CheckifIsEditAttribute(string isEdit)
        {
            this._propertyname = isEdit;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var containerType = validationContext.ObjectInstance.GetType();

            var field = containerType.GetProperty(_propertyname);
            var sentProperty = field.GetValue(validationContext.ObjectInstance, null);

            var owner = validationContext.ObjectInstance as BookViewModel;
            if (sentProperty != null || value!=null)
            {
                return ValidationResult.Success;

            }
            else
                return new ValidationResult("هذا الحقل مطلوب.");

        }
            //var facility = containerType.GetProperty("FacilitytId");
            //var extensionValue = facility.GetValue(validationContext.ObjectInstance, null);      
        }
    }
