using Abp.EntityFrameworkCore;
using Abp.Runtime.Session;
using Abp.UI;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;
using DocumentaryManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;

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

        public List<AppDocumentary> GetFilterReportData(DocumentFilterOptions documentFilterOptions)
        {
            return this.GetQueryFilter(documentFilterOptions).ToList();
        }

        private IQueryable<AppDocumentary> GetQueryFilter(DocumentFilterOptions documentFilterOptions)
        {
            DocumentaryManagementDbContext DbContext = this.GetDevContext();
            var query = DbContext.Set<AppDocumentary>().Where(p => p.IsDeleted == false);
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
            }
            return SetEntityIncludes(query);
        }

        public virtual LoadResult GetDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions)
        {
            return DataSourceLoader.Load(GetQueryFilter(documentFilterOptions), loadOptions);
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

        public List<AppDocumentary> GetSearchReportData(DocumentSearchOptions searchOptions)
        {
            return this.GetQuerySearch(searchOptions).ToList();
        }

        private IQueryable<AppDocumentary> GetQuerySearch(DocumentSearchOptions searchOptions)
        {
            DocumentaryManagementDbContext DbContext = this.GetDevContext();
            var query = DbContext.Set<AppDocumentary>().Where(p => p.IsDeleted == false);
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

        public LoadResult GetSearchDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentSearchOptions searchOptions)
        {            
            return DataSourceLoader.Load(this.GetQuerySearch(searchOptions), loadOptions);
        }
    }
}
