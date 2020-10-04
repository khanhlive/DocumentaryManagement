using Abp.Domain.Repositories;
using DocumentaryManagement.Model;
using DocumentaryManagement.Models.Lib;
using System.Collections.Generic;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Department
{
    public interface IDepartmentRepository : IRepository<AppDepartment>
    {
        IEnumerable<DepartmentUserTreeViewItem> GetTreeData(long documentId);
    }
}
