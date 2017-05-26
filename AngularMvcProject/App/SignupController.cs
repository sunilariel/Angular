using AngularjsProject.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace AngularjsProject.App
{
    public class SignupController : Controller
    {
        CommunicationManager communicationManager = new CommunicationManager();
        public SignupController()
        { }
        public SignupController(CommunicationManager communicationManager)
        {
            
        }
        // GET: Signup
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult postdata()
        {

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

       

        [HttpPost]
        public HttpWebResponse postdata(string json)
        {
           
            string apiURL = "http://romzbookingmanager.azurewebsites.net/api/companyregistration/CreateAccount";

            //Data parameter Example
            //string data = "name=" + value

            HttpWebRequest httpRequest = HttpWebRequest.CreateHttp(apiURL);
            httpRequest.Method = "POST";
            httpRequest.ContentType = "application/x-www-form-urlencoded";
            httpRequest.ContentLength = json.Length;
            var streamWriter = new StreamWriter(httpRequest.GetRequestStream());
            streamWriter.Write(json);
            streamWriter.Close();
            

            var data = httpRequest.GetResponse();
            return (HttpWebResponse) data;
            //var response= communicationManager.Post<string, int>(apiURL, json);
            
            //return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}