using DocumentaryManagement.Core;
using DocumentaryManagement.DocumentType.Dto;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.DocumentType;
using DocumentaryManagement.Model;
using Microsoft.Extensions.Configuration;

namespace DocumentaryManagement.DocumentType
{
    public class DocumentTypeAppService : AsyncCrudAppServiceBase<AppDocumentType, DocumentTypeDto, int, PagedDocumentTypeRequestDto, CreateDocumentTypeDto, UpdateDocumentTypeDto>, IDocumentTypeAppService
    {
        public DocumentTypeAppService(IDocumentTypeRepository repository) : base(repository)
        {
            
        }
    }
}
