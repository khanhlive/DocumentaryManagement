using Abp.Application.Services;
using DocumentaryManagement.Rotation.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DocumentaryManagement.Rotation
{
    public interface IRotationAppService : IAsyncCrudAppService<RotationDto, long, PagedRotationRequestDto, CreateRotationDto, RotationDto>
    {
        Task<IEnumerable<RotationDto>> Send(CreateRotationDto rotations);
        Task<RotationDto> View(long documentId);

    }
}
