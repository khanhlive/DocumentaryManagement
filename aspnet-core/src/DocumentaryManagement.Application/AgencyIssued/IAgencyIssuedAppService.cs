using Abp.Application.Services;
using DocumentaryManagement.AgencyIssued.Dto;

namespace DocumentaryManagement.AgencyIssued
{
    public interface IAgencyIssuedAppService : IAsyncCrudAppService<AgencyIssuedDto, int, PagedAgencyIssuedRequestDto, CreateAgencyIssuedDto, UpdateAgencyIssuedDto>
    {
    }
}
