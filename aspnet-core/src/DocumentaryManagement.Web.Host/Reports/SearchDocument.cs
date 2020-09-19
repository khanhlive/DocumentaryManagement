using System;
using DevExpress.XtraReports.UI;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;

namespace DocumentaryManagement.Web.Host.Reports
{
    public partial class SearchDocument
    {
        IDocumentaryRepository Repository;
        DocumentSearchOptions Options;
        public SearchDocument(IDocumentaryRepository repository, DocumentSearchOptions documentFilterOptions)
        {
            Repository = repository;
            Options = documentFilterOptions;
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
            var source = Repository.GetSearchReportData(Options);
            this.DataSource = source;
        }
    }
}
