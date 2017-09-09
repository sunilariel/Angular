using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularMvcProject.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Configuration;
using System.Globalization;

namespace AngularMvcProject.Controllers
{
    public partial class Event
    {
        public Guid EventID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public System.DateTime StartAt { get; set; }
        public Nullable<System.DateTime> EndAt { get; set; }
        public bool IsFullDay { get; set; }
    }

    public class CalendarController : Controller
    {
        // GET: Calendar
        public JsonResult getevents(int companyId)
        {

            IList<Event> list = new List<Event>();

            try
            {
                var startDate = DateTime.Now.Date.AddYears(-1).ToShortDateString().Replace("/", "-");

                var endDate = DateTime.Now.Date.AddYears(1).ToShortDateString().Replace("/", "-");

                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString()
                    + "/api/calendar/GetBookingsForCompanyByIdBetweenDates?companyId=" + companyId + "&startDate=" + startDate + "&endDate=" + endDate;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }

                List<AllAppointments> appointments = JsonConvert.DeserializeObject<List<AllAppointments>>(result);
                List<AppointmentDetails> ListofAppointment = new List<AppointmentDetails>();
                int i = 0;
                foreach (var appointment in appointments)
                {
                    //AppointmentDetails obj = new AppointmentDetails();
                    //obj.BookingId = appointment.Id;
                    //obj.EmployeeId = appointment.EmployeeId.ToString();
                    //obj.ServiceId = appointment.ServiceId.ToString();
                    //obj.EmployeeName = (appointment.Employee) == null ? "" : appointment.Employee.FirstName;
                    //obj.ServiceName = appointment.Service == null ? "" : appointment.Service.Name;
                    //obj.DurationInHours = appointment.Service.DurationInHours;
                    //obj.DurationInMinutes = appointment.Service.DurationInMinutes;
                    //obj.Cost = appointment.Service.Cost;
                    //obj.Currency = appointment.Service.Currency;
                    //obj.status = appointment.Status;
                    //obj.StartTime = appointment.Start;
                    //obj.EndTime = appointment.End;

                    //ListofAppointment.Add(obj);




                    list.Add(new Event
                    {
                        Description = (appointment.Employee) == null ? "" : appointment.Employee.FirstName,
                        EndAt = Convert.ToDateTime(appointment.End),
                        StartAt = Convert.ToDateTime(appointment.Start),
                        EventID = new Guid(appointment.Id),
                        IsFullDay = false,
                        Title = appointment.Service.Name
                    });

                }
            }
            catch (Exception e)
            {
               // return e.ToString();
            }

            return new JsonResult { Data = list, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}