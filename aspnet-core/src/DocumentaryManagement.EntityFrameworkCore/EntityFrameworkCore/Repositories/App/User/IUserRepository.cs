using Abp.Domain.Repositories;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.User
{
    public interface IUserRepository : IRepository<Authorization.Users.User,long>
    {    
    }
}
