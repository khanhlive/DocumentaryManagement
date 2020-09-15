using Abp.Domain.Repositories;
using DocumentaryManagement.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Attachment
{
    public interface IAttachmentRepository : IRepository<AppAttachments>
    {
        Task<IEnumerable<AppAttachments>> GetByDocumentaryPersonalId(int documentaryPersonalId);
        Task<IEnumerable<AppAttachments>> GetByDocumentaryId(int documentaryId,int type);
        Task<IEnumerable<AppAttachments>> UpdateAttachmentsAsync(IEnumerable<AppAttachments> appAttachments);
    }
}
