using DevExpress.XtraReports.UI;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;

namespace DocumentaryManagement.Web.Host.Reports
{
    public partial class Documents
    {
        IDocumentaryRepository Repository;
        DocumentFilterOptions Options;
        public Documents(IDocumentaryRepository repository, DocumentFilterOptions documentFilterOptions)
        {
            Repository = repository;
            Options = documentFilterOptions;
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
            var source = Repository.GetFilterReportData(Options);
            this.DataSource = source;
        }

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            
        }
    }
}
