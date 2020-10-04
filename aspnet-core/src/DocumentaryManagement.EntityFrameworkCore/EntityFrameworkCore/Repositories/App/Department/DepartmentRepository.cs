using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DocumentaryManagement.Model;
using DocumentaryManagement.Models.Lib;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Department
{
    public class DepartmentRepository : DocumentaryManagementRepositoryBase<AppDepartment>, IDepartmentRepository
    {
        public DepartmentRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }
        protected override IQueryable<AppDepartment> SetEntityIncludes(IQueryable<AppDepartment> entities)
        {
            return entities.Where(p => !p.IsDeleted);
        }


        public override void Before_InsertUpdate(AppDepartment entity)
        {
            AppDepartment item = this.FirstOrDefault(p => p.Code == entity.Code && p.Id != entity.Id);
            if (entity.Id == 0)
            {
                entity.CreationDate = DateTime.Now;
                entity.CreationId = (int?)AbpSession.UserId.Value;
            }
            else
            {
                entity.UpdatedDate = DateTime.Now;
                entity.UpdatedId = (int?)AbpSession.UserId.Value;
            }
            if (item != null)
            {
                throw new UserFriendlyException($"Mã cơ quan ban hành: \"{entity.Code}\" đã tồn tại trong hệ thống");
            }
        }

        public override void Delete(AppDepartment entity)
        {
            if (this.Context.Users.Any(p => p.DepartmentId == entity.Id))
            {
                throw new UserFriendlyException($"Phòng ban: \"{entity.Name}\" đang được sử dụng");
            }
            else
            if (this.Context.AppDocumentary.Any(p => p.ApprovedDepartmentId == entity.Id))
            {
                throw new UserFriendlyException($"Phòng ban: \"{entity.Name}\" đang được sử dụng");
            }
            base.Delete(entity);
        }

        public IEnumerable<DepartmentUserTreeViewItem> GetTreeData(long documentId)
        {
            var rotations = this.Context.AppRotation.Where(p => p.DocumentId == documentId).ToList();
            var query = (from a in GetAllList()
                         join b in Context.Users.Select(p => new { p.Id, p.FullName2, p.DepartmentId }) on a.Id equals b.DepartmentId into kq
                         select new { a.Id, a.Name, items = kq.ToList() }).Select(p =>
                         {
                             bool departmentSelected = rotations.Any(s => s.UserId == null && s.DepartmentId == p.Id);
                             return new DepartmentUserTreeViewItem
                             {
                                 Id = $"PB_{p.Id.ToString()}",
                                 Name = p.Name,
                                 Type = 1,
                                 Value = p.Id,
                                 Selected = departmentSelected,
                                 Expanded = true,
                                 ParentId = -1,
                                 Items = p.items.Select(m => new DepartmentUserTreeViewItem
                                 {
                                     Id = $"NV_{m.Id.ToString()}",
                                     Name = m.FullName2,
                                     Expanded = true,
                                     Type = 2,
                                     Value = m.Id,
                                     ParentId = p.Id,
                                     Selected = departmentSelected || rotations.Any(s => s.UserId != null && s.UserId == m.Id)
                                 }).ToList()
                             };
                         });
            return query;
        }

    }
}
