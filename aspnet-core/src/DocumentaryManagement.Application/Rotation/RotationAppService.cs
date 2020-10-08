using DocumentaryManagement.Rotation.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Rotation;
using DocumentaryManagement.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DevExtreme.AspNet.Mvc;

namespace DocumentaryManagement.Rotation
{
    public class RotationAppService : AsyncCrudAppServiceBase<AppRotation, RotationDto, long, PagedRotationRequestDto, CreateRotationDto, RotationDto, DataSourceLoadOptions>, IRotationAppService
    {
        public RotationAppService(IRotationRepository repository) : base(repository)
        {

        }


        [HttpPost]
        [ActionName("send")]
        public async Task<IEnumerable<RotationDto>> Send(CreateRotationDto input)
        {
            var items = input.CreateData(AbpSession.UserId);
            await ((IRotationRepository)AbpRepository).Send(items);
            CurrentUnitOfWork.SaveChanges();
            return items.Select(p => MapToEntityDto(p));
        }

        [HttpGet]
        [ActionName("view")]
        public async Task<RotationDto> View(long documentId)
        {
            long userId = AbpSession.UserId ?? 0;
            var item = await ((IRotationRepository)AbpRepository).SetView(documentId, userId);
            return MapToEntityDto(item);
        }
    }
}
