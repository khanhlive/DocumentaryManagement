using DocumentaryManagement.Department.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Department;
using DocumentaryManagement.Model;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using DocumentaryManagement.Models.Lib;

namespace DocumentaryManagement.Department
{
    public class DepartmentAppService : AsyncCrudAppServiceBase<AppDepartment, DepartmentDto, int, PagedDepartmentRequestDto, CreateDepartmentDto, UpdateDepartmentDto>, IDepartmentAppService
    {
        public DepartmentAppService(IDepartmentRepository repository) : base(repository)
        {

        }

        [HttpGet]
        [ActionName("get-department-approved")]
        public async Task<IEnumerable<DepartmentDto>> GetApproved()
        {
            return (await Repository.GetAllListAsync()).Select(p => MapToEntityDto(p));
        }        

        [HttpGet]
        [ActionName("get-department-user-treeview")]
        public async Task<IEnumerable<DepartmentUserTreeViewItem>> GetTreeViewData(long documentId)
        {
            var data = new List<DepartmentUserTreeViewItem>();
            data.Add(new DepartmentUserTreeViewItem
            {
                Id = "ROOT",
                IsRoot = true,
                Name = "Tất cả",
                Type = -1,
                Value = -1,
                Items = ((IDepartmentRepository)AbpRepository).GetTreeData(documentId)?.ToList()
            });
            return await Task.FromResult(data);
        }
    }
}
