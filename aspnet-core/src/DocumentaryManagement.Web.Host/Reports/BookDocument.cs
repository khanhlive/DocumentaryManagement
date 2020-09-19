﻿using System;
using DevExpress.XtraReports.UI;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;

namespace DocumentaryManagement.Web.Host.Reports
{
    public partial class BookDocument
    {
        IDocumentaryRepository Repository;
        DocumentFilterOptions Options;
        User user;
        public BookDocument(IDocumentaryRepository repository, DocumentFilterOptions documentFilterOptions,User  user)
        {
            Repository = repository;
            this.user = user;
            Options = documentFilterOptions;
            InitializeComponent();
            LoadData();
        }

        public void LoadData()
        {
            if (this.Options.Type == 1)
            {
                //van ban di
                lblTitle.Text = "Sổ văn bản đi".ToUpper();
                colSoDen.Text = "Số đi";
                colNgayNhan.Text = "Ngày gửi";
                colNguoiNhan.Text = "Người gửi";
                colNguoiThucHien.Text = "Nơi nhận";
            }
            else
            {
                lblTitle.Text = "Sổ văn bản đến".ToUpper();
                colSoDen.Text = "Số đến";
                colNgayNhan.Text = "Ngày nhận";
                colNguoiNhan.Text = "Người nhận";
                colNguoiThucHien.Text = "Người thực hiện";
            }
            cellYear.Text = "Năm: " + this.Options.Year.ToString();
            cellDonVi.Text = user.Organization?.ToUpper();
            cellDiaChi.Text = user.Address;
            colSTT.Summary = new XRSummary(SummaryRunning.Report);
            ((XRSummary)colSTT.Summary).Func = SummaryFunc.RecordNumber;
            var source = Repository.GetBookReportData(Options);
            this.DataSource = source;
        }
    }
}