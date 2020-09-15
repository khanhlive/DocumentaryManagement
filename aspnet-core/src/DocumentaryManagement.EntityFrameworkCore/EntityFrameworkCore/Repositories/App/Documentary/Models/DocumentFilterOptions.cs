﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DocumentaryManagement.EntityFrameworkCore.Repositories.App.Documentary.Models
{
    public class DocumentFilterOptions
    {
        public string Keyword { get; set; }
        public int FilterBy { get; set; }
        public bool Exactly { get; set; }
        public int Type { get; set; }
        public int Year { get; set; }
    }
}