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

        public virtual LoadResult GetDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions)
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

            return DataSourceLoader.Load(SetEntityIncludes(query), loadOptions);
        }

        public virtual LoadResult GetBookDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions)
        {
            DocumentaryManagementDbContext DbContext = this.GetDevContext();
            var query = DbContext.Set<AppDocumentary>().Where(p => p.IsDeleted == false);
            if (documentFilterOptions != null)
            {
                query = query.Where(p => p.Type == documentFilterOptions.Type && p.ReleaseDate.Year==documentFilterOptions.Year);
            }
            return DataSourceLoader.Load(SetEntityIncludes(query), loadOptions);
        }

    }
}
