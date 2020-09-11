using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DocumentaryManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.DocumentaryPersonal
{
    public class DocumentaryPersonalRepository : DocumentaryManagementRepositoryBase<AppDocumentaryPersonal>, IDocumentaryPersonalRepository
    {
        public DocumentaryPersonalRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppDocumentaryPersonal> SetEntityIncludes(DbSet<AppDocumentaryPersonal> entities)
        {
            return entities.Where(p => !p.IsDeleted).Include(p=>p.DocumentType).Include(p=>p.AgencyIssued);
        }


        public override void Before_InsertUpdate(AppDocumentaryPersonal entity)
        {
            AppDocumentaryPersonal item = this.FirstOrDefault(p => p.Code == entity.Code && p.Id != entity.Id);
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
                throw new UserFriendlyException($"Mã cơ quan ban hành: \"{entity.Code}\" đã tồn tại trong hệ thống");
            }
        }
        
    }
}
