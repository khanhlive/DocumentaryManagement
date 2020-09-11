using Abp.Application.Services;
using DocumentaryManagement.DocumentaryPersonal.Dto;

namespace DocumentaryManagement.DocumentaryPersonal
{
    public interface IDocumentaryPersonalAppService : IAsyncCrudAppService<DocumentaryPersonalDto, int, PagedDocumentaryPersonalRequestDto, CreateDocumentaryPersonalDto, UpdateDocumentaryPersonalDto>
    {
    }
}
