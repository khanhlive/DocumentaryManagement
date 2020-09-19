using Abp.Domain.Repositories;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;
using DocumentaryManagement.Model;
using System.Collections.Generic;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary
{
    public interface IDocumentaryRepository : IRepository<AppDocumentary>
    {
        LoadResult GetDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions);
        LoadResult GetBookDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions);
        LoadResult GetSearchDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentSearchOptions searchOptions);
        List<AppDocumentary> GetFilterReportData(DocumentFilterOptions documentFilterOptions);
        List<AppDocumentary> GetSearchReportData(DocumentSearchOptions searchOptions);
        List<AppDocumentary> GetBookReportData(DocumentFilterOptions documentFilterOptions);
    }
}
