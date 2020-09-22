using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DocumentaryManagement.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Province
{
    public class ProvinceRepository : DocumentaryManagementRepositoryBase<AppProvince>, IProvinceRepository
    {
        public ProvinceRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppProvince> SetEntityIncludes(IQueryable<AppProvince> entities)
        {
            return entities.Where(p => !p.IsDeleted);
        }


        public override void Before_InsertUpdate(AppProvince entity)
        {
            AppProvince item = this.FirstOrDefault(p => p.Code == entity.Code && p.Id != entity.Id);
            if (entity.Id == 0)
            {
                entity.CreationDate = DateTime.Now;
                entity.CreationId = AbpSession.UserId.Value;
            }
            else
            {
                entity.UpdatedDate = DateTime.Now;
                entity.UpdatedId = AbpSession.UserId.Value;
            }
            if (item != null)
            {
                throw new UserFriendlyException($"Mã tỉnh thành: \"{entity.Code}\" đã tồn tại trong hệ thống");
            }
        }

        public override void Delete(AppProvince entity)
        {
            if (this.Context.Users.Any(p => p.ProvinceId == entity.Id))
            {
                throw new UserFriendlyException($"Tình thành: \"{entity.Name}\" đang được sử dụng, không thể xóa");
            }
            base.Delete(entity);
        }

    }
}
