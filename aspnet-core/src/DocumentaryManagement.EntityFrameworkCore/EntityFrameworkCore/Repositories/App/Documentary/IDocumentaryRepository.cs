using Abp.Domain.Repositories;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DocumentaryManagement.Authorization;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;
using DocumentaryManagement.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary
{
    public interface IDocumentaryRepository : IRepository<AppDocumentary>, IDocumentaryManagementRepositoryBase<AppDocumentary>
    {
        LoadResult GetDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions, PermissionType permissionType);
        LoadResult GetBookDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions);
        LoadResult GetSearchDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentSearchOptions searchOptions, PermissionType permissionType);
        List<AppDocumentary> GetFilterReportData(DocumentFilterOptions documentFilterOptions, PermissionType permissionType, long userId);
        List<AppDocumentary> GetSearchReportData(DocumentSearchOptions searchOptions, PermissionType permissionType, long userId);
        List<AppDocumentary> GetBookReportData(DocumentFilterOptions documentFilterOptions);
        Task<List<User>> GetUserApproved();
    }
}
