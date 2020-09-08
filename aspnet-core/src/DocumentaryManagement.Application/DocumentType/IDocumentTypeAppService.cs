using Abp.Application.Services;
using DocumentaryManagement.DocumentType.Dto;

namespace DocumentaryManagement.DocumentType
{
    public interface IDocumentTypeAppService: IAsyncCrudAppService<DocumentTypeDto, int, PagedDocumentTypeRequestDto, CreateDocumentTypeDto, UpdateDocumentTypeDto>
    {
    }
}
