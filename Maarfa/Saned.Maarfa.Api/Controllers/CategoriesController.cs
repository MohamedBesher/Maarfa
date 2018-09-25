using Maarfa.Data.Core;
using Maarfa.Data.Core.Dtos;
using Maarfa.Data.Core.Models;
using Saned.Maarfa.Api.Dtos;
using Saned.Maarfa.Api.Models;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace Saned.Maarfa.Api.Controllers
{
    [RoutePrefix("api/Categories")]
    public class CategoriesController : ApiController
    {

        private readonly IUnitOfWork _unitOfWork;

        public CategoriesController()
        {
            _unitOfWork = new UnitOfWork();
        }
        [AllowAnonymous]
        [Route("GetAll")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAll()
        {
            return Ok(await _unitOfWork.Categories.GetCategories());
        }

        [Attributes.Authorize(Roles = "Administrator")]
        [Route("FullSearch")]
        [HttpPost]
        public async Task<IHttpActionResult> Search([FromBody] CategoryViewModel viewModel)
        {
            var items = await _unitOfWork.Categories.GetCategoriesWithPageing(
                viewModel.PageNumber,
                viewModel.PageSize,
                viewModel.SearchTerm,
               false
               );

            int totalCount = 0;
            if (items.Count != 0)
                totalCount = items[0].OverallCount;
            PaginationSet<CategoryDto> pagedSet = new PaginationSet<CategoryDto>()
            {
                Items = items,
                Page = viewModel.PageNumber,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling((decimal)totalCount / viewModel.PageSize)
            };
            return Ok(pagedSet);
        }



        [Route("SaveCategory")]
        [HttpPost]
        [Attributes.Authorize(Roles = "Administrator")]
        public async Task<IHttpActionResult> Post([FromBody] Category category)
        {
            if (category.Id == 0)
            {
                _unitOfWork.Categories.Add(category);
            }
            else
            {
                var bo = _unitOfWork.Categories.View(category.Id);
                bo.Modfiy(category.Name);
            }
            await _unitOfWork.Complete();
            return Ok();

        }

        // Get Details of speciality


        [HttpGet]
        [Attributes.Authorize(Roles = "Administrator")]
        [Route("{id}")]
        public async Task<IHttpActionResult> Get(int id)
        {
            return Ok(await _unitOfWork.Categories.ViewDetails(id));
        }

        // Delete speciality if it is not used


        [HttpDelete]
        [Authorize(Roles = "Administrator")]
        [Route("Delete/{id}")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            Category category = _unitOfWork.Categories.View(id);
            if (category != null)
            {
                bool isUsed = _unitOfWork.Categories.IsUsed(id);
                if (!isUsed)
                {
                    _unitOfWork.Categories.Delete(category);
                    await _unitOfWork.Complete();
                    return Ok("Done");
                }
                else
                {
                    return BadRequest("لا يمكنك حذف هذا التخصص.");
                }
            }
            else
            {
                return BadRequest("هذا التخصص غير موجود .");
            }

        }


    }
}
