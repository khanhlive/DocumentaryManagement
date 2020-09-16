using Abp.Application.Services;
using DevExtreme.AspNet.Data.ResponseModel;
using DocumentaryManagement.Core;
using DocumentaryManagement.Documentary.Dto;

namespace DocumentaryManagement.Documentary
{
    public interface IDocumentaryAppService : IAsyncCrudAppService<DocumentaryDto, int, PagedDocumentaryRequestDto, CreateDocumentaryDto, UpdateDocumentaryDto>
    {
        LoadResult GetBookDevExtreme(DataSourceLoadOptionsCustom loadOptions);
        LoadResult GetSearchDevExtreme(DataSourceLoadOptionsCustom loadOptions);
    }
}
