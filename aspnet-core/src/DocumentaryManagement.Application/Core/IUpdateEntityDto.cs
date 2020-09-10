using Abp.Runtime.Session;

namespace DocumentaryManagement.Core
{
    public interface IUpdateEntityDto
    {
        void BeforeUpdate(IAbpSession abpSession);
    }
}
