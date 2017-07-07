using AngularMvcProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.IO;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace AngularMvcProject.Controllers
{
    public class StaffController : Controller
    {
        // GET: Staff
        [HttpPost]
        public string AddStaff(RequestStaffData dataObj)
        {
            try
            {
                string apiUrl = "http://bookingmanager1romz.azurewebsites.net/api/companyregistration/AddStaff";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(dataObj);
                    streamWriter.Write(jsonstring);
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
            catch (Exception exception)
            {
                return exception.ToString();
            }
        }

        [HttpPost]
        public string UpdateStaff(RequestStaffData dataObj)
        {
            try
            {
                string apiUrl = "http://bookingmanager1romz.azurewebsites.net/api/staff/Update";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(dataObj);
                    streamWriter.Write(jsonstring);
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
            catch (Exception exception)
            {
                return exception.ToString();
            }

        }

        [HttpPost]
        public string AllocateServicetoEmployee(AssignStaffRequest dataObj)
        {
            try
            {
                string apiUrl = "http://bookingmanager1romz.azurewebsites.net/api/staff/AllocateService";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(dataObj);
                    streamWriter.Write(jsonstring);
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
            catch (Exception exception)
            {
                return exception.ToString();
            }

        }

        [HttpPost]
        public string DeAllocateServicetoEmployee(string CompanyId,string EmployeeId,string ServiceId)
        {
            try
            {
                string apiUrl = "http://bookingmanager1romz.azurewebsites.net/api/staff/DeAllocateServiceForEmployee?companyId="+ CompanyId + "&employeeId=" + EmployeeId + "&serviceId="+ ServiceId;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ContentLength = 0;

               
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }

                return result;
            }
            catch (Exception exception)
            {
                return exception.ToString();
            }

        }
        [HttpPost]
        public string GetAllServiceStatus(string CompanyId, string EmployeeId)
        {
            try
            {
                //Get List of Allocated Service//
                string apiUrl = "http://bookingmanager1romz.azurewebsites.net/api/staff/GetAllocateServiceForEmployee?empid=" + EmployeeId + "&compid=" + CompanyId;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }
                List<AssignedServiceStatus> listofAllocatedService = new List<AssignedServiceStatus>();
                listofAllocatedService = JsonConvert.DeserializeObject<List<AssignedServiceStatus>>(result);

                var AllocatedServiceCount = listofAllocatedService.Count();

                //Get List of All Services//

                 apiUrl = "http://bookingmanager1romz.azurewebsites.net/api/services/GetServicesForCompany?companyId=" + CompanyId;
                 result = "";
                httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                 httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }
                List<AssignedServiceStatus> listofAllServices = new List<AssignedServiceStatus>();
                listofAllServices = JsonConvert.DeserializeObject<List<AssignedServiceStatus>>(result);

              

                foreach(var item in listofAllServices)
                {
                    foreach(var data in listofAllocatedService)
                    {
                        
                        item.AllocatedServiceCount = (listofAllocatedService.Count()).ToString();

                        if (item.Id==data.Id && item.Name==data.Name)
                        {
                            item.Confirmed = true;
                            break;
                        }
                        else
                        {
                            item.Confirmed = false;
                        }
                    }
                }
               
               

                var jsonstring = JsonConvert.SerializeObject(listofAllServices);
                return jsonstring;
              
            }
            catch (Exception exception)
            {
                return exception.ToString();
            }

        }
        [HttpPost]
        public string SetEmployeeWorkingHours(EmployeeWorkingHours dataObj)
        {
            try
            {
                string apiUrl = "http://bookingmanager1romz.azurewebsites.net/api/staff/SetWorkingHours";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(dataObj);
                    streamWriter.Write(jsonstring);
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
            catch (Exception exception)
            {
                return exception.ToString();
            }

        }

        [HttpPost]
        public string GetWorkingHoursofEmployee(string EmployeeId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://bookingmanager1romz.azurewebsites.net/api/staff/GetWorkingHours?employeeId="+ EmployeeId);
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