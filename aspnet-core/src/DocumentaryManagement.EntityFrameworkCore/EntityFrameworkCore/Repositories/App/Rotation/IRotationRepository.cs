using Abp.Domain.Repositories;
using DocumentaryManagement.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Rotation
{
    public interface IRotationRepository : IRepository<AppRotation,long>
    {
        Task<List<AppRotation>> Send(List<AppRotation> rotations);
    }
}
