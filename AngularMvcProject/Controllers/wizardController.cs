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
             string apiURL = "http://romzbookingmanager.azurewebsites.net/" + dataObj.Url;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

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
                string apiUrl = "http://romzbookingmanager.azurewebsites.net/" + dataObj.Url;

                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

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
            catch(Exception exception)
            {
                return exception.ToString();
            }
            
        }

        public string PostWorkingHours(WorkingHours dataobj)
        {
            string apiURL = "http://romzbookingmanager.azurewebsites.net/" + dataobj.Url;
            string result = "";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                //string jsonString = "{\"user\":\"test\"," +
                //              "\"password\":\"bla\"}";
                var jsonString = new JavaScriptSerializer().Serialize(dataobj.ReqWorkingHours);
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

        //public string AddService(Service dataobj)
        //{
        //    string apiURL = "http://romzbookingmanager.azurewebsites.net/" + dataobj.Url;
        //    string result = "";
        //    var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiURL);
        //    httpWebRequest.ContentType = "application/json";
        //    httpWebRequest.Method = "POST";

        //    using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
        //    {
        //        //string jsonString = "{\"user\":\"test\"," +
        //        //              "\"password\":\"bla\"}";
        //        var jsonString = new JavaScriptSerializer().Serialize(dataobj.RequestAddService);
        //        streamWriter.Write(jsonString);
        //        streamWriter.Flush();
        //        streamWriter.Close();
        //    }

        //    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
        //    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
        //    {
        //        result = streamReader.ReadToEnd();
        //    }

        //    return result;
        //}

       
    }
}