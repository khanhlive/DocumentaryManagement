using Abp.Application.Services.Dto;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using DocumentaryManagement.Config.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Config;
using DocumentaryManagement.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DocumentaryManagement.Config
{
    public class ConfigAppService : AsyncCrudAppServiceBase<AppConfig, ConfigDto, int, PagedConfigRequestDto, CreateConfigDto, UpdateConfigDto>, IConfigAppService
    {
        public ConfigAppService(IConfigRepository repository) : base(repository)
        {

        }

        [HttpGet]
        [ActionName("get-config")]
        public async Task<ConfigDto> GetConfig()
        {
            var config = await ((IConfigRepository)AbpRepository).GetAppConfig();
            if (config == null)
            {
                return null;
            }
            else
                return MapToEntityDto(config);
        }

        [HttpPost]
        [ActionName("update-config")]
        public async Task<ConfigDto> UpdateConfig(CreateConfigDto input)
        {
            CheckCreatePermission();
            var entity = MapToEntity(input);
            var userId = this.AbpSession.UserId;
            var config = await ((IConfigRepository)AbpRepository).FirstOrDefaultAsync(p => p.UserId == userId);
            if (config == null)
            {
                entity.Id = 0;
                entity.UserId = userId ?? 0;
                entity.CreationId = userId ?? 0;
                entity.CreationDate = DateTime.Now;
                var item = await Repository.InsertAsync(entity);
                await CurrentUnitOfWork.SaveChangesAsync();
                return MapToEntityDto(item);
            }
            else
            {
                config.UpdatedId = userId ?? 0;
                config.UpdatedDate = DateTime.Now;
                config.Singer = entity.Singer;
                config.ApprovedBy = entity.ApprovedBy;
                config.Sender = entity.Sender;
                config.AgencyIssuedId = entity.AgencyIssuedId;
                config.ReceivedBy = entity.ReceivedBy;
                await CurrentUnitOfWork.SaveChangesAsync();
                return MapToEntityDto(config);
            }
        }

        #region Exclude

        [NonAction]
        public override Task<ConfigDto> Create(CreateConfigDto input)
        {
            return base.Create(input);
        }

        [NonAction]
        public override Task<ConfigDto> Update(UpdateConfigDto input)
        {
            return base.Update(input);
        }

        [NonAction]
        public override LoadResult GetDevExtreme(DataSourceLoadOptions loadOptions)
        {
            return base.GetDevExtreme(loadOptions);
        }

        [NonAction]
        public override Task<PagedResultDto<ConfigDto>> GetAll(PagedConfigRequestDto input)
        {
            return base.GetAll(input);
        }

        [NonAction]
        public override Task Delete(EntityDto<int> input)
        {
            return base.Delete(input);
        }

        [NonAction]
        public override Task<ConfigDto> Get(EntityDto<int> input)
        {
            return base.Get(input);
        }

        [NonAction]
        public override Task<IActionResult> StoreCreate(string values)
        {
            return base.StoreCreate(values);
        }

        [NonAction]
        public override Task<IActionResult> StoreDelete(int key)
        {
            return base.StoreDelete(key);
        }

        [NonAction]
        public override Task<IActionResult> StoreEdit(int key, string values)
        {
            return base.StoreEdit(key, values);
        }
        #endregion
    }
}
