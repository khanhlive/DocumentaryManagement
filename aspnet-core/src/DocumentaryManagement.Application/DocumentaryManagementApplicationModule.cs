using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using DocumentaryManagement.Authorization;

namespace DocumentaryManagement
{
    [DependsOn(
        typeof(DocumentaryManagementCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class DocumentaryManagementApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<DocumentaryManagementAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(DocumentaryManagementApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
