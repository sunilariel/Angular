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
            string apiURL = "http://bookingmanager1romz.azurewebsites.net/" + dataobj.Url;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

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
                string apiURL = "http://bookingmanager1romz.azurewebsites.net/" + customer.Url;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

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
            string apiURL = "http://bookingmanager1romz.azurewebsites.net/api/customer/GetAllCustomers?companyId=" + id;
            string result = "";

            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "GET";

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

            string apiUrl = "http://bookingmanager1romz.azurewebsites.net/api/customer/DeleteCustomer?companyId=" + CompanyId  +"&customerId=" + CustomerId;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);

            httpWebRequest.Method = "DELETE";

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
            string apiURL = "http://bookingmanager1romz.azurewebsites.net/api/staff/GetAllocateServiceForEmployee?empid=" + EmployeeId+ "&compid=" + CompanyId;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "GET";

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
                string apiURL = "http://bookingmanager1romz.azurewebsites.net/api/booking/BookAppointment";
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

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
            string apiURL = "http://bookingmanager1romz.azurewebsites.net/api/services/GetServiceById?id=" + ServiceId;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "GET";

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }


            return result;

        }



    }
}