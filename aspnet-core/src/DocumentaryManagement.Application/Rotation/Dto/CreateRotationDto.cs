using Abp.AutoMapper;
using DocumentaryManagement.Model;
using DocumentaryManagement.Models.Lib;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DocumentaryManagement.Rotation.Dto
{
    public class CreateRotationDto
    {
        public long DocumentId { get; set; }
        public List<DepartmentUserTreeViewItem> Items { get; set; }
        public List<AppRotation> CreateData(long? creationUserId)
        {
            List<AppRotation> items = new List<AppRotation>();
            if (Items != null && Items.Count > 0)
            {
                var departments = Items.Where(p => p.Type == 1);
                var users = Items.Where(p => p.Type == 2 && !departments.Any(a => a.Value == p.ParentId));
                foreach (var item in departments)
                {
                    items.Add(new AppRotation
                    {
                        Date = DateTime.Now,
                        CreationUserId = creationUserId,
                        DocumentId = this.DocumentId,
                        DepartmentId = item.Value,
                        UserId = null
                    });
                }
                foreach (var item in users)
                {
                    items.Add(new AppRotation
                    {
                        Date = DateTime.Now,
                        CreationUserId = creationUserId,
                        DocumentId = this.DocumentId,
                        DepartmentId = item.ParentId,
                        UserId = item.Value
                    });
                }


                //if (Items.Count == 1)
                //{
                //    items = this.GetRotations(Items[0].Items);
                //}
                //else
                //{
                //    items = this.GetRotations(Items);
                //}
            }
            //items.ForEach(p =>
            //{
            //    p.Date = DateTime.Now;
            //    p.CreationUserId = creationUserId;
            //    p.DocumentId = this.DocumentId;
            //});
            return items;
        }

        private List<AppRotation> GetRotations(List<DepartmentUserTreeViewItem> items)
        {
            List<AppRotation> rotations = new List<AppRotation>();
            foreach (var item in items)
            {
                rotations.AddRange(item.GetRotations());
            }
            return rotations;
        }
    }
}
