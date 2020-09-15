using Abp.Application.Services;
using DocumentaryManagement.Attachment.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DocumentaryManagement.Attachment
{
    public interface IAttachmentAppService : IAsyncCrudAppService<AttachmentDto, int, PagedAttachmentRequestDto, CreateAttachmentDto, UpdateAttachmentDto>
    {
        Task<IEnumerable<AttachmentDto>> GetByDocumentaryPersonalId(int documentaryPersonalId);
        Task<IEnumerable<AttachmentDto>> GetByDocumentaryId(int documentaryId, int type);
    }
}
