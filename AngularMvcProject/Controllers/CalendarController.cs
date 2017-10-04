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


        [HttpPost]
        public string GetBookingsForEmployeesByIdBetweenDates(string CompanyId,string commaSeperatedEmployeeIds, string StartDate, string EndDate)
        {
            try
            {
                var result = "";
                var startDate = StartDate.Split('T')[0];
                var endDate = EndDate.Split('T')[0];
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/booking/GetBookingsForEmployeesByIdBetweenDates?companyId=" + CompanyId + "&commaSeperatedEmployeeIds=" + commaSeperatedEmployeeIds + "&startDate=" + startDate + "&endDate=" + endDate;
                var httpWebRequest = HttpWebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                var httpResponse = httpWebRequest.GetResponse();
                using (var StreamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = StreamReader.ReadToEnd();
                }
                return result;
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }



        [HttpPost]
        public string SearchCustomersByTerm(string CompanyId, string searchTerm)
        {
            try
            {
                var result = "";
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/customer/SearchCustomersByTerm?companyId="+CompanyId + "&searchTerm="+searchTerm;
                var httpWebRequest = HttpWebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                var httpResponse = httpWebRequest.GetResponse();
                using (var StreamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = StreamReader.ReadToEnd();
                }
                return result;
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}