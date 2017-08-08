using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Configuration;

namespace AngularMvcProject.Controllers
{
    public class SignUpController : Controller
    {
        // GET: SignUp
        public ActionResult SignUp()
        {
            return View();
        }

        public ActionResult SignIn()
        {
            return View();
        }

        [HttpPost]
        public JsonResult postdata(string json)
        {
                      
            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/CreateAccount";

            //Data parameter Example
            //string data = "name=" + value

            HttpWebRequest httpRequest = HttpWebRequest.CreateHttp(apiURL);
            httpRequest.Method = "POST";
            httpRequest.ContentType = "application/json";
            httpRequest.ContentLength = json.Length;
            var streamWriter = new StreamWriter(httpRequest.GetRequestStream());
            streamWriter.Write(json);
            streamWriter.Close();


            var data = httpRequest.GetResponse();
           
            //var response= communicationManager.Post<string, int>(apiURL, json);

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public string UserExist(string email)
        {
            try
            {
                string apiUrl = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/companyregistration/AlreadyExistsCompany?email=" + email;
                string result = "";
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(apiUrl);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "GET";



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