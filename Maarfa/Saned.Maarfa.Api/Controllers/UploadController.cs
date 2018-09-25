using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using Maarfa.Data.Core;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using Saned.Maarfa.Api.Dtos;
using Saned.Maarfa.Api.Models;

namespace Saned.Maarfa.Api.Controllers
{
     [RoutePrefix("api/Upload")]
    [Attributes.Authorize]
    public class UploadController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public UploadController()
        {
            _unitOfWork = new UnitOfWork();
        }

        [Attributes.Authorize(Roles = "Administrator")]
        [Route("Post")]
         [HttpPost]
         public HttpResponseMessage Post(BookViewModel book)
         {
             //SaveImageInFileSystem(book.Image64,"1kh",book.Extention);          
             return Request.CreateResponse(HttpStatusCode.OK);
         }


        public void SaveImageInFileSystem(string base64,string Id,string extention)
        {
            string filePath = (HostingEnvironment.MapPath($"~/Attachments/{Id}.{extention}"));

            if (base64 == null)
                return;

            //Byte[] bytes = Convert.FromBase64String(base64);
            //File.WriteAllBytes(filePath, resized);


            Byte[] bytes = Convert.FromBase64String(base64);
            Byte[] resized = Resize(bytes);
            File.WriteAllBytes(filePath, resized);

        }

        private Byte[] Resize(Byte[]  data)
         {
             using (var ms = new MemoryStream(data))
             {
                 var image = Image.FromStream(ms);

                var ratioX = (double)150 / image.Width;
                var ratioY = (double)50 / image.Height;
                var ratio = Math.Min(ratioX, ratioY);

                var width = (int)(image.Width * ratio);
                var height = (int)(image.Height * ratio);

                //400* 400 thumbnail
                //800* 800 thumbnail

                 width = 100;
                 height = 100;
                var newImage = new Bitmap(width, height);
                 Graphics.FromImage(newImage).DrawImage(image, 0, 0, width, height);
                 Bitmap bmp = new Bitmap(newImage);

                 ImageConverter converter = new ImageConverter();

                Byte[] Resizedata = (byte[]) converter.ConvertTo(bmp, typeof (byte[]));

                 return Resizedata;
             }
         }

         //public async Task<HttpResponseMessage> Post()
        //{
        //    if (!Request.Content.IsMimeMultipartContent())
        //    {
        //        throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        //    }

        //    string root = HttpContext.Current.Server.MapPath("~/App_Data");
        //    var provider = new MultipartFormDataStreamProvider(root);

        //    try
        //    {
        //        // Read the form data.
        //        await Request.Content.ReadAsMultipartAsync(provider);

        //        // This illustrates how to get the file names.
        //        foreach (MultipartFileData file in provider.FileData)
        //        {
        //            Trace.WriteLine(file.Headers.ContentDisposition.FileName);
        //            Trace.WriteLine("Server file path: " + file.LocalFileName);
        //        }
        //        return Request.CreateResponse(HttpStatusCode.OK);
        //    }
        //    catch (System.Exception e)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
        //    }


        //}



    }


}
