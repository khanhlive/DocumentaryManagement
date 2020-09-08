using System.Threading.Tasks;
using DocumentaryManagement.Configuration.Dto;

namespace DocumentaryManagement.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
