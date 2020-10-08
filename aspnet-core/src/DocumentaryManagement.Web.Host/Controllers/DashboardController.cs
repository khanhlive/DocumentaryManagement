using Abp.Configuration.Startup;
using Dapper;
using DocumentaryManagement.Authorization;
using DocumentaryManagement.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace DocumentaryManagement.Web.Host.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DashboardController : DocumentaryManagementControllerBase
    {
        string conStr;
        public DashboardController(IAbpStartupConfiguration configuration)
        {
            LocalizationSourceName = DocumentaryManagementConsts.LocalizationSourceName;
            conStr = configuration.DefaultNameOrConnectionString;
        }

        private PermissionType GetPermissionType()
        {
            bool isDocumentManager = PermissionChecker.IsGrantedAsync(PermissionNames.Permission_DocumentManager).GetAwaiter().GetResult();
            if (isDocumentManager)
            {
                return PermissionType.DocumentManager;
            }
            else
            {
                bool isApprove = PermissionChecker.IsGrantedAsync(PermissionNames.Permission_Approved).GetAwaiter().GetResult();
                if (isApprove)
                {
                    return PermissionType.Approved;
                }
                else
                {
                    return PermissionType.Employee;
                }
            }
        }

        [HttpGet]
        public DashboardResult Get()
        {
            var permissionType = this.GetPermissionType();
            DashboardResult dashboardResult = new DashboardResult();
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@permission", permissionType == PermissionType.Admin || permissionType == PermissionType.DocumentManager ? "admin" : (permissionType == PermissionType.Approved ? "approved" : "employee"));
            parameters.Add("@userId", AbpSession.UserId ?? 0);
            using (SqlConnection con = new SqlConnection(this.conStr))
            {
                using (var dr = con.QueryMultiple("Dashboard", parameters, null, null, System.Data.CommandType.StoredProcedure))
                {
                    if(permissionType == PermissionType.Admin || permissionType == PermissionType.DocumentManager)
                    {
                        dashboardResult.ThongKeVanBan = dr.ReadFirst<ThongKeVanBan>();
                    }
                    else
                    {
                        dashboardResult.ThongKeVanBan_Viewer = dr.ReadFirst<ThongKeVanBan_Viewer>();
                    }
                    
                    IEnumerable<ThongKeVanBanTheoThang> enumerable = dr.Read<ThongKeVanBanTheoThang>();
                    dashboardResult.Init(enumerable);
                }
            }
            return dashboardResult;
        }
    }
    public class DashboardResult
    {
        public ThongKeVanBan ThongKeVanBan { get; set; }
        public ThongKeVanBan_Viewer ThongKeVanBan_Viewer { get; set; }
        public BieuDo BieuDo { get; set; }
        public void Init(IEnumerable<ThongKeVanBanTheoThang> thongKeVanBanTheos)
        {
            BieuDo = new BieuDo();
            for (int i = 12; i >= 0; i--)
            {
                var _date = DateTime.Now.AddMonths(i * -1);
                BieuDo.Labels.Add(_date.ToString("MM/yyyy"));
                var vbdi = thongKeVanBanTheos.Where(p => p.Creation_Date.Year == _date.Year && p.Creation_Date.Month == _date.Month && p.Type == 1).Select(p => p.Sum).ToList();
                BieuDo.VanBanDi.Add(vbdi.Count > 0 ? vbdi.Sum(p => p) : 0);
                var vbden = thongKeVanBanTheos.Where(p => p.Creation_Date.Year == _date.Year && p.Creation_Date.Month == _date.Month && p.Type == 2).Select(p => p.Sum).ToList();
                BieuDo.VanBanDen.Add(vbden.Count > 0 ? vbden.Sum(p => p) : 0);
            }
        }

    }

    public class BieuDo
    {
        public BieuDo()
        {
            Labels = new List<string>();
            VanBanDen = new List<int>();
            VanBanDi = new List<int>();
        }
        public List<string> Labels { get; set; }
        public List<int> VanBanDi { get; set; }
        public List<int> VanBanDen { get; set; }
    }

    public class ThongKeVanBan
    {
        public int SoVanBanDi { get; set; }
        public int SoVanBanDen { get; set; }
        public int SoVanBanDi_DaXuLy { get; set; }
        public int SoVanBanDen_DaXuLy { get; set; }
    }

    public class ThongKeVanBan_Viewer
    {
        public int SoVanBanDen { get; set; }
        public int SoVanBanDenDaXem { get; set; }
        public int SoVanBanDenChuaXem { get; set; }
    }

    public class ThongKeVanBanTheoThang
    {
        public int Type { get; set; }
        public string GR { get; set; }
        public int Sum { get; set; }
        public DateTime Creation_Date { get; set; }
    }
}