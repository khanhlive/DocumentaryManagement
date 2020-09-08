using Abp.Application.Services.Dto;

namespace DocumentaryManagement.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

