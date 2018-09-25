using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Maarfa.Data.Core;
using Maarfa.Data.Core.Models;
using Saned.Maarfa.Api.Models;

namespace Saned.Maarfa.Api.Controllers
{
    [RoutePrefix("api/ContactUs")]
    [Attributes.Authorize]
    public class ContactUsController : ApiController
    {

        private readonly IUnitOfWork _unitOfWork;

        public ContactUsController()
        {
            _unitOfWork = new UnitOfWork();
        }

        [Route("")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetAll()
        {
            return Ok(await _unitOfWork.ContactUss.GetContacts());
        }
        [Attributes.Authorize(Roles = "Administrator")]
        [Route("SaveContactUs")]
        [HttpPost]
        public async Task<IHttpActionResult> Post(ContactUs contact)
        {
            try
            {
                    
                    if (contact.Id >= 0)
                    {
                        ContactUs selected= await _unitOfWork.ContactUss.GetContacts();
                        if(selected==null) return BadRequest("غير موجود بالنظام.");
                        selected.Email = contact.Email;
                        selected.Phone = contact.Phone;
                        selected.AboutUs = contact.AboutUs;
                        await _unitOfWork.Complete();
                         return Ok();
                     }
                    else
                    {
                    return BadRequest("غير موجود بالنظام.");
                }                                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }



        //[Attributes.Authorize(Roles = "Administrator")]
        //[Route("SaveAboutUs")]
        //[HttpPost]
        //public async Task<IHttpActionResult> Post(ContactUs contact)
        //{
        //    try
        //    {

        //        if (!string.IsNullOrEmpty(contact.AboutUs))
        //        {
        //            ContactUs selected = await _unitOfWork.ContactUss.GetContacts();
        //            if (selected == null) return BadRequest("غير موجود بالنظام.");
        //            selected.AboutUs = contact.AboutUs;
        //            await _unitOfWork.Complete();
        //            return Ok();
        //        }
        //        else
        //        {
        //            return BadRequest("غير موجود بالنظام.");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);

        //    }
        //}

    }
}
