using DocumentaryManagement.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocumentaryManagement.Models.Lib
{
    public class DepartmentUserTreeViewItem
    {
        public string Id { get; set; }
        public long? RotationId { get; set; }
        public bool? IsView { get; set; }
        public DateTime? ViewDate { get; set; }
        public long Value { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public bool Selected { get; set; }
        public bool IsRoot { get; set; }
        public bool Expanded { get; set; }
        public int ParentId { get; set; }
        public List<DepartmentUserTreeViewItem> Items { get; set; }

        public string ParrentExpr { get; set; }

        public List<AppRotation> GetRotations()
        {
            if (this.Type == 1)
            {
                return this.GetForDepartment();
            }
            else
            {
                return this.GetForUser();
            }
        }

        private List<AppRotation> GetForDepartment()
        {
            List<AppRotation> items = new List<AppRotation>();
            if (this.Selected)
            {
                items.Add(new AppRotation
                {
                    DepartmentId = this.Value,
                    UserId = null
                });
            }
            else
            {
                foreach (var item in Items)
                {
                    items.AddRange(item.GetRotations());
                }
            }
            return items;
        }

        private List<AppRotation> GetForUser()
        {
            List<AppRotation> items = new List<AppRotation>();
            if (this.Selected)
            {
                items.Add(new AppRotation
                {
                    DepartmentId = this.ParentId,
                    UserId = this.Value
                });
            }
            return items;
        }
    }
}
