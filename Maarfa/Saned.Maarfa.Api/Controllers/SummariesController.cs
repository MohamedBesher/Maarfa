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
    [RoutePrefix("api/Summaries")]
    [Attributes.Authorize]
    public class SummariesController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Resizer _resizer;
        private readonly Saver _saver;

        public SummariesController()
        {
            _saver = new Saver();
            _unitOfWork = new UnitOfWork();
            _resizer = new Resizer();
        }

        [AllowAnonymous]
        [Route("SummariesFullSearch")]
        [HttpPost]
        public async Task<IHttpActionResult> FullSearch([FromBody] PageingViewModel viewModel)
        {
            var items = await
                    _unitOfWork.Summaries.GetSummaries(viewModel.PageNumber, viewModel.PageSize, viewModel.CategoryId,
                        viewModel.SearchTerm, viewModel.IsPublished);
            //int totalCount = 0;
            //if (items.Count != 0)
            //    totalCount = items[0].OverallCount;
            //PaginationSet<SummaryDto> pagedSet = new PaginationSet<SummaryDto>()
            //{
            //    Items = items,
            //    Page = viewModel.PageNumber,
            //    TotalCount = totalCount,
            //    TotalPages = (int)Math.Ceiling((decimal)totalCount / viewModel.PageSize)
            //};
            return Ok(items);
        }

        [AllowAnonymous]
        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetSummary(long id)
        {
            return Ok(await _unitOfWork.Summaries.GetSummary(id));
        }

        [Attributes.Authorize(Roles = "Administrator")]
        [Route("FullSearch")]
        [HttpPost]
        public async Task<IHttpActionResult> Search([FromBody] PageingViewModel viewModel)
        {
            var items = await
                     _unitOfWork.Summaries.GetSummaries(viewModel.PageNumber, viewModel.PageSize, viewModel.CategoryId,
                         viewModel.SearchTerm, viewModel.IsPublished);

            int totalCount = 0;
            if (items.Count != 0)
                totalCount = items[0].OverallCount;
            PaginationSet<SummaryDto> pagedSet = new PaginationSet<SummaryDto>()
            {
                Items = items,
                Page = viewModel.PageNumber,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling((decimal)totalCount / viewModel.PageSize)
            };
            return Ok(pagedSet);
        }

        [Attributes.Authorize(Roles = "Administrator")]
        [Route("SaveSummary")]
        [HttpPost]
        public async Task<IHttpActionResult> Post(SummaryViewModel summary)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //check if summary is new (Insert) 
                    if (summary.Id <= 0)
                    {
                        await InsertSummary(summary);
                    }
                    else //check if summary is Exist (Updated)
                    {
                        await ModifySummary(summary);
                    }
                    return Ok();
                }
                else
                    return BadRequest(ModelState);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        private async Task ModifySummary(SummaryViewModel summary)
        {
            Summary edited = await _unitOfWork.Summaries.GetSummary(summary.Id);
            if (!string.IsNullOrEmpty(summary.ImgExtention) || !string.IsNullOrEmpty(summary.Image64))
            {
                string slogn = "/Attachments/Summaries/Thumbnails/" + summary.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + summary.ImgExtention;
                string imagePath = "/Attachments/Books/Images/" + summary.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + summary.ImgExtention;

                string filePath = (HostingEnvironment.MapPath($"~{slogn}"));
                string filePathImages = (HostingEnvironment.MapPath($"~{imagePath}"));
                _saver.SaveImageInFileSystem(summary.Image64, filePath, filePathImages);

                edited.Modify(slogn, imagePath);
            }

            edited.Modify(summary.Name, true,
                summary.CategoryId);
            await _unitOfWork.Complete();
        }

        private async Task InsertSummary(SummaryViewModel summary)
        {
            Summary bo = new Summary();
            try
            {
                bo = AutoMapper.Mapper.Map<SummaryViewModel, Summary>(summary);
                _unitOfWork.Summaries.Insert(bo);
                await _unitOfWork.Complete();
                // save images && file
                string slogn = "/Attachments/Summaries/Thumbnails/" + bo.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + summary.ImgExtention;
                string imagePath = "/Attachments/Summaries/Images/" + bo.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + summary.ImgExtention;
                string filePathImages = (HostingEnvironment.MapPath($"~{imagePath}"));
                string filePath = (HostingEnvironment.MapPath($"~{slogn}"));
                _saver.SaveImageInFileSystem(summary.Image64, filePath, filePathImages);
                bo.Slogon = slogn;
                bo.Image = imagePath;
                bo.IsPublished = true;
                await _unitOfWork.Complete();

            }
            catch (Exception)
            {
                _unitOfWork.Summaries.Remove(bo);
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
                    Summary removed = await _unitOfWork.Summaries.GetSummary(id);
                    if (removed == null)
                        return BadRequest();
                    _unitOfWork.Summaries.Remove(removed);                  
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
