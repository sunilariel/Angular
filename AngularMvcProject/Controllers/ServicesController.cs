using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularMvcProject.Models;
using System.Net;
using System.IO;
using System.Web.Script.Serialization;

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
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://bookingmanager1romz.azurewebsites.net/api/services/CreateCategory");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

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
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://bookingmanager1romz.azurewebsites.net/api/services/GetServiceCategoriesForCompany?companyId=" + Id);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
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
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://bookingmanager1romz.azurewebsites.net/api/companyregistration/AddService");
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentType = "application/json";

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
        public string AssignCategorytoService(string SeviceId,string CategoryId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://bookingmanager1romz.azurewebsites.net/api/services/AssignCategoryToService?categoryId=" + CategoryId + "&serviceId=" + SeviceId);
                httpWebRequest.Method = "PUT";
                httpWebRequest.ContentType = "application/json";
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
        public string GetAllServices(string CompanyId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://bookingmanager1romz.azurewebsites.net/api/services/GetServicesForCompany?companyId="+ CompanyId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
             
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