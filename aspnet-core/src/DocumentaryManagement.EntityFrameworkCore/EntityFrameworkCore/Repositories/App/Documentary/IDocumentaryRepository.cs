using Abp.Domain.Repositories;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary
{
    public interface IDocumentaryRepository : IRepository<AppDocumentary>
    {
        LoadResult GetDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions);
        LoadResult GetBookDevExtreme(DataSourceLoadOptionsBase loadOptions, DocumentFilterOptions documentFilterOptions);
    }
}
