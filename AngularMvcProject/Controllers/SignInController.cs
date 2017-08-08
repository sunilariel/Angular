using System.Web.Mvc;
using System.IO;
using System.Net;
using System.Configuration;
using Newtonsoft.Json;
using AngularMvcProject.Models;

namespace AngularMvcProject.Controllers
{
    public class SignInController : Controller
    {
        [HttpPost]
        public JsonResult postdata(string json)
        {

            string apiURL = ConfigurationManager.AppSettings["DomainUrl"].ToString() + "/api/Authenticate/login";
            
            HttpWebRequest httpRequest = HttpWebRequest.CreateHttp(apiURL);
            httpRequest.Method = "POST";
            httpRequest.ContentType = "application/x-www-form-urlencoded";
            httpRequest.ContentLength = json.Length;

            LoginInfo info = JsonConvert.DeserializeObject<LoginInfo>(json);
            string username = info.Email;
            string password = info.Password;
            string encoded = System.Convert.ToBase64String(System.Text.Encoding.GetEncoding("ISO-8859-1").GetBytes(username + ":" + password));
            httpRequest.Headers.Add("Authorization", "Basic " + encoded);
            
            var streamWriter = new StreamWriter(httpRequest.GetRequestStream());
            streamWriter.Write(json);
            streamWriter.Close();
            
            var data = httpRequest.GetResponse();
            var response = (HttpWebResponse)httpRequest.GetResponse();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                string token = data.Headers["Token"];
                return Json(new { success = true, CompanyId = data.Headers["CompanyId"], Token = token }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, message = "Invalid credentials" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}