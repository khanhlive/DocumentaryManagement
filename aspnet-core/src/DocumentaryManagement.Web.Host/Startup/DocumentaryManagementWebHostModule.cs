using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using DocumentaryManagement.Configuration;

namespace DocumentaryManagement.Web.Host.Startup
{
    [DependsOn(
       typeof(DocumentaryManagementWebCoreModule))]
    public class DocumentaryManagementWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public DocumentaryManagementWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(DocumentaryManagementWebHostModule).GetAssembly());
        }
    }
}
