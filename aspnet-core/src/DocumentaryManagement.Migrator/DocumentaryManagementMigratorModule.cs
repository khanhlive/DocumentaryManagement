using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using DocumentaryManagement.Configuration;
using DocumentaryManagement.EntityFrameworkCore;
using DocumentaryManagement.Migrator.DependencyInjection;

namespace DocumentaryManagement.Migrator
{
    [DependsOn(typeof(DocumentaryManagementEntityFrameworkModule))]
    public class DocumentaryManagementMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public DocumentaryManagementMigratorModule(DocumentaryManagementEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(DocumentaryManagementMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                DocumentaryManagementConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(DocumentaryManagementMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
