using Abp.Application.Services;
using DocumentaryManagement.Department.Dto;
using DocumentaryManagement.Models.Lib;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DocumentaryManagement.Department
{
    public interface IDepartmentAppService : IAsyncCrudAppService<DepartmentDto, int, PagedDepartmentRequestDto, CreateDepartmentDto, UpdateDepartmentDto>
    {
        Task<IEnumerable<DepartmentDto>> GetApproved();
        Task<IEnumerable<DepartmentUserTreeViewItem>> GetTreeViewData(long documentId);
    }
}
