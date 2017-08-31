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
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"] + "/api/Authenticate/logout";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.ContentLength = 0;
                httpWebRequest.Method = "POST";
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {                                      
                    streamWriter.Flush();
                    streamWriter.Close();
                }
                return "success";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        //[HttpPost]
        //public string GetStaffData(int CompanyId)
        //{
        //    try
        //    {
        //        // int Id = Convert.ToInt32(CompanyId);
        //        string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/GetCompanyEmployees?companyId=" + CompanyId;
        //        string result = "";
        //        var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
        //        httpWebRequest.ContentType = "application/json";
        //        httpWebRequest.Method = "GET";
        //        httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

        //        var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
        //        using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
        //        {
        //            result = streamReader.ReadToEnd();
        //        }

        //        List<RequestStaffData> listofEmployees = new List<RequestStaffData>();
        //        listofEmployees = JsonConvert.DeserializeObject<List<RequestStaffData>>(result);
        //        return result;
        //    }
        //    catch (Exception e)
        //    {
        //        return e.ToString();
        //    }

        //}
    }
}