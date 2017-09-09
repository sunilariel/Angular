using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularMvcProject.Controllers
{
    public partial class Event
    {
        public int EventID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public System.DateTime StartAt { get; set; }
        public Nullable<System.DateTime> EndAt { get; set; }
        public bool IsFullDay { get; set; }
    }

    public class CalendarController : Controller
    {
        // GET: Calendar
        public JsonResult getevents()
        {

            IList<Event> list = new List<Event>();

            list.Add(new Event
            {
                Description = "hello",
                EndAt = DateTime.Now.AddHours(2),
                StartAt = DateTime.Now
                ,
                EventID = 1,
                IsFullDay = false,
                Title = "Cutting"
            });

            return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
    }
}