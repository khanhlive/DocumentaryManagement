using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;
using DocumentaryManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary
{
    public class DocumentaryRepository : DocumentaryManagementRepositoryBase<AppDocumentary>, IDocumentaryRepository
    {
        public DocumentaryRepository(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {

        }

        protected override IQueryable<AppDocumentary> SetEntityIncludes(IQueryable<AppDocumentary> entities)
        {
            return entities.Where(p => !p.IsDeleted).Include(p => p.DocumentType).Include(p => p.AgencyIssued);
        }

        public override void Before_InsertUpdate(AppDocumentary entity)
        {
            AppDocumentary item = this.FirstOrDefault(p => p.Code == entity.Code && p.Id != entity.Id);
            if (entity.Id == 0)
            {
                entity.CreationDate = DateTime.Now;
                entity.CreationId = AbpSession.UserId.Value;
            }
            else
            {
                entity.UpdatedDate = DateTime.Now;
                entity.UpdatedId = AbpSession.UserId.Value;
            }
            if (item != null)
            {
                throw new UserFriendlyException($"Ký hiệu văn bản: \"{entity.Code}\" đã tồn tại trong hệ thống");
            }
        }

        public List<AppDocumentary> GetFilterReportData(DocumentFilterOptions documentFilterOptions, Authorization.PermissionType permissionType, long userId)
        {
            return this.GetQueryFilter(documentFilterOptions, permissionType, userId).ToList();
        }

        private IQueryable<AppDocumentary> GetQueryFilter(DocumentFilterOptions documentFilterOptions, Authorization.PermissionType permissionType, long userId)
        {
            DocumentaryManagementDbContext DbContext = this.GetDevContext();
            var query = DbContext.Set<AppDocumentary>().Where(p => p.IsDeleted == false);
            User user = this.Context.Users.FirstOrDefault(p => p.Id == userId);
            int? departmentId = user == null ? 0 : user.DepartmentId;
            if (permissionType == Authorization.PermissionType.Admin || permissionType == Authorization.PermissionType.DocumentManager)
            {

            }
            else if (permissionType == Authorization.PermissionType.Approved)
            {
                query = (from a in query
                         join b in Context.AppRotation.Where(p => p.UserId == null ? p.DepartmentId == departmentId : p.UserId == userId) on a.Id equals b.DocumentId into kq
                         where (a.ApprovedType == 1 ? a.ApprovedUserId == userId : a.ApprovedDepartmentId == departmentId) || (kq.Any())
                         select a
                        );
            }
            else
            {
                query = (from a in query
                         join b in Context.AppRotation.Where(p => p.UserId == null ? p.DepartmentId == departmentId : p.UserId == userId) on a.Id equals b.DocumentId into kq
                         where (kq.Any())
                         select a
                        );
            }

            if (documentFilterOptions != null)
            {
                query = query.Where(p => p.Type == documentFilterOptions.Type);
                if (documentFilterOptions.Keyword != null && !documentFilterOptions.Keyword.Trim().Equals(""))
                {
                    if (documentFilterOptions.FilterBy == 1)
                    {
                        query = query.Where(p => documentFilterOptions.Exactly ? p.Code.Equals(documentFilterOptions.Keyword.Trim()) : p.Code.Contains(documentFilterOptions.Keyword));
                    }
                    else
                    {
                        query = query.Where(p => documentFilterOptions.Exactly ? p.SummaryContent.Equals(documentFilterOptions.Keyword.Trim()) : p.SummaryContent.Contains(documentFilterOptions.Keyword));
                    }
                }
                if (documentFilterOptions.Approved != 0)
                {
                    query = query.Where(p => documentFilterOptions.Approved == 1 ? p.IsApproved == true : (p.IsApproved == false || p.IsApproved == null));
                }
            }

            return SetEntityIncludes(query);
        }

        public virtual LoadResult GetDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions, Authorization.PermissionType permissionType)
        {
            var query = GetQueryFilter(documentFilterOptions, permissionType, AbpSession.UserId ?? 0);
            var query2 = (from a in query
                          join b in Context.Users on a.ApprovedUserId equals b.Id into kq
                          from u in kq.DefaultIfEmpty()
                          join c in Context.AppDepartment on a.ApprovedDepartmentId equals c.Id into kq1
                          from d in kq1.DefaultIfEmpty()
                          select new
                          {
                              a,
                              UserName = u == null ? null : u.FullName2,
                              DepartmentName = d == null ? null : d.Name
                          }
                       ).AsEnumerable().Select(p =>
                       {
                           var item = p.a;
                           item.ApprovedUserId_Name = p.UserName;
                           item.ApprovedDepartmentId_Name = p.DepartmentName;
                           return item;
                       });
            return DataSourceLoader.Load(query2, loadOptions);
        }

        public List<AppDocumentary> GetBookReportData(DocumentFilterOptions documentFilterOptions)
        {
            return GetBookQuery(documentFilterOptions).ToList();
        }

        private IQueryable<AppDocumentary> GetBookQuery(DocumentFilterOptions documentFilterOptions)
        {
            DocumentaryManagementDbContext DbContext = this.GetDevContext();
            var query = DbContext.Set<AppDocumentary>().Where(p => p.IsDeleted == false);
            if (documentFilterOptions != null)
            {
                query = query.Where(p => p.Type == documentFilterOptions.Type && p.ReleaseDate.Year == documentFilterOptions.Year);
            }
            return SetEntityIncludes(query);
        }

        public virtual LoadResult GetBookDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions)
        {
            DocumentaryManagementDbContext DbContext = this.GetDevContext();
            var query = DbContext.Set<AppDocumentary>().Where(p => p.IsDeleted == false);
            if (documentFilterOptions != null)
            {
                query = query.Where(p => p.Type == documentFilterOptions.Type && p.ReleaseDate.Year == documentFilterOptions.Year);
            }
            return DataSourceLoader.Load(SetEntityIncludes(query), loadOptions);
        }

        public List<AppDocumentary> GetSearchReportData(DocumentSearchOptions searchOptions, Authorization.PermissionType permissionType, long userId)
        {
            return this.GetQuerySearch(searchOptions, permissionType, userId).ToList();
        }

        private IQueryable<AppDocumentary> GetQuerySearch(DocumentSearchOptions searchOptions, Authorization.PermissionType permissionType, long userId)
        {
            DocumentaryManagementDbContext DbContext = this.GetDevContext();
            var query = DbContext.Set<AppDocumentary>().Where(p => p.IsDeleted == false);
            User user = this.Context.Users.FirstOrDefault(p => p.Id == userId);
            int? departmentId = user == null ? 0 : user.DepartmentId;
            if (permissionType == Authorization.PermissionType.Admin || permissionType == Authorization.PermissionType.DocumentManager)
            {

            }
            else if (permissionType == Authorization.PermissionType.Approved)
            {
                query = (from a in query
                         join b in Context.AppRotation.Where(p => p.UserId == null ? p.DepartmentId == departmentId : p.UserId == userId) on a.Id equals b.DocumentId into kq
                         where (a.ApprovedType == 1 ? a.ApprovedUserId == userId : a.ApprovedDepartmentId == departmentId) || (kq.Any())
                         select a
                        );
            }
            else
            {
                query = (from a in query
                         join b in Context.AppRotation.Where(p => p.UserId == null ? p.DepartmentId == departmentId : p.UserId == userId) on a.Id equals b.DocumentId into kq
                         where (kq.Any())
                         select a
                        );
            }
            if (searchOptions != null)
            {
                query = (from doc in query.Where(p => p.Type == searchOptions.Type)
                         where (searchOptions.Code != null && searchOptions.Code != string.Empty) ? doc.Code.ToLower().Contains(searchOptions.Code.ToLower()) : true
                         where (searchOptions.NoiDungTomTat != null && searchOptions.NoiDungTomTat != string.Empty) ? doc.SummaryContent.ToLower().Contains(searchOptions.NoiDungTomTat.ToLower()) : true
                         where ((searchOptions.NgayBanHanhTu.HasValue ? doc.ReleaseDate >= searchOptions.NgayBanHanhTu : true) && (searchOptions.NgayBanHanhDen.HasValue ? doc.ReleaseDate <= searchOptions.NgayBanHanhDen : true))
                         where ((searchOptions.NgayGuiTu.HasValue ? doc.ReceivedDate >= searchOptions.NgayGuiTu : true) && (searchOptions.NgayGuiDen.HasValue ? doc.ReceivedDate <= searchOptions.NgayGuiDen : true))
                         select doc
                          );
                if (searchOptions.NoiBanHanh != null && searchOptions.NoiBanHanh != string.Empty)
                {
                    query = (from doc in query
                             join pl in DbContext.AppAgencyIssued.Where(p => p.Name.ToLower().Contains(searchOptions.NoiBanHanh)).Select(p => p.Id) on doc.AgencyIssuedId equals pl
                             select doc
                           );
                }
            }
            return SetEntityIncludes(query);
        }

        public LoadResult GetSearchDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentSearchOptions searchOptions, Authorization.PermissionType permissionType)
        {
            return DataSourceLoader.Load(this.GetQuerySearch(searchOptions, permissionType, AbpSession.UserId ?? 0), loadOptions);
        }

        public async Task<List<User>> GetUserApproved()
        {
            return await Context.Users.ToListAsync();
        }

        public override void Delete(AppDocumentary entity)
        {
            if (entity.IsApproved == true)
            {
                throw new UserFriendlyException("Văn bản này đã được duyệt, không được phép xóa");
            }
            base.Delete(entity);
        }

    }
}
