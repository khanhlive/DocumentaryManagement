using Abp.Domain.Repositories;
using DocumentaryManagement.Model;
using DocumentaryManagement.Authorization.Users;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.User
{
    public interface IUserRepository : IRepository<DocumentaryManagement.Authorization.Users.User>
    {    
    }
}
