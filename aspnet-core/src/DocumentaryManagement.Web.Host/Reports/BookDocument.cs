using System;
using System.Linq;
using DevExpress.XtraReports.UI;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;

namespace DocumentaryManagement.Web.Host.Reports
{
    public partial class BookDocument
    {
        private readonly IDocumentaryRepository _repository;
        private readonly DocumentFilterOptions _options;
        private readonly User _user;
        public BookDocument(IDocumentaryRepository repository, DocumentFilterOptions documentFilterOptions,User  user)
        {
            _repository = repository;
            this._user = user;
            _options = documentFilterOptions;
            InitializeComponent();
            LoadData();
        }

        public void LoadData()
        {
            if (this._options.Type == 1)
            {
                //van ban di
                lblTitle.Text = "Sổ văn bản đi".ToUpper();
                colSoDen.Text = "Số đi";
                colNgayNhan.Text = "Ngày gửi";
                colNguoiNhan.Text = "Người gửi";
                colNguoiThucHien.Text = "Nơi nhận";
            }
            else if(this._options.Type == 2)
            {
                lblTitle.Text = "Sổ văn bản đến".ToUpper();
                colSoDen.Text = "Số đến";
                colNgayNhan.Text = "Ngày nhận";
                colNguoiNhan.Text = "Người nhận";
                colNguoiThucHien.Text = "Người thực hiện";
            }
            else if (this._options.Type == 4)
            {
                lblTitle.Text = "Sổ văn bản điện tử".ToUpper();
                colSoDen.Text = "Số";
                colNgayNhan.Text = "Ngày nhận";
                colNguoiNhan.Text = "Người nhận";
                colNguoiThucHien.Text = "Người thực hiện";
            }
            else if (this._options.Type == 5)
            {
                lblTitle.Text = "Sổ văn bản nội bộ".ToUpper();
                colSoDen.Text = "Số";
                colNgayNhan.Text = "Ngày gửi";
                colNguoiNhan.Text = "Người gửi";
                colNguoiThucHien.Text = "Nơi nhận";
            }
            cellYear.Text = "Năm: " + this._options.Year.ToString();
            cellDonVi.Text = _user.Organization?.ToUpper();
            cellDiaChi.Text = _user.Address;
            colSTT.Summary = new XRSummary(SummaryRunning.Report);
            ((XRSummary)colSTT.Summary).Func = SummaryFunc.RecordNumber;
            var source = _repository.GetBookReportData(_options);
            this.DataSource = source?.OrderBy(p => p.TextNumber);
        }

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            if (CurrentRowIndex == (RowCount - 1))
                line1.LineStyle = System.Drawing.Drawing2D.DashStyle.Solid;
        }
    }
}
