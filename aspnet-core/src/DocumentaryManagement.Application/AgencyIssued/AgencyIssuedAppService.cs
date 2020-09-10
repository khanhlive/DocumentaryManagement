using DocumentaryManagement.AgencyIssued.Dto;
using DocumentaryManagement.Core;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.AgencyIssued;
using DocumentaryManagement.Model;

namespace DocumentaryManagement.AgencyIssued
{
    public class AgencyIssuedAppService : AsyncCrudAppServiceBase<AppAgencyIssued, AgencyIssuedDto, int, PagedAgencyIssuedRequestDto, CreateAgencyIssuedDto, UpdateAgencyIssuedDto>, IAgencyIssuedAppService
    {
        public AgencyIssuedAppService(IAgencyIssuedRepository repository) : base(repository)
        {
            
        }
    }
}
