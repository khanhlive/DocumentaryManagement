using Abp.Configuration.Startup;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.MultiTenancy;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocumentaryManagement.EntityFrameworkCore
{
    /// <summary>
    /// Implements <see cref="IDbPerTenantConnectionStringResolver"/> to dynamically resolve
    /// connection string for a multi tenant application.
    /// </summary>
    public class DbPerTenantConnectionStringResolver : DefaultConnectionStringResolver, IDbPerTenantConnectionStringResolver
    {
        /// <summary>
        /// Reference to the session.
        /// </summary>
        public IAbpSession AbpSession { get; set; }
        readonly IHttpContextAccessor _httpContext;        

        private readonly ICurrentUnitOfWorkProvider _currentUnitOfWorkProvider;
        private readonly ITenantCache _tenantCache;

        /// <summary>
        /// Initializes a new instance of the <see cref="DbPerTenantConnectionStringResolver"/> class.
        /// </summary>
        public DbPerTenantConnectionStringResolver(
            IAbpStartupConfiguration configuration,
            ICurrentUnitOfWorkProvider currentUnitOfWorkProvider,
            IHttpContextAccessor httpContext,
            ITenantCache tenantCache)
            : base(
                  configuration)
        {
            _currentUnitOfWorkProvider = currentUnitOfWorkProvider;
            _tenantCache = tenantCache;
            _httpContext = httpContext;

            AbpSession = NullAbpSession.Instance;
        }

        public override string GetNameOrConnectionString(ConnectionStringResolveArgs args)
        {
            if (args.MultiTenancySide == MultiTenancySides.Host)
            {
                return GetNameOrConnectionString(new DbPerTenantConnectionStringResolveArgs(null, args));
            }

            return GetNameOrConnectionString(new DbPerTenantConnectionStringResolveArgs(GetCurrentTenantId(), args));
        }

        public virtual string GetNameOrConnectionString(DbPerTenantConnectionStringResolveArgs args)
        {
            //if (this._httpContext.HttpContext == null)
            //{
            //    return "";
            //}
            if (args.TenantId == null)
            {
                //Requested for host
                var _string = base.GetNameOrConnectionString(args);
                return _string;
            }

            var tenantCacheItem = _tenantCache.Get(args.TenantId.Value);
            if (tenantCacheItem.ConnectionString.IsNullOrEmpty())
            {
                //Tenant has not dedicated database
                return base.GetNameOrConnectionString(args);
            }

            return tenantCacheItem.ConnectionString;
        }

        protected virtual int? GetCurrentTenantId()
        {
            return _currentUnitOfWorkProvider.Current != null
                ? _currentUnitOfWorkProvider.Current.GetTenantId()
                : AbpSession.TenantId;
        }
    }
}
