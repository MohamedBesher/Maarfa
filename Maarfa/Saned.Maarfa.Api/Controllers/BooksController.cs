using Maarfa.Data.Core;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using Saned.Maarfa.Api.Dtos;
using Saned.Maarfa.Api.Models;
using System;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;

namespace Saned.Maarfa.Api.Controllers
{
    [RoutePrefix("api/Books")]
    [Attributes.Authorize]
    public class BooksController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Resizer _resizer;
        private readonly Saver _saver;

        public BooksController()
        {
            _saver = new Saver();
            _unitOfWork = new UnitOfWork();
            _resizer = new Resizer();
        }

        [AllowAnonymous]
        [Route("BooksFullSearch")]
        [HttpPost]
        public async Task<IHttpActionResult> FullSearch([FromBody] PageingViewModel viewModel)
        {
            //must set value of categoryId and material TypeID 
            var items =
                await
                    _unitOfWork.Books.GetBooks(viewModel.PageNumber, viewModel.PageSize, viewModel.CategoryId,
                        viewModel.SearchTerm, viewModel.IsPublished);
            //int totalCount = 0;
            //if (items.Count != 0)
            //    totalCount = items[0].OverallCount;
            //PaginationSet<BookDto> pagedSet = new PaginationSet<BookDto>()
            //{
            //    Items = items,
            //    Page = viewModel.PageNumber,
            //    TotalCount = totalCount,
            //    TotalPages = (int)Math.Ceiling((decimal)totalCount / viewModel.PageSize)
            //};
            return Ok(items);
        }

        [Attributes.Authorize(Roles = "Administrator")]
        [Route("FullSearch")]
        [HttpPost]
        public async Task<IHttpActionResult> Search([FromBody] PageingViewModel viewModel)
        {
            var items =
           await
               _unitOfWork.Books.GetBooks(viewModel.PageNumber, viewModel.PageSize, viewModel.CategoryId,
                   viewModel.SearchTerm, viewModel.IsPublished);
            int totalCount = 0;
            if (items.Count != 0)
                totalCount = items[0].OverallCount;
            PaginationSet<BookDto> pagedSet = new PaginationSet<BookDto>()
            {
                Items = items,
                Page = viewModel.PageNumber,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling((decimal)totalCount / viewModel.PageSize)
            };
            return Ok(pagedSet);
        }
        [AllowAnonymous]

        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetBook(long id)
        {
            return Ok(await _unitOfWork.Books.GetBook(id));
        }
        [Attributes.Authorize(Roles = "Administrator")]
        [Route("SaveBook")]
        [HttpPost]
        public async Task<IHttpActionResult> Post(BookViewModel book)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //check if Book is new (Insert) 
                    if (book.Id <= 0)
                    {
                        await InsertBook(book);
                    }
                    else //check if Book is Exist (Updated)
                    {
                        await Modifybook(book);
                    }

                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        private async Task Modifybook(BookViewModel book)
        {
            Book edited = await _unitOfWork.Books.GetBook(book.Id);
            if (!string.IsNullOrEmpty(book.ImgExtention) || !string.IsNullOrEmpty(book.Image64))
            {
                string slogn = "/Attachments/Books/Thumbnails/" + book.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + book.ImgExtention;
                string imagePath = "/Attachments/Books/Images/" + book.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + book.ImgExtention;
                string filePath = (HostingEnvironment.MapPath($"~{slogn}"));
                string filePathImages = (HostingEnvironment.MapPath($"~{imagePath}"));
                _saver.SaveImageInFileSystem(book.Image64, filePath, filePathImages);
                edited.Modify(slogn, imagePath);
            }
            if (!string.IsNullOrEmpty(book.DownloadLinkExtention) || !string.IsNullOrEmpty(book.DownloadLink64))
            {
                string bookPath = "/Attachments/Books/Books/" + book.Id + "." + book.DownloadLinkExtention;
                string bookfile = (HostingEnvironment.MapPath($"~{bookPath}"));
                _saver.SaveFileInFileSystem(book.DownloadLink64, bookfile);
                edited.Modify(bookPath);
            }
            edited.Modify(book.Name, book.Description, true,
                book.CategoryId);
            await _unitOfWork.Complete();
        }

        private async Task InsertBook(BookViewModel book)
        {
            Book bo = new Book();
            try
            {
                bo = AutoMapper.Mapper.Map<BookViewModel, Book>(book);
                _unitOfWork.Books.InsertBook(bo);
                await _unitOfWork.Complete();
                // save images && file
                string slogn = "/Attachments/Books/Thumbnails/" + bo.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + book.ImgExtention;
                string imagePath = "/Attachments/Books/Images/" + bo.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + book.ImgExtention;
                string bookPath = "/Attachments/Books/Books/" + bo.Id + "." + book.DownloadLinkExtention;

                string filePath = (HostingEnvironment.MapPath($"~{slogn}"));
                string filePathImages = (HostingEnvironment.MapPath($"~{imagePath}"));
                string bookfile = (HostingEnvironment.MapPath($"~{bookPath}"));
                _saver.SaveImageInFileSystem(book.Image64, filePath, filePathImages);
                _saver.SaveFileInFileSystem(book.DownloadLink64, bookfile);

                bo.Slogon = slogn;
                bo.Image = imagePath;
                bo.DownloadLink = bookPath;
                bo.IsPublished = true;
                await _unitOfWork.Complete();

            }
            catch (Exception)
            {
                _unitOfWork.Books.Remove(bo);
                await _unitOfWork.Complete();

                throw;
            }
        }

        [Attributes.Authorize(Roles = "Administrator")]
        [Route("Delete/{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(long id)
        {
            try
            {
                if (id != 0)
                {
                    //check if Book is Exist (set is published to false)                  
                    Book removed = await _unitOfWork.Books.GetBook(id);
                    if (removed==null)
                         return BadRequest();
                    _unitOfWork.Books.Remove(removed);
                     await _unitOfWork.Complete();
                    return Ok();
                }
                else
                    return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
    }


}
