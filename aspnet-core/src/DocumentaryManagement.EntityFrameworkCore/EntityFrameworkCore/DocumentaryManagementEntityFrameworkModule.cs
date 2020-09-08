using Abp.Configuration.Startup;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using Castle.MicroKernel.Registration;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.DocumentType;
using DocumentaryManagement.EntityFrameworkCore.Seed;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.EntityFrameworkCore
{
    [DependsOn(
        typeof(DocumentaryManagementCoreModule), 
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class DocumentaryManagementEntityFrameworkModule : AbpModule
    {
        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<DocumentaryManagementDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        DocumentaryManagementDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        DocumentaryManagementDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });

                //Configuration.ReplaceService<IRepository<AppDocumentType>>(() =>
                //{
                //    IocManager.IocContainer.Register(
                //        Component.For<IRepository<AppDocumentType>, IDocumentTypeRepository, DocumentTypeRepository>()
                //            .ImplementedBy<DocumentTypeRepository>()
                //            .LifestyleTransient()
                //    );
                //});
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(DocumentaryManagementEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}
