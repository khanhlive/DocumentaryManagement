using System;
using DevExpress.XtraReports.UI;
using DocumentaryManagement.Authorization;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;

namespace DocumentaryManagement.Web.Host.Reports
{
    public partial class SearchDocument
    {
        IDocumentaryRepository Repository;
        DocumentSearchOptions Options;
        PermissionType _permissionType;
        long _userId;
        public SearchDocument(IDocumentaryRepository repository, DocumentSearchOptions documentFilterOptions, PermissionType permissionType, long userId)
        {
            Repository = repository;
            Options = documentFilterOptions;
            _permissionType = permissionType;
            _userId = userId;
            InitializeComponent();
            LoadData();
        }

        public void LoadData()
        {
            if (this.Options.Type == 1)
            {
                //van ban di
                lblTitle.Text = "Danh sách văn bản đi".ToUpper();
                tableCell2.Text = "Số đi";
            }
            else
            {
                lblTitle.Text = "Danh sách văn bản đến".ToUpper();
                tableCell2.Text = "Số đến";
            }
            colSTT.Summary = new XRSummary(SummaryRunning.Report);
            ((XRSummary)colSTT.Summary).Func = SummaryFunc.RecordNumber;
            var source = Repository.GetSearchReportData(Options, _permissionType, _userId);
            this.DataSource = source;
        }

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            if (CurrentRowIndex == (RowCount - 1))
                line1.LineStyle = System.Drawing.Drawing2D.DashStyle.Solid;
        }
    }
}
