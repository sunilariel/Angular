using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace AngularMvcProject.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        [HttpPost]
        public string GetBusinessReport(string CompanyId, string StartDate, string EndDate)
        {
            try
            {
                var result = "";
                var startDate = StartDate.Split('T')[0];
                var endDate = EndDate.Split('T')[0];
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetBusinessReportBetweenDates?companyId=" + CompanyId + "&startDate=" + startDate + "&endDate=" + endDate;
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
        public string GetResourceReportsBetweenDates(string CompanyId, string EmployeeIdArray, string StartDate, string EndDate)
        {
            try
            {
                var result = "";
                var startDate = StartDate.Split('T')[0];
                var endDate = EndDate.Split('T')[0];
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetResourceReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedEmployeeIds=" + EmployeeIdArray + "&startDate=" + startDate + "&endDate=" + endDate;
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

        public string GetServiceReportsBetweenDates(string CompanyId, string commaSeperatedServiceIds, string StartDate, string EndDate)
        {
            try
            {

                var result = "";
                var startDate = StartDate.Split('T')[0];
                var endDate = EndDate.Split('T')[0];
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetServiceReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedServiceIds=" + commaSeperatedServiceIds + "&startDate=" + startDate + "&endDate=" + endDate;
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
        public string GetResourceReportsBetweenDatesinSortedOrder(string CompanyId, string EmployeeIdArray, string StartDate, string EndDate, string sortingOrder, string field)
        {
            try
            {
                var result = "";
                var startDate = StartDate.Split('T')[0];
                var endDate = EndDate.Split('T')[0];
                string apiUrl  = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetResourceReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedEmployeeIds=" + EmployeeIdArray + "&startDate=" + startDate + "&endDate=" + endDate + "&asc=" + sortingOrder + "&field=" + field; ;
                //if (sortingOrder == "ASC")
                //{
                //    apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetResourceReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedEmployeeIds=" + EmployeeIdArray + "&startDate=" + startDate + "&endDate=" + endDate + "&asc=" + "asc" + "&field=" + field;
                //}
                //else
                //{
                //    apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetResourceReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedEmployeeIds=" + EmployeeIdArray + "&startDate=" + startDate + "&endDate=" + endDate + "&dsc=" + "dsc" + "&field=" + field;
                //}
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
        public string GetServiceReportsBetweenDatesByOrder(string CompanyId, string commaSeperatedServiceIds, string StartDate, string EndDate, string sortingOrder, string Field)
        {
            try
            {

                var result = "";
                var startDate = StartDate.Split('T')[0];
                var endDate = EndDate.Split('T')[0];
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetServiceReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedServiceIds=" + commaSeperatedServiceIds + "&startDate=" + startDate + "&endDate=" + endDate + "&asc=" + sortingOrder + "&field=" + Field; ;
                //if (sortingOrder == "ASC")
                //{
                //    apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetServiceReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedServiceIds=" + commaSeperatedServiceIds + "&startDate=" + startDate + "&endDate=" + endDate + "&asc=" + "asc" + "&field=" + Field;
                //}
                //else
                //{
                //    apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetServiceReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedServiceIds=" + commaSeperatedServiceIds + "&startDate=" + startDate + "&endDate=" + endDate + "&dsc=" + "dsc" + "&field=" + Field;
                //}

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
        public string GetCustomerReportsBetweenDates(string CompanyId, string commaSeperatedCustomerIds, string StartDate, string EndDate)
        {
            try
            {
                var result = "";
                var startDate = StartDate.Split('T')[0];
                var endDate = EndDate.Split('T')[0];
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetCustomerReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedCustomerIds=" + commaSeperatedCustomerIds + "&startDate=" + startDate + "&endDate=" + endDate;
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
        public string GetCustomerReportsBetweenDatesByOrder(string CompanyId, string commaSeperatedCustomerIds, string StartDate, string EndDate, string sortingOrder, string Field)
        {
            try
            {
                var result = "";
                var startDate = StartDate.Split('T')[0];
                var endDate = EndDate.Split('T')[0];
                string apiUrl = "";
                if (sortingOrder == "ASC")
                {
                    apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetCustomerReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedCustomerIds=" + commaSeperatedCustomerIds + "&startDate=" + startDate + "&endDate=" + endDate + "&asc=" + "asc" + "&field=" + Field;
                }
                else
                {
                    apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Reports/GetCustomerReportsBetweenDates?companyId=" + CompanyId + "&commaSeperatedCustomerIds=" + commaSeperatedCustomerIds + "&startDate=" + startDate + "&endDate=" + endDate + "&dsc=" + "dsc" + "&field=" + Field;
                }
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