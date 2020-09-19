﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Notifications;
using Abp.Runtime.Session;
using DocumentaryManagement.Authorization.Users;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary;
using DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models;
using DocumentaryManagement.Web.Host.Reports;
using Microsoft.AspNetCore.Mvc;

namespace DocumentaryManagement.Web.Host.Controllers
{
    public class ReportController : Controller
    {
        private readonly IDocumentaryRepository Repository;
        private readonly IRepository<User, long> userRepository;
        private readonly INotificationPublisher _notificationPublisher;

        public ReportController(INotificationPublisher notificationPublisher, IDocumentaryRepository repository, IRepository<User, long> userRepository)
        {
            Repository = repository;
            this.userRepository = userRepository;
            _notificationPublisher = notificationPublisher;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Designer()
        {
            return View();
        }

        public IActionResult Viewer()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Document(DocumentFilterOptions documentFilterOptions, bool autoPrint = false)
        {
            var documentReport = new Documents(Repository, documentFilterOptions);
            documentReport.CreateDocument();
            ViewBag.autoPrint = autoPrint;
            return View("Viewer", documentReport);
        }

        [HttpGet]
        public IActionResult Search(DocumentSearchOptions searchOptions, bool autoPrint = false)
        {
            searchOptions.Code = searchOptions.Code ?? "";
            searchOptions.NoiBanHanh = searchOptions.NoiBanHanh ?? "";
            searchOptions.NoiDungTomTat = searchOptions.NoiDungTomTat ?? "";
            var documentReport = new SearchDocument(Repository, searchOptions);
            ViewBag.autoPrint = autoPrint;
            documentReport.CreateDocument();
            return View("Viewer", documentReport);
        }

        [HttpGet]
        public IActionResult Book(int type, int year, int id, bool autoPrint = false)
        {
            DocumentFilterOptions documentFilterOptions = new DocumentFilterOptions
            {
                Type = type,
                Year = year
            };
            var user = userRepository.Get(id);
            var documentReport = new BookDocument(Repository, documentFilterOptions, user);
            ViewBag.autoPrint = autoPrint;
            documentReport.CreateDocument();
            return View("Viewer", documentReport);
        }
    }
}