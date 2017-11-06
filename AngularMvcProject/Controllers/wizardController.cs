using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using AngularMvcProject.Models;
using System.Web.Script.Serialization;
using System.Text;
using Newtonsoft.Json;
using System.Globalization;
using System.Configuration;
//namespace AngularMvcProject.Controllers
//{
//    public class wizardController : Controller
//    {
//        // GET: wizard
//        public ActionResult wizard()
//        {
//            return View();
//        }
//    }
//}
namespace AngularMvcProject.Controllers
{
    public class wizardController : Controller
    {
        // GET: SignUp
        public ActionResult wizard()
        {
            return View();
        }
        [HttpPost]
        public string postdata(CreateAccount dataObj)
        {
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + dataObj.Url;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            httpWebRequest.ProtocolVersion = HttpVersion.Version10;
            httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {

                var jsonString = new JavaScriptSerializer().Serialize(dataObj.RequestData);
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
        public string poststaffdata(StaffData dataObj)
        {

            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + dataObj.Url;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(dataObj.ReqStaffData);
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
        public string EditStaffData(StaffData dataObj)
        {

            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + dataObj.Url;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(dataObj.ReqStaffData);
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
        public string PostWorkingHours(WorkingHours dataobj)
        {
            try
            {
                List<ReqWorkingHours> listofworkinghours = new List<ReqWorkingHours>();
                var data = dataobj.ReqWorkingHours;
                foreach (var item in data)
                {
                    ReqWorkingHours obj = new ReqWorkingHours();
                    obj.Id = item.Id;
                    obj.CompanyId = item.CompanyId;
                    DateTime starttime = DateTime.Parse(item.Start, CultureInfo.CurrentCulture);
                    obj.Start = starttime.ToString("HH:mm");
                    DateTime endtime = DateTime.Parse(item.End, CultureInfo.CurrentCulture);
                    obj.End = endtime.ToString("HH:mm");
                    obj.NameOfDay = item.NameOfDay;
                    obj.IsOffAllDay = item.IsOffAllDay;
                    obj.CreationDate = item.CreationDate;

                    listofworkinghours.Add(obj);


                }
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + dataobj.Url;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    //string jsonString = "{\"user\":\"test\"," +
                    //              "\"password\":\"bla\"}";
                    var jsonString = new JavaScriptSerializer().Serialize(listofworkinghours);
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
        public string GetStaffData(int CompanyId)
        {
            try
            {
                // int Id = Convert.ToInt32(CompanyId);
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/GetCompanyEmployees?companyId=" + CompanyId;
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

                List<RequestStaffData> listofEmployees = new List<RequestStaffData>();
                listofEmployees = JsonConvert.DeserializeObject<List<RequestStaffData>>(result);
                return result;
            }
            catch (Exception e)
            {
                return e.ToString();
            }

        }
        public string GetServiceData(int Id)
        {
            
                // int Id = Convert.ToInt32(CompanyId);
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/GetServicesForCompany?companyId=" + Id;
                string result = "";
                var data = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    data = streamReader.ReadToEnd();
                }

                List<RequestAddService> listofServices = new List<RequestAddService>();
                listofServices = JsonConvert.DeserializeObject<List<RequestAddService>>(data);
                //return result;

                //Get Employees for particular Company

                var listofstaffdata = GetStaffData(Id);

                List<RequestStaffData> staffdata = new List<RequestStaffData>();
                staffdata = JsonConvert.DeserializeObject<List<RequestStaffData>>(listofstaffdata);


            List<EmployeeServicedata> EmpServiceData = new List<EmployeeServicedata>();

            //  return result;
            
                foreach ( var item in listofServices)
                {
                EmployeeServicedata obj = new EmployeeServicedata();
                    obj.Id = item.Id;
                    obj.Name = item.Name;
                    obj.CategoryId = item.CategoryId;
                    obj.CategoryName = item.CategoryName;
                    obj.DurationInHours = item.DurationInHours;
                    obj.DurationInMinutes = item.DurationInMinutes;
                    obj.Currency = item.Currency;
                    obj.CompanyId = item.CompanyId;
                    obj.Cost = Convert.ToInt32(item.Cost);

                    //Get service allocated to Employees

                    var allocatedservicetoemployee = "";
                    apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetEmployeeAllocatedToService?serviceId=" + item.Id;
                    httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                    httpWebRequest.ContentType = "application/json";
                    httpWebRequest.Method = "GET";
                    httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);
                    httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

                    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                    {
                        allocatedservicetoemployee = streamReader.ReadToEnd();
                    }

                    List<RequestStaffData> empallocatedservice = new List<RequestStaffData>();
                    empallocatedservice = JsonConvert.DeserializeObject<List<RequestStaffData>>(allocatedservicetoemployee);

                    //List<RequestStaffData> ListOfStaff = new List<RequestStaffData>();

                if(staffdata.Count==empallocatedservice.Count)
                {
                    obj.AllAssignStaffChecked = true;
                }
                else
                {
                    obj.AllAssignStaffChecked = false;
                }
                obj.staffCheckedCount = empallocatedservice.Count.ToString();

                List<Employees> listofEmployees = new List<Employees>();
                foreach (var emp in staffdata)
                {
                    Employees _emp = new Employees();
                    bool check = false;              
                    foreach (var staff in empallocatedservice)
                    {
                        if (emp.Id == staff.Id)
                        {
                            _emp.Id = staff.Id;
                            _emp.CompanyId = staff.CompanyId;
                            _emp.UserName = staff.UserName;
                            _emp.Password = staff.Password;
                            _emp.FirstName = staff.FirstName;
                            _emp.LastName = staff.LastName;
                            _emp.TelephoneNo = staff.TelephoneNo;
                            _emp.Address = staff.Address;
                            _emp.Email = staff.Email;
                            _emp.CreationDate = staff.CreationDate;
                            _emp.confirmed = true;

                            listofEmployees.Add(_emp);
                            check = true;
                           
                        }                                      
                    }
                    if (check == false)
                    {
                        _emp.Id = emp.Id;
                        _emp.CompanyId = emp.CompanyId;
                        _emp.UserName = emp.UserName;
                        _emp.Password = emp.Password;
                        _emp.FirstName = emp.FirstName;
                        _emp.LastName = emp.LastName;
                        _emp.TelephoneNo = emp.TelephoneNo;
                        _emp.Address = emp.Address;
                        _emp.Email = emp.Email;
                        _emp.CreationDate = emp.CreationDate;
                        _emp.confirmed = false;

                        listofEmployees.Add(_emp);
                    }
                    }
                                   
            //foreach ( var emp in empallocatedservice)
            //{
            //RequestStaffData staff = new RequestStaffData();
            //    staff.Id = emp.Id;
            //    staff.CompanyId = emp.CompanyId;
            //    staff.UserName = emp.UserName;
            //    staff.Password = emp.Password;
            //    staff.FirstName = emp.FirstName;
            //    staff.LastName = emp.LastName;
            //    staff.TelephoneNo = emp.TelephoneNo;
            //    staff.Address = emp.Address;
            //    staff.Email = emp.Email;
            //    staff.CreationDate = emp.CreationDate;

            //    ListOfStaff.Add(emp);                   
            //}
            //obj.ListOfEmployees = ListOfStaff;

            obj.staff = listofEmployees;

                EmpServiceData.Add(obj);
            }

            var jsonString = new JavaScriptSerializer().Serialize(EmpServiceData);

            return jsonString;
                                                                   
        }
        [HttpPost]
        public string AddService(Service dataObj)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + dataObj.Url;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(dataObj.RequestAddService);
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
        public string EditService(Service dataObj)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + dataObj.Url;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(dataObj.RequestAddService);
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
        public string DeleteService(int Id)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/DeleteService?companyId=" + Id;
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
            catch (Exception e)
            {
                return e.ToString();
            }

        }
        [HttpPost]
        public string DeleteStaff(int Id)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/DeleteStaff?id=" + Id;
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
            catch (Exception e)
            {
                return e.ToString();
            }

        }
        public string AssignStaff(AssignStaff dataobj)
        {
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + dataobj.Url;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            httpWebRequest.ProtocolVersion = HttpVersion.Version10;
            httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {

                var jsonString = new JavaScriptSerializer().Serialize(dataobj.RequestAssignService);
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
        public string DeAllocateServiceForEmployee(DeAllocateServiceEmployees dataobj)
        {
            try
            {
                string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/DeAllocateServiceForEmployee?companyId=" + dataobj.CompanyId + "&employeeId=" + dataobj.EmployeeId + "&serviceId=" + dataobj.ServiceId;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
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

    }
}