using DocumentaryManagement.DocumentaryPersonal.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.DocumentaryPersonal;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.DocumentaryPersonal
{
    public class DocumentaryPersonalAppService : AsyncCrudAppServiceBase<AppDocumentaryPersonal, DocumentaryPersonalDto, int, PagedDocumentaryPersonalRequestDto, CreateDocumentaryPersonalDto, UpdateDocumentaryPersonalDto>, IDocumentaryPersonalAppService
    {
        public DocumentaryPersonalAppService(IDocumentaryPersonalRepository repository) : base(repository)
        {
            
        }
    }
}
