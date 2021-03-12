using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Repositories;
using Abp.Runtime.Session;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.ResponseModel;
using DevExtreme.AspNet.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories
{
    /// <summary>
    /// Base class for custom repositories of the application.
    /// </summary>
    /// <typeparam name="TEntity">Entity type</typeparam>
    /// <typeparam name="TPrimaryKey">Primary key type of the entity</typeparam>
    public abstract class DocumentaryManagementRepositoryBase<TEntity, TPrimaryKey> : EfCoreRepositoryBase<DocumentaryManagementDbContext, TEntity, TPrimaryKey>, IDocumentaryManagementRepositoryBase<TEntity>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected IAbpSession AbpSession;
        protected IDbContextProvider<DocumentaryManagementDbContext> _dbContextProvider;
        protected IConfiguration _configuration;
        protected DocumentaryManagementRepositoryBase(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider)
        {
            _dbContextProvider = dbContextProvider;
            _configuration = configuration;
            AbpSession = abpSession;
        }

        public virtual void Before_InsertUpdate(TEntity entity)
        {

        }

        public void SetSession(IAbpSession abpSession)
        {
            AbpSession = abpSession;
        }

        public override TEntity Insert(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.Insert(entity);
        }

        public override TEntity Update(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.Update(entity);
        }

        public override Task<TEntity> UpdateAsync(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.UpdateAsync(entity);
        }

        public override Task<TEntity> InsertAsync(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.InsertAsync(entity);
        }

        public override TEntity InsertOrUpdate(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.InsertOrUpdate(entity);
        }

        public override TPrimaryKey InsertAndGetId(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.InsertAndGetId(entity);
        }

        public override Task<TPrimaryKey> InsertAndGetIdAsync(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.InsertAndGetIdAsync(entity);
        }

        public override TPrimaryKey InsertOrUpdateAndGetId(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.InsertOrUpdateAndGetId(entity);
        }

        public override Task<TPrimaryKey> InsertOrUpdateAndGetIdAsync(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.InsertOrUpdateAndGetIdAsync(entity);
        }

        public override Task<TEntity> InsertOrUpdateAsync(TEntity entity)
        {
            this.Before_InsertUpdate(entity);
            return base.InsertOrUpdateAsync(entity);
        }

        public override Task<TEntity> UpdateAsync(TPrimaryKey id, Func<TEntity, Task> updateAction)
        {
            var entity = this.Get(id);
            if (entity == null) throw new NullReferenceException($"Đối tượng không tồn tại trong hệ thống");
            else
                this.Before_InsertUpdate(entity);
            return base.UpdateAsync(id, updateAction);
        }

        public override TEntity Update(TPrimaryKey id, Action<TEntity> updateAction)
        {
            var entity = this.Get(id);
            if (entity == null) throw new NullReferenceException($"Đối tượng không tồn tại trong hệ thống");
            else
                this.Before_InsertUpdate(entity);
            return base.Update(id, updateAction);
        }

        public override void Delete(TEntity entity)
        {
            this.Before_Delete(entity);
            base.Delete(entity);
        }

        public virtual void Before_Delete(TEntity entity)
        {

        }

        public virtual LoadResult GetDevExtreme(DataSourceLoadOptionsBase loadOptions)
        {
            DocumentaryManagementDbContext DbContext = this.GetDevContext();
            return DataSourceLoader.Load(SetEntityIncludes(DbContext.Set<TEntity>()), loadOptions);
        }

        protected virtual DocumentaryManagementDbContext GetDevContext()
        {
            string str = _configuration.GetConnectionString(DocumentaryManagementConsts.ConnectionStringName);
            DbContextOptionsBuilder<DocumentaryManagementDbContext> dbContextOptionsBuilder = new DbContextOptionsBuilder<DocumentaryManagementDbContext>();
            dbContextOptionsBuilder.UseSqlServer(str);
            DocumentaryManagementDbContext DbContext = new DocumentaryManagementDbContext(dbContextOptionsBuilder.Options);
            return DbContext;
        }

        //protected virtual IQueryable<TEntity> WhereClause(DbSet<TEntity> entities, DataSourceLoadOptionsBase loadOptions)
        //{
        //    return entities;
        //}

        protected virtual IQueryable<TEntity> SetEntityIncludes(IQueryable<TEntity> entities)
        {
            return entities;
        }
        

        // Add your common methods for all repositories
    }

    /// <summary>
    /// Base class for custom repositories of the application.
    /// This is a shortcut of <see cref="DocumentaryManagementRepositoryBase{TEntity,TPrimaryKey}"/> for <see cref="int"/> primary key.
    /// </summary>
    /// <typeparam name="TEntity">Entity type</typeparam>
    public abstract class DocumentaryManagementRepositoryBase<TEntity> : DocumentaryManagementRepositoryBase<TEntity, int>, IRepository<TEntity>
        where TEntity : class, IEntity<int>
    {
        protected DocumentaryManagementRepositoryBase(IDbContextProvider<DocumentaryManagementDbContext> dbContextProvider, IConfiguration configuration, IAbpSession abpSession)
            : base(dbContextProvider, configuration, abpSession)
        {
        }

        // Do not add any method here, add to the class above (since this inherits it)!!!
    }
}
