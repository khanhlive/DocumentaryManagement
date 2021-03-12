using System;
using System.Linq;
using DevExpress.XtraReports.UI;
using DocumentaryManagement.Authorization;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;

namespace DocumentaryManagement.Web.Host.Reports
{
    public partial class SearchDocument
    {
        private readonly IDocumentaryRepository _repository;
        private readonly DocumentSearchOptions _options;
        private readonly PermissionType _permissionType;
        private readonly long _userId;
        public SearchDocument(IDocumentaryRepository repository, DocumentSearchOptions documentFilterOptions, PermissionType permissionType, long userId)
        {
            _repository = repository;
            _options = documentFilterOptions;
            _permissionType = permissionType;
            _userId = userId;
            InitializeComponent();
            LoadData();
        }

        public void LoadData()
        {
            if (this._options.Type == 1)
            {
                //van ban di
                lblTitle.Text = "Danh sách văn bản đi".ToUpper();
                tableCell2.Text = "Số đi";
            }
            else if (this._options.Type == 2)
            {
                lblTitle.Text = "Danh sách văn bản đến".ToUpper();
                tableCell2.Text = "Số đến";
            }
            else if (this._options.Type == 4)
            {
                lblTitle.Text = "Danh sách văn bản điện tử".ToUpper();
                tableCell2.Text = "Số";
            }
            else if (this._options.Type == 5)
            {
                lblTitle.Text = "Danh sách văn bản nội bộ".ToUpper();
                tableCell2.Text = "Số";
            }
            colSTT.Summary = new XRSummary(SummaryRunning.Report);
            ((XRSummary)colSTT.Summary).Func = SummaryFunc.RecordNumber;
            var source = _repository.GetSearchReportData(_options, _permissionType, _userId);
            this.DataSource = source?.OrderBy(p => p.TextNumber);
        }

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            if (CurrentRowIndex == (RowCount - 1))
                line1.LineStyle = System.Drawing.Drawing2D.DashStyle.Solid;
        }
    }
}
