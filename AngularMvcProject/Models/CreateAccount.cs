using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMvcProject.Models
{
    public class CreateAccount
    {

        public int Id { get; set; }
        public string Name { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public int Telephone { get; set; }

        public int PostCode { get; set; }
        public string Website { get; set; }

        public string County { get; set; }

        public string Town { get; set; }
        public string Description { get; set; }

        public string Password { get; set; }

        public DateTime CreationDate { get; set; }
    }   
}