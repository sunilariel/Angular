using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularMvcProject.Models;
using System.Net;
using System.IO;
using System.Web.Script.Serialization;
using System.Configuration;

namespace AngularMvcProject.Controllers
{
    public class ServicesController : Controller
    {
        // GET: Services
        [HttpPost]
        public string AddCategory(Category category)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/CreateCategory");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var StreamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonString = new JavaScriptSerializer().Serialize(category);
                    StreamWriter.Write(jsonString);
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
            catch(Exception e)
            {
                return e.ToString();
            }

        }

        public string GetCategories(string Id)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/GetServiceCategoriesForCompany?companyId=" + Id);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);
                httpWebRequest.ContentLength = 0;
              
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
        public string AddServices(Services service)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/AddService");
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var StreamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var json = new JavaScriptSerializer().Serialize(service);
                    StreamWriter.Write(json);
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
            catch(Exception e)
            {
                return e.ToString();
            }

        }

        [HttpPost]
        public string AssignCategorytoService(string CompanyId,string SeviceId,string CategoryId)
        {
            try
            {
                var result = "";
               
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/AssignCategoryToService?companyId=" + CompanyId + "&categoryId=" + CategoryId + "&serviceId=" + SeviceId);
                httpWebRequest.Method = "PUT";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);
                httpWebRequest.ContentLength = 0;

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
        public string DeAllocateCategoryFromService(string CompanyId, string SeviceId, string CategoryId)
        {
            try
            {
                var result = "";

                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/DeAllocateCategoryFromService?companyId=" + CompanyId + "&categoryId=" + CategoryId + "&serviceId=" + SeviceId);
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);
                httpWebRequest.ContentLength = 0;

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
        public string GetCategoriesAssignedToService(string CompanyId, string ServiceId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() +"/api/services/GetCategoriesAssignedToService?companyId="+ CompanyId + "&serviceId=" + ServiceId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
        public string GetAllServices(string CompanyId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/GetServicesForCompany?companyId="+ CompanyId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
        public string GetAllServiceForCategory(string CategoryId,string CompanyId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/GetAllServicesForCategory?companyId="+ CompanyId + "&categoryId=" + CategoryId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
        public string UpdateService(Services service)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/UpdateService");
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var StreamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var json = new JavaScriptSerializer().Serialize(service);
                    StreamWriter.Write(json);
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
        public string GetAllStaff(string CompanyId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/GetCompanyEmployees?companyId="+CompanyId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);
               
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
        public string AssignStaffToService(AssignStaffRequest AssignStaff)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/AssignServiceToStaff");
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var StreamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var json = new JavaScriptSerializer().Serialize(AssignStaff);
                    StreamWriter.Write(json);
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
        public string DeAssignedStaffToService(string CompanyId,string EmployeeId,string ServiceId)
        {
            try
            {
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/DeAllocateServiceForEmployee?companyId=" + CompanyId + "&employeeId=" + EmployeeId + "&serviceId=" + ServiceId;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);
                httpWebRequest.ContentLength = 0;

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
        public string UpdateCategory(Category category)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString()+"/api/services/UpdateCategory");
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var StreamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var json = new JavaScriptSerializer().Serialize(category);
                    StreamWriter.Write(json);
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
        public string DeleteCategory(string CompanyId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/DeleteCategory?companyId=" + CompanyId);
                httpWebRequest.Method = "DELETE";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
        public string GetEmployeeAssignedtoService(string ServiceId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetEmployeeAllocatedToService?serviceId=" + ServiceId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
        public string DeleteService( string ServiceId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/DeleteService?companyId=" + ServiceId);
                httpWebRequest.Method = "DELETE";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
    }
}