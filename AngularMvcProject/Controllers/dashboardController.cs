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
using AngularMvcProject.Models;
using Newtonsoft.Json;

namespace AngularMvcProject.Controllers
{
    public class dashboardController : Controller
    {
        //
        // GET: /dashboard/
        [HttpPost]
        public string GetWeeksSchedule(string CompanyId)
        {
            try
            {
                var result = "";
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"] + "/api/dashboard/GetWeeksSchedule?companyId=" + CompanyId;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
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
        [HttpPost]
        public string GetWeeksActivitySummary(string CompanyId)
        {
            try
            {
                var result = "";
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"] + "/api/dashboard/GetWeeksActivitySummary?companyId=" + CompanyId;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
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

        [HttpPost]
        public string GetCurrentWeeksRevenueSummary(string CompanyId)
        {
            try
            {
                var result = "";
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"] + "/api/dashboard/GetCurrentWeeksRevenueSummary?companyId=" + CompanyId;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
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

        [HttpPost]
        public string SignOut()
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/customer/Logout");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var StreamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    //var jsonString = new JavaScriptSerializer().Serialize(category);
                    //StreamWriter.Write(jsonString);
                    StreamWriter.Flush();
                    StreamWriter.Close();
                }

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
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
        public string GetCustomerById(string CustomerId)
        {
            try
            {
                var result = "";
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"] + "/api/customer/GetCustomerById?id=" + CustomerId;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
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