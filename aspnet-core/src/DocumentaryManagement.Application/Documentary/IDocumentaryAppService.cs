using Abp.Application.Services;
using DevExtreme.AspNet.Data.ResponseModel;
using DocumentaryManagement.Core;
using DocumentaryManagement.Documentary.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DocumentaryManagement.Documentary
{
    public interface IDocumentaryAppService : IAsyncCrudAppService<DocumentaryDto, int, PagedDocumentaryRequestDto, CreateDocumentaryDto, UpdateDocumentaryDto>
    {
        LoadResult GetBookDevExtreme(DataSourceLoadOptionsCustom loadOptions);
        LoadResult GetSearchDevExtreme(DataSourceLoadOptionsCustom loadOptions);
        Task<IEnumerable<Users.Dto.UserDto>> GetUserApproved();
    }
}
