using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Web.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using DocumentaryManagement.EntityFrameworkCore.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace DocumentaryManagement.Core
{

    public abstract class AsyncCrudAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput>
       : AsyncCrudAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, DataSourceLoadOptions>
           where TEntity : class, IEntity<TPrimaryKey>
           where TEntityDto : IEntityDto<TPrimaryKey>
           where TUpdateInput : IEntityDto<TPrimaryKey>, IUpdateEntityDto
        where TCreateInput : new()
    {
        protected AsyncCrudAppServiceBase(IRepository<TEntity, TPrimaryKey> repository)
            : base(repository)
        {

        }
    }

    public abstract class AsyncCrudAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput, DevLoadOptions>
   : AsyncCrudAppService<TEntity, TEntityDto, TPrimaryKey, TGetAllInput, TCreateInput, TUpdateInput>
       where TEntity : class, IEntity<TPrimaryKey>
       where TEntityDto : IEntityDto<TPrimaryKey>
       where TUpdateInput : IEntityDto<TPrimaryKey>, IUpdateEntityDto
        where DevLoadOptions : DataSourceLoadOptionsBase
    where TCreateInput : new()
    {
        protected IDocumentaryManagementRepositoryBase<TEntity> AbpRepository;
        protected AsyncCrudAppServiceBase(IRepository<TEntity, TPrimaryKey> repository)
            : base(repository)
        {
            AbpRepository = (IDocumentaryManagementRepositoryBase<TEntity>)repository;
        }

        public override Task<TEntityDto> Update(TUpdateInput input)
        {
            var entity = Repository.Get(input.Id);
            if (entity == null) throw new NullReferenceException("Đối tượng không tồn tại trong hệ thống");
            MapToEntity(input, entity);
            AbpRepository.Before_InsertUpdate(entity);
            input.BeforeUpdate(AbpSession);
            StandardizedStringOfEntity(input);
            return base.Update(input);
        }

        public override Task<TEntityDto> Create(TCreateInput input)
        {
            StandardizedStringOfEntity(input);
            return base.Create(input);
        }

        //[ActionName("get-kendo")]
        //public virtual DataSourceResult GetKendo([DataSourceRequest]DataSourceRequest request)
        //{
        //    return Repository.GetAll().ToDataSourceResult(request);
        //}
        [HttpPost]
        [DontWrapResult]
        [ActionName("get-devextreme")]
        public virtual LoadResult GetDevExtreme(DevLoadOptions loadOptions)
        {
            return AbpRepository.GetDevExtreme(loadOptions);
        }
        [ActionName("get-paging")]
        public override Task<PagedResultDto<TEntityDto>> GetAll(TGetAllInput input)
        {
            return base.GetAll(input);
        }

        [HttpPost]
        [DontWrapResult]
        [ActionName("store-create")]
        public async Task<IActionResult> StoreCreate(string values)
        {
            TCreateInput item = new TCreateInput();
            JsonConvert.PopulateObject(values, item);
            try
            {
                TEntityDto result = await base.Create(item);
                if (result != null) return new OkResult();
                else return new BadRequestResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [HttpPut]
        [DontWrapResult]
        [ActionName("store-edit")]
        public async Task<IActionResult> StoreEdit(TPrimaryKey key, string values)
        {
            TEntity item = Repository.Get(key);
            JsonConvert.PopulateObject(values, item);
            try
            {
                TEntity result = await Repository.UpdateAsync(item);
                if (result != null) return new OkResult();
                else return new BadRequestResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
        [HttpDelete]
        [DontWrapResult]
        [ActionName("store-delete")]
        public async Task<IActionResult> StoreDelete(TPrimaryKey key)
        {
            try
            {
                await Repository.DeleteAsync(key);
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }
        /// <summary>
        /// Chuẩn hóa các properties có kiểu chuỗi trong entity
        /// </summary>
        protected virtual void StandardizedStringOfEntity(object entity)
        {
            foreach (System.Reflection.PropertyInfo item in entity.GetType().GetProperties())
            {
                if (item.GetMethod.IsPublic && item.GetMethod.ReturnType == typeof(string))
                {
                    object _value = item.GetValue(entity);
                    if (_value != null)
                    {
                        item.SetValue(entity, _value.ToString().Trim());
                    }
                }
            }
        }
    }
}
