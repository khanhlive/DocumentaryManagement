using Abp.Runtime.Session;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories
{
    public interface IDocumentaryManagementRepositoryBase<TEntity>
    {
        void Before_InsertUpdate(TEntity entity);
        void Before_Delete(TEntity entity);
        LoadResult GetDevExtreme(DataSourceLoadOptions loadOptions);
        void SetSession(IAbpSession abpSession);
    }
}
