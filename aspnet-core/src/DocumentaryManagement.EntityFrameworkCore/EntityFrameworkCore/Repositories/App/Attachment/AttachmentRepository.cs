using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using DocumentaryManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Attachment
{
    public class AttachmentRepository : DocumentaryManagementRepositoryBase<AppAttachments>, IAttachmentRepository
    {
        public AttachmentRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppAttachments> SetEntityIncludes(IQueryable<AppAttachments> entities)
        {
            return entities.Where(p => !p.IsDeleted);
        }


        public override void Before_InsertUpdate(AppAttachments entity)
        {
            if (entity.Id == 0)
            {
                entity.CreationDate = DateTime.Now;
                entity.CreationId = (int?)AbpSession.UserId.Value;
            }
        }

        public async Task<IEnumerable<AppAttachments>> GetByDocumentaryPersonalId(int documentaryPersonalId)
        {
            return await this.GetAllListAsync(p => p.DocumentaryPersonalId == documentaryPersonalId);
        }

        public async Task<IEnumerable<AppAttachments>> GetByDocumentaryId(int documentaryId,int type)
        {
            return await this.GetAllListAsync(p => p.DocumentaryId == documentaryId && p.Type==type);
        }

        public async Task<IEnumerable<AppAttachments>> UpdateAttachmentsAsync(IEnumerable<AppAttachments> appAttachments)
        {
            List<AppAttachments> data = new List<AppAttachments>();
            foreach (var item in appAttachments)
            {
                var entity = await this.GetAsync(item.Id);
                entity.Type = item.Type;
                entity.DocumentaryId = item.DocumentaryId;
                entity.DocumentaryPersonalId = item.DocumentaryPersonalId;
                entity.IsDeleted = item.IsDeleted;
                data.Add(entity);
            }
            await Context.SaveChangesAsync();
            return data;
        }
    }
}
