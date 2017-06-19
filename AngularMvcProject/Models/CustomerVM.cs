using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMvcProject.Models
{
    public class CustomerVM
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public string DurationInMinutes { get; set; }
        public string DurationInHours { get; set; }
        public int Cost { get; set; }
        public int Currency { get; set; }
        public string CreationDate { get; set; }
    }
}