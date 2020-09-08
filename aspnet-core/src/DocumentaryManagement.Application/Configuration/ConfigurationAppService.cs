using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using DocumentaryManagement.Configuration.Dto;

namespace DocumentaryManagement.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : DocumentaryManagementAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
