using DevExpress.XtraReports.UI;
using DocumentaryManagement.Authorization;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;
using System;

namespace DocumentaryManagement.Web.Host.Reports
{
    public partial class Documents
    {
        IDocumentaryRepository Repository;
        DocumentFilterOptions Options;
        PermissionType _permissionType;
        long _userId;
        public Documents(IDocumentaryRepository repository, DocumentFilterOptions documentFilterOptions, PermissionType permissionType, long userId)
        {
            Repository = repository;
            Options = documentFilterOptions;
            _permissionType = permissionType;
            _userId = userId;
            InitializeComponent();
            LoadData();
        }

        public Documents()
        {
            InitializeComponent();
        }

        public void LoadData()
        {
            if (this.Options.Type == 1)
            {
                //van ban di
                lbl_Title.Text = "Danh sách văn bản đi".ToUpper();
                tableCell2.Text = "Số đi";
            }
            else
            {
                lbl_Title.Text = "Danh sách văn bản đến".ToUpper();
                tableCell2.Text = "Số đến";
            }
            colStt.Summary = new XRSummary(SummaryRunning.Report);
            ((XRSummary)colStt.Summary).Func = SummaryFunc.RecordNumber;
            var source = Repository.GetFilterReportData(Options, _permissionType, _userId);
            this.DataSource = source;
        }

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            if (CurrentRowIndex == (RowCount-1))
                line1.LineStyle = System.Drawing.Drawing2D.DashStyle.Solid;
        }
    }
}
