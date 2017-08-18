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
    public class CustomerController : Controller
    {
        //
        // GET: /Customer/
        public ActionResult Customer()
        {
            return View();
        }

        [HttpPost]
        public string CreateCustomer(StaffData dataobj)
        {
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + dataobj.Url;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {

                var jsonString = new JavaScriptSerializer().Serialize(dataobj.ReqStaffData);
                streamWriter.Write(jsonString);
                streamWriter.Flush();
                streamWriter.Close();
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }

            return result;
        }

        [HttpPost]
        public string UpdateCustomer(StaffData customer)
        {
            try
            {
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + customer.Url;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {

                    var jsonString = new JavaScriptSerializer().Serialize(customer.ReqStaffData);
                    streamWriter.Write(jsonString);
                    streamWriter.Flush();
                    streamWriter.Close();
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }

                return result;
            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }







        [HttpPost]
        public string GetAllCustomer(String id)
        {
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/customer/GetAllCustomers?companyId=" + id;
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
            return result;
        }


        [HttpPost]
        public string DeleteCustomer(string CompanyId,string CustomerId)
        {

            string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/customer/DeleteCustomer?companyId=" + CompanyId  +"&customerId=" + CustomerId;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
            httpWebRequest.Method = "DELETE";
            httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }
            return result;

        }
        public ActionResult Settings()
        {
            return View();
        }

        [HttpPost]
        public string GetAllocatedServicetoEmployee(string CompanyId,string EmployeeId)
        {

            // int Id = Convert.ToInt32(CompanyId);
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetAllocateServiceForEmployee?empid=" + EmployeeId+ "&compid=" + CompanyId;
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

            
            return result;

        }

        [HttpPost]
        public string AddAppointment(BookAppointment appointment)
        {
            try
            {
                DateTime obj = DateTime.Parse(appointment.Start);
                appointment.Start = obj.ToString("yyyy-MM-dd T HH:mm:ss");
                appointment.End = obj.AddMinutes(appointment.EndMinute).ToString("yyyy-MM-dd T HH:mm:ss");

                var StartTime = DateTime.Parse(appointment.StartHour, CultureInfo.InvariantCulture);
                var Time = StartTime.ToString("HH:mm").Split(':');

                appointment.StartHour = Time[0];
                appointment.StartMinute = Time[1];

                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/booking/BookAppointment";
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {

                    var jsonString = new JavaScriptSerializer().Serialize(appointment);
                    streamWriter.Write(jsonString);
                    streamWriter.Flush();
                    streamWriter.Close();
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }

                return result;
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        [HttpPost]
        public string UpdateAppointment(UpdateBookAppointment appointment)
        {
            try
            {
                DateTime obj = DateTime.Parse(appointment.Start);
                appointment.Start = obj.ToString("yyyy-MM-dd T HH:mm:ss");
                appointment.End = obj.AddMinutes(appointment.EndMinute).ToString("yyyy-MM-dd T HH:mm:ss");

                var StartTime = DateTime.Parse(appointment.StartHour, CultureInfo.InvariantCulture);
                var Time = StartTime.ToString("HH:mm").Split(':');

                appointment.StartHour = Time[0];
                appointment.StartMinute = Time[1];

                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/booking/UpdateBooking";
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {

                    var jsonString = new JavaScriptSerializer().Serialize(appointment);
                    streamWriter.Write(jsonString);
                    streamWriter.Flush();
                    streamWriter.Close();
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }

                return result;
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }


        [HttpPost]
        public string GetSelectedService(string ServiceId)
        {

            // int Id = Convert.ToInt32(CompanyId);
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/GetServiceById?id=" + ServiceId;
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
            return result;
        }

        [HttpPost]
        public string GetCompanyDetails(string companyId)
        {

            // int Id = Convert.ToInt32(CompanyId);
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/GetCompanyDetails?companyId=" + companyId;
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
            return result;
        }
        

        [HttpPost]

        public string GetAppointmentWorkinghours(string EmployeeId)
        {
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetWorkingHours?employeeId=" + EmployeeId;
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
            return result;
        }

        [HttpPost]
        public string GetFreeBookingSlotsForEmployee(WorkingHoursofEmployee dataObj)
        {
            try
            {
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/booking/GetFreeBookingSlotsForEmployee?companyId=" + dataObj.CompanyId + "&serviceId="+ dataObj.ServiceId + "&employeeId=" + dataObj.EmployeeId + "&dateOfBooking=" + dataObj.DateOfBooking + "&day=" + dataObj.Day;
            
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

                return result;
            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }
        
        [HttpPost]
        public string GetAppointmentDetails(string CustomerId)
        {
            // int Id = Convert.ToInt32(CompanyId);
            try
            {
                var startDate = DateTime.Now.Date.AddYears(-1).ToShortDateString().Replace("/","-");
             
                var endDate = DateTime.Now.Date.AddYears(1).ToShortDateString().Replace("/","-");
               
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/booking/GetBookingsForCustomerByIdBetweenDates?customerId=" + CustomerId + "&startDate=" + startDate + "&endDate=" + endDate;
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
               foreach( var appointment in appointments)
                {
                    AppointmentDetails obj = new AppointmentDetails();
                    obj.BookingId = appointment.Id;
                    obj.EmployeeId = appointment.EmployeeId.ToString();
                    obj.ServiceId = appointment.ServiceId.ToString();
                    obj.EmployeeName = appointment.Employee.FirstName;
                    obj.ServiceName = appointment.Service.Name;
                    obj.DurationInHours = appointment.Service.DurationInHours;
                    obj.DurationInMinutes = appointment.Service.DurationInMinutes;
                    obj.Cost = appointment.Service.Cost==null?0:appointment.Service.Cost;
                    obj.Currency = appointment.Service.Currency;
                    obj.status = appointment.Status;
                    obj.StartTime = appointment.Start;
                    obj.EndTime = appointment.End;

                    ListofAppointment.Add(obj);

                }

                var jsondata = JsonConvert.SerializeObject(ListofAppointment);

                return jsondata;

            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }
        [HttpPost]
        public string SetStatusOfAppointment(string status,string BookingId)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/booking/SetStatus?status=" + status + "&bookingId=" + BookingId;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);
                httpWebRequest.ContentLength = 0;

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }
                return result;
            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }

        [HttpPost]
        public string UpdateBooking(BookAppointment appointment)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/booking/UpdateBooking";
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var StreamWriter=new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var JsonString = new JavaScriptSerializer().Serialize(appointment);
                    StreamWriter.Write(JsonString);
                    StreamWriter.Flush();
                    StreamWriter.Close();
                }

                var httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var StreamReader = new StreamReader(httpWebResponse.GetResponseStream()))
                {
                  result=  StreamReader.ReadToEnd();                   
                }
                return result;
            }
            catch(Exception e)
            {
                return e.ToString();
            }
        }

        [HttpPost]
        public string DeleteAppointment(string BookingId)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/booking/DeleteBooking?bookingId=" + BookingId;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.Method = "DELETE";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                var httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var StreamReader = new StreamReader(httpWebResponse.GetResponseStream()))
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