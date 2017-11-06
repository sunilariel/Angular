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
using System.Globalization;
using System.Configuration;

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
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/AddStaff";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString()+"/api/staff/Update";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/AllocateService";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/DeAllocateServiceForEmployee?companyId="+ CompanyId + "&employeeId=" + EmployeeId + "&serviceId="+ ServiceId;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.ContentLength = 0;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetAllocateServiceForEmployee?empid=" + EmployeeId + "&compid=" + CompanyId;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = streamReader.ReadToEnd();
                }
                List<AssignedServiceStatus> listofAllocatedService = new List<AssignedServiceStatus>();
                listofAllocatedService = JsonConvert.DeserializeObject<List<AssignedServiceStatus>>(result);

                var AllocatedServiceCount = listofAllocatedService.Count();

                //Get List of All Services//

                 apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/services/GetServicesForCompany?companyId=" + CompanyId;
                 result = "";
                httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);
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
                DateTime startdate = DateTime.Parse(dataObj.Start, CultureInfo.CurrentCulture);
                dataObj.Start = startdate.ToString("HH:mm");
                DateTime endtdate = DateTime.Parse(dataObj.End, CultureInfo.CurrentCulture);
                dataObj.End = endtdate.ToString("HH:mm");

                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/SetWorkingHours";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetWorkingHours?employeeId="+ EmployeeId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var StreamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = StreamReader.ReadToEnd();
                }
                var data = JsonConvert.DeserializeObject<List<EmployeeWorkingHours>>(result);
                List<EmployeeWorkingHours> empworkinghours = new List<EmployeeWorkingHours>();

                foreach(var item in data)
                {
                    EmployeeWorkingHours obj = new EmployeeWorkingHours();
                    obj.EmployeeId = item.EmployeeId;
                    obj.Id = item.Id;
                    obj.IsOffAllDay = item.IsOffAllDay;
                    obj.NameOfDay = item.NameOfDay;
                    obj.NameOfDayAsString = item.NameOfDayAsString;
                    DateTime startdate = DateTime.Parse(item.Start,CultureInfo.CurrentCulture);
                    obj.Start = startdate.ToString("hh:mm tt");
                    DateTime enddatedate = DateTime.Parse(item.End, CultureInfo.CurrentCulture);
                    obj.End = enddatedate.ToString("hh:mm tt");
                   
                    obj.CompanyId = item.CompanyId;
                    obj.CreationDate = item.CreationDate;
                    empworkinghours.Add(obj);
                }
                var jsonresult = JsonConvert.SerializeObject(empworkinghours.OrderBy(x=>((int)x.NameOfDay + 6) % 7));
                return jsonresult;
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }

        
        [HttpPost]
        public string SetTimeOff(CustomTimeOff dataObj)
        {
            try
            {
                DateTime starttime = DateTime.Parse(dataObj.StartTime, CultureInfo.CurrentCulture);
                dataObj.StartTime = starttime.ToString("HH:mm");
                DateTime endtime = DateTime.Parse(dataObj.EndTime, CultureInfo.CurrentCulture);
                dataObj.EndTime = endtime.ToString("HH:mm");

                DateTime startdate = DateTime.Parse(dataObj.StartDate, CultureInfo.CurrentCulture);
                dataObj.StartDate = startdate.ToString("yyyy-MM-dd");
                DateTime enddate = DateTime.Parse(dataObj.EndDate, CultureInfo.CurrentCulture);
                dataObj.EndDate = enddate.ToString("yyyy-MM-dd");



                TimeOff obj = new TimeOff();
                obj.CompanyId = dataObj.CompanyId;
                obj.EmployeeId = dataObj.EmployeeId;
                obj.Start = dataObj.StartDate +"T"+   dataObj.StartTime;
                obj.End = dataObj.EndDate + "T"+  dataObj.EndTime;
                obj.IsOffAllDay = dataObj.IsOffAllDay;
                obj.CreationDate = dataObj.CreationDate;
               

                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/AddTimeOff";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(obj);
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
        public string UpdateTimeOff(CustomTimeOff dataObj)
        {
            try
            {
                DateTime starttime = DateTime.Parse(dataObj.StartTime, CultureInfo.CurrentCulture);
                dataObj.StartTime = starttime.ToString("HH:mm");
                DateTime endtime = DateTime.Parse(dataObj.EndTime, CultureInfo.CurrentCulture);
                dataObj.EndTime = endtime.ToString("HH:mm");

                DateTime startdate = DateTime.Parse(dataObj.StartDate, CultureInfo.CurrentCulture);
                dataObj.StartDate = startdate.ToString("yyyy-MM-dd");
                DateTime enddate = DateTime.Parse(dataObj.EndDate, CultureInfo.CurrentCulture);
                dataObj.EndDate = enddate.ToString("yyyy-MM-dd");



                UpdateTimeOff obj = new UpdateTimeOff();
                obj.CompanyId = dataObj.CompanyId;
                obj.EmployeeId = dataObj.EmployeeId;
                obj.Start = dataObj.StartDate + "T" + dataObj.StartTime;
                obj.End = dataObj.EndDate + "T" + dataObj.EndTime;
                obj.IsOffAllDay = dataObj.IsOffAllDay;
                obj.CreationDate = dataObj.CreationDate;
                obj.Id = dataObj.Id;

                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/UpdateTimeOff";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    var jsonstring = new JavaScriptSerializer().Serialize(obj);
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
        public string DeleteTimeOffofEmployee(string TimeOffId)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/DeleteTimeOff?id="+ TimeOffId;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "DELETE";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
        public string GetTimeOffDetail(string EmployeeId)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetAllTimeOffForEmployee?employeeId=" + EmployeeId;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
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
            catch (Exception exception)
            {
                return exception.ToString();
            }
        }

        [HttpPost]
        public string SetEmployeeBreakTime(SetBreak dataObj)
        {
            try
            {
                
                DateTime startdate = DateTime.Parse(dataObj.Start, CultureInfo.CurrentCulture);
                dataObj.Start = startdate.ToString("HH:mm");
                DateTime endtdate = DateTime.Parse(dataObj.End, CultureInfo.CurrentCulture);
                dataObj.End = endtdate.ToString("HH:mm");

                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/AddBreak";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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
        public string UpdateBreakTimeofEmployee(BreakTime dataObj, string Status)
        {
            try
            {

                DateTime startdate = DateTime.Parse(dataObj.Start, CultureInfo.CurrentCulture);
                dataObj.Start = startdate.ToString("HH:mm");
                DateTime endtdate = DateTime.Parse(dataObj.End, CultureInfo.CurrentCulture);
                if (Status == "Start")
                {
                    endtdate = startdate.AddHours(1);
                }
                dataObj.End = endtdate.ToString("HH:mm");

                

                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/UpdateBreak";

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";
                httpWebRequest.ProtocolVersion = HttpVersion.Version10;
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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


        public string GetBreakTimeHoursofEmployee( string EmployeeId)
        {
            try
            {
                var result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetWorkingHours?employeeId=" + EmployeeId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var StreamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = StreamReader.ReadToEnd();
                }
                var data = JsonConvert.DeserializeObject<List<EmployeeWorkingHours>>(result);
                List<EmployeeWorkingHours> empworkinghours = new List<EmployeeWorkingHours>();
                empworkinghours = data;
                httpWebRequest = (HttpWebRequest)WebRequest.Create(ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/GetAllBreaksForEmployee?employeeId=" + EmployeeId);
                httpWebRequest.Method = "GET";
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

                httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var StreamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    result = StreamReader.ReadToEnd();
                }

                var breakdata = JsonConvert.DeserializeObject<List<BreakTime>>(result);
                List<BreakTime> ListofBreaktime = new List<BreakTime>();
                ListofBreaktime = breakdata;

                List<BreakTimeHoursofEmployee> listofEmployeeBreakTime = new List<BreakTimeHoursofEmployee>();
                foreach (var item in empworkinghours)
                {
                   
                    BreakTimeHoursofEmployee dt = new BreakTimeHoursofEmployee();
                    dt.EmployeeId = item.EmployeeId;
                    dt.CompanyId = item.CompanyId;
                    dt.Day = item.NameOfDayAsString;
                    dt.DayOfWeek = item.NameOfDay;
                    dt.CreationDate = DateTime.Now.ToString();
                    dt.Available = item.IsOffAllDay == true ? false : true;
                    List<TimeSchedule> objtime = new List<TimeSchedule>();
                    foreach (var obj in ListofBreaktime)
                    {                      
                        if (item.NameOfDay == obj.DayOfWeek)
                        {
                                              
                            TimeSchedule time = new TimeSchedule();
                            time.Id = obj.Id;
                            time.DayOfWeek = obj.DayOfWeek;
                            DateTime startdate = DateTime.Parse(obj.Start, CultureInfo.CurrentCulture);
                            time.Start = startdate.ToString("hh:mm tt");
                            DateTime enddatedate = DateTime.Parse(obj.End, CultureInfo.CurrentCulture);
                            time.End = enddatedate.ToString("hh:mm tt");                           
                            objtime.Add(time);
                                                      
                        }
                    }
                    dt.StartEndTime = objtime;
                    listofEmployeeBreakTime.Add(dt);
                    //if (match == false)
                    //{
                    //    dt.EmployeeId = item.EmployeeId;
                    //    dt.CompanyId = item.CompanyId;
                    //    dt.Day = item.NameOfDayAsString;
                    //    dt.DayOfWeek = item.NameOfDay;
                    //    dt.CreationDate = DateTime.Now.ToString();
                    //    dt.Available = item.IsOffAllDay == true ? false : true;

                    //}
                    //listofEmployeeBreakTime.Add(dt);
                }
                var jsonstring = JsonConvert.SerializeObject(listofEmployeeBreakTime.OrderBy(x=>((int)x.DayOfWeek + 6) % 7));
                return jsonstring;
            }
            catch(Exception e)
            {
               return  e.ToString();
            }          
        }

        [HttpPost]
        public string DeleteBreakTimeOfEmployee(string BreakId)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/staff/DeleteBreak?id="+ BreakId;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "DELETE";
                httpWebRequest.Headers.Add("Token", Request.Headers["Token"]);

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


    }
}