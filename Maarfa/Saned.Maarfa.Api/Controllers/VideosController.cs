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
    [RoutePrefix("api/Videos")]
    [Attributes.Authorize]
    public class VideosController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Resizer _resizer;
        private readonly Saver _saver;
        public VideosController()
        {
            _saver = new Saver();
            _unitOfWork = new UnitOfWork();
            _resizer = new Resizer();
        }

        [AllowAnonymous]
        [Route("VideosFullSearch")]
        [HttpPost]
        public async Task<IHttpActionResult> FullSearch([FromBody] PageingViewModel viewModel)
        {
            var items = await
                    _unitOfWork.Videos.GetVideos(viewModel.PageNumber, viewModel.PageSize, viewModel.CategoryId,
                        viewModel.SearchTerm, viewModel.IsPublished);

            return Ok(items);

        }

        [Attributes.Authorize(Roles = "Administrator")]
        [Route("FullSearch")]
        [HttpPost]
        public async Task<IHttpActionResult> Search([FromBody] PageingViewModel viewModel)
        {
            var items = await
                     _unitOfWork.Videos.GetVideos(viewModel.PageNumber, viewModel.PageSize, viewModel.CategoryId,
                         viewModel.SearchTerm, viewModel.IsPublished);
            int totalCount = 0;
            if (items.Count != 0)
                totalCount = items[0].OverallCount;
            PaginationSet<VideoDto> pagedSet = new PaginationSet<VideoDto>()
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
        public async Task<IHttpActionResult> GetVideo(long id)
        {
            return Ok(await _unitOfWork.Videos.GetVideo(id));
        }

        [Attributes.Authorize(Roles = "Administrator")]
        [Route("SaveVideo")]
        [HttpPost]
        public async Task<IHttpActionResult> Post(VideoViewModel video)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //check if Video is new (Insert) 
                    if (video.Id <= 0)
                    {
                        await InsertVideo(video);
                    }
                    else //check if Video is Exist (Updated)
                    {
                        await ModifyVideo(video);
                    }
                    await _unitOfWork.Complete();
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

        private async Task ModifyVideo(VideoViewModel video)
        {
            Video edited = await _unitOfWork.Videos.GetVideo(video.Id);
            if (!string.IsNullOrEmpty(video.ImgExtention) || !string.IsNullOrEmpty(video.Image64))
            {
                string slogn = "/Attachments/Videos/Thumbnails/" + video.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + video.ImgExtention;
                string filePath = (HostingEnvironment.MapPath($"~{slogn}"));
                _saver.SaveImageInFileSystem(video.Image64, filePath);
                edited.Modify(slogn);
            }

            edited.Modify(video.Name, video.Link, true,
                video.CategoryId);
            await _unitOfWork.Complete();
        }

        private async Task InsertVideo(VideoViewModel video)
        {
            Video bo = new Video();
            try
            {
                bo = AutoMapper.Mapper.Map<VideoViewModel, Video>(video);
                _unitOfWork.Videos.Insert(bo);
                await _unitOfWork.Complete();
                // save images && file
                string slogn = "/Attachments/Videos/Thumbnails/" + bo.Id + "-" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "." + video.ImgExtention;

                string filePath = (HostingEnvironment.MapPath($"~{slogn}"));
                _saver.SaveImageInFileSystem(video.Image64, filePath);
                bo.Image = slogn;
                bo.IsPublished = true;
                await _unitOfWork.Complete();

            }
            catch (Exception)
            {
                _unitOfWork.Videos.Remove(bo);
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
                    //check if Video is Exist (set is published to false)                  
                    Video removed = await _unitOfWork.Videos.GetVideo(id);
                    if (removed == null)
                        return BadRequest();
                    _unitOfWork.Videos.Remove(removed);
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
