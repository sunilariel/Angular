using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace AngularMvcProject.Controllers
{
    public class SignUpController : Controller
    {
        // GET: SignUp
        public ActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        public JsonResult postdata(string json)
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
           
            //var response= communicationManager.Post<string, int>(apiURL, json);

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}