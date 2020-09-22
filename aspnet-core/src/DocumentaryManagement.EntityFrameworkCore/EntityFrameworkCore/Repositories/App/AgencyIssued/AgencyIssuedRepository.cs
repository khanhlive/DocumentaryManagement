using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DocumentaryManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.AgencyIssued
{
    public class AgencyIssuedRepository : DocumentaryManagementRepositoryBase<AppAgencyIssued>, IAgencyIssuedRepository
    {
        public AgencyIssuedRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppAgencyIssued> SetEntityIncludes(IQueryable<AppAgencyIssued> entities)
        {
            return entities.Where(p => !p.IsDeleted);
        }


        public override void Before_InsertUpdate(AppAgencyIssued entity)
        {
            AppAgencyIssued item = this.FirstOrDefault(p => p.Code == entity.Code && p.Id != entity.Id);
            if (entity.Id == 0)
            {
                entity.CreationDate = DateTime.Now;
                entity.CreationId = (int?)AbpSession.UserId.Value;
            }
            else
            {
                entity.UpdatedDate = DateTime.Now;
                entity.UpdatedId = (int?)AbpSession.UserId.Value;
            }
            if (item != null)
            {
                throw new UserFriendlyException($"Mã cơ quan ban hành: \"{entity.Code}\" đã tồn tại trong hệ thống");
            }
        }

        public override void Delete(AppAgencyIssued entity)
        {
            if (this.Context.AppDocumentary.Any(p => p.AgencyIssuedId == entity.Id))
            {
                throw new UserFriendlyException($"Cơ quan ban hành: \"{entity.Name}\" đang được sử dụng");
            }
            else
            if (this.Context.AppDocumentaryPersonal.Any(p => p.AgencyIssuedId == entity.Id))
            {
                throw new UserFriendlyException($"Cơ quan ban hành: \"{entity.Name}\" đang được sử dụng");
            }
            else
            if (this.Context.AppConfig.Any(p => p.AgencyIssuedId == entity.Id))
            {
                throw new UserFriendlyException($"Cơ quan ban hành: \"{entity.Name}\" đang được sử dụng");
            }
            base.Delete(entity);
        }

    }
}
