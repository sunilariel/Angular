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
            string apiURL = "http://romzbookingmanager.azurewebsites.net/" + dataobj.Url;
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
        public string GetAllCustomer(String id)
        {
            string apiURL = "http://romzbookingmanager.azurewebsites.net/api/customer/GetAllCustomers?companyId=" + id;
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
        public string DeleteCustomer(String Id)
        {

            string apiUrl = "http://romzbookingmanager.azurewebsites.net/api/customer/DeleteCustomer?companyId=410&customerId=" + Id;
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
        public string GetAddAppointmentData(string id)
        {

            // int Id = Convert.ToInt32(CompanyId);
            string apiURL = "http://romzbookingmanager.azurewebsites.net/api/staff/GetAllocateServiceForEmployee?empid=1&compid=2";
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "GET";

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }

            List<CustomerVM> listcustomerdata = new List<CustomerVM>();
            listcustomerdata = JsonConvert.DeserializeObject<List<CustomerVM>>(result);
            return result;

        }
    }
}